import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  async signup() {
    return 'token';
  }
}
