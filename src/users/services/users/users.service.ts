import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from '../../models/users.model';
import { SignupDto } from 'src/users/dtos/users.dto';

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

  private async generateJWT(user: User) {
    const payload = { sub: user.id };
    return this.jwtService.sign(payload);
  }
}
