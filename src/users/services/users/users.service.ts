import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { User } from '../../models/users.model';
import { SignupDto } from 'src/users/dtos/users.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async signup(data: SignupDto) {
    const user = await this.userModel.create({ ...data });
    return user;
  }
}
