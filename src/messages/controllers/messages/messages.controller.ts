import { Body, Controller, Post } from '@nestjs/common';

import { MessagesService } from '../../services/messages/messages.service';
import { CreateMessageDto } from 'src/messages/dtos/messages.dto';

@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @Post()
  async create(@Body() data: CreateMessageDto) {
    const finalData = {
      ...data,
      userId: 2,
      date: new Date().toISOString(),
    };

    const message = await this.messagesService.create(finalData);
    return message;
  }
}
