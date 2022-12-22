import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';

import { Message } from 'src/messages/models/messages.model';
import {
  FilterDto,
  MessageDto,
  UpdateMessageDto,
} from 'src/messages/dtos/messages.dto';
import { User } from 'src/users/models/users.model';

@Injectable()
export class MessagesService {
  constructor(@InjectModel(Message) private messageModel: typeof Message) {}

  async create(data: MessageDto) {
    const newMessage = await this.messageModel.create({ ...data });
    return newMessage;
  }

  async findAll(filters?: FilterDto) {
    const options = {
      include: {
        model: User,
        where: {},
      },
      where: {},
      order: [],
    };

    if (filters.name) {
      options.include.where = {
        fullName: {
          [Op.iLike]: `%${filters.name}%`,
        },
      };
    }

    if (filters.date) {
      options.where = { date: { [Op.gte]: `${filters.date}` } };
    }

    if (filters.messagesOrder) {
      options.order.push(['date', `${filters.messagesOrder}`]);
    }

    const messages = await this.messageModel.findAll(options);
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
