import { Body, Controller, Post } from '@nestjs/common';

import { MessagesService } from '../../services/messages/messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @Post()
  async create(@Body() data: any) {
    const message = await this.messagesService.create(data);
    return message;
  }
}
