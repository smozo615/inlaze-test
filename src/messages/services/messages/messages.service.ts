import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Message } from 'src/messages/models/messages.model';
import { MessageDto } from 'src/messages/dtos/messages.dto';

@Injectable()
export class MessagesService {
  constructor(@InjectModel(Message) private messageModel: typeof Message) {}

  async create(data: MessageDto) {
    const newMessage = this.messageModel.create({ ...data });
    return newMessage;
  }
}
