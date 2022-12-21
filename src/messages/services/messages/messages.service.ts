import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Message } from 'src/messages/models/messages.model';
import { MessageDto, UpdateMessageDto } from 'src/messages/dtos/messages.dto';

@Injectable()
export class MessagesService {
  constructor(@InjectModel(Message) private messageModel: typeof Message) {}

  async create(data: MessageDto) {
    const newMessage = await this.messageModel.create({ ...data });
    return newMessage;
  }

  async findAll() {
    const messages = await this.messageModel.findAll();
    return messages;
  }

  async findCurrentUserMessage(userId: number) {
    const messages = await this.messageModel.findAll({ where: { userId } });
    return messages;
  }

  async update(id: number, data: UpdateMessageDto, userId: number) {
    const message = await this.messageModel.findByPk(id);
    if (!message) {
      throw new NotFoundException();
    }
    if (Number(message.userId) !== userId) {
      throw new ForbiddenException();
    }
    await message.update({ ...data });
    return message;
  }
}
