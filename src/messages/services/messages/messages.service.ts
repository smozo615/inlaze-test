import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagesService {
  async create(data: any) {
    return data;
  }
}
