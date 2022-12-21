import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

import { UsersService } from '../../services/users/users.service';
import { LoginDto, SignupDto } from '../../dtos/users.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // Register new user
  @Post('signup')
  async signup(
    @Body() data: SignupDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    // Store new user in DB and return JWT
    const token = await this.usersService.signup(data);

    // Store JWT in cookie
    const cookieExpirationTime = 1200 * 1000;
    res.cookie('user', token, {
      expires: new Date(Date.now() + cookieExpirationTime),
    });

    return { status: 'Sign up' };
  }

  // Login
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() data: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.usersService.login(data);

    // Store JWT in cookie
    const cookieExpirationTime = 1200 * 1000;
    res.cookie('user', token, {
      expires: new Date(Date.now() + cookieExpirationTime),
    });

    return { status: 'logged in' };
  }
}
