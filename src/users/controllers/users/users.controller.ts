import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { ApiConflictResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { UsersService } from '../../services/users/users.service';
import { LoginDto, SignupDto } from '../../dtos/users.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // Register new user
  @Post('signup')
  @ApiConflictResponse({ description: 'Invalid username' })
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
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiConflictResponse({ description: 'Invalid username or password' })
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

  // Logout
  @Get('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('user');

    return { status: 'logged out' };
  }
}
