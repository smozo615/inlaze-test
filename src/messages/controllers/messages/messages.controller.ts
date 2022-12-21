import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';

import { MessagesService } from '../../services/messages/messages.service';
import {
  CreateMessageDto,
  UpdateMessageDto,
} from 'src/messages/dtos/messages.dto';
import { AuthGuard } from '../../../utils/guards/auth/auth.guard';
import { Request } from 'express';

@Controller('messages')
@UseGuards(AuthGuard)
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  // Create message
  @Post()
  async create(@Body() data: CreateMessageDto, @Req() req: Request) {
    const userId = Number(req.currentUser.id);

    const finalData = {
      ...data,
      userId,
      date: new Date().toISOString(),
    };

    const message = await this.messagesService.create(finalData);
    return message;
  }
  // Get all messages
  @Get()
  async getAllMessage() {
    const messages = await this.messagesService.findAll();
    return messages;
  }

  // Get current user messages
  @Get('current_user')
  async getCurrent(@Req() req: Request) {
    const userId = Number(req.currentUser.id);
    const messages = await this.messagesService.findCurrentUserMessage(userId);
    return messages;
  }

  // Update one message
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateMessageDto,
  ) {
    const updatedMessage = await this.messagesService.update(id, data);
    return updatedMessage;
  }
}
