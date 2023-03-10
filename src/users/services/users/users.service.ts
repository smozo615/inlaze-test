import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from '../../models/users.model';
import { LoginDto, SignupDto } from 'src/users/dtos/users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private jwtService: JwtService,
  ) {}

  async signup(data: SignupDto) {
    const { username, password } = data;

    // Check if the username is already in use
    const isInUsed = await this.userModel.findOne({ where: { username } });
    if (isInUsed) {
      throw new ConflictException('invalid username');
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // Save new user in db
    const user = await this.userModel.create({
      ...data,
      password: hashPassword,
    });

    // Generate JWT
    const token = await this.generateJWT(user);

    return token;
  }

  async login(data: LoginDto) {
    const { username, password } = data;

    // Check if user exists
    const user = await this.findByUsername(username);

    // Check if password is correct
    await this.verifyPassword(password, user.password);

    // Generate JWT
    const token = this.generateJWT(user);

    return token;
  }

  private async findByUsername(username: string) {
    const user = await this.userModel.findOne({ where: { username } });
    if (!user) {
      throw new ConflictException('Invalid username or password');
    }
    return user;
  }

  private async verifyPassword(passwordInReq: string, passwordInDb: string) {
    const match = await bcrypt.compare(passwordInReq, passwordInDb);
    if (!match) {
      throw new ConflictException('Invalid username or password');
    }
  }

  private async generateJWT(user: User) {
    const payload = { sub: user.id };
    return this.jwtService.sign(payload);
  }

  async validateJWT(token: string) {
    const payload = await this.jwtService.verify(token);
    if (!payload) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}
