import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from '../../services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // Register new user
  @Post('signup')
  async signup(@Body() data: any) {
    const token = await this.usersService.signup(data);
    return { token };
  }
}
