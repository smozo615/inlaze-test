import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Request } from 'express';

import { MessagesService } from '../../services/messages/messages.service';
import {
  CreateMessageDto,
  FilterCurrentUserMessagesDto,
  FilterDto,
  UpdateMessageDto,
} from '../../dtos/messages.dto';
import { AuthGuard } from '../../../utils/guards/auth/auth.guard';

@ApiTags('Messages')
@Controller('messages')
@UseGuards(AuthGuard)
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  // Create message
  @Post()
  @ApiCreatedResponse({
    description: 'Message has been successfully created',
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
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
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async getAllMessage(@Query() filters: FilterDto) {
    const messages = await this.messagesService.findAll(filters);
    return messages;
  }

  // Get current user messages
  @Get('current_user')
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async getCurrent(
    @Req() req: Request,
    @Query() filters: FilterCurrentUserMessagesDto,
  ) {
    const userId = Number(req.currentUser.id);
    const messages = await this.messagesService.findCurrentUserMessage(
      userId,
      filters,
    );
    return messages;
  }

  // Update one message
  @Put(':id')
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiNotFoundResponse({ description: 'Message not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateMessageDto,
    @Req() req: Request,
  ) {
    const userId = Number(req.currentUser.id);
    const updatedMessage = await this.messagesService.update(id, data, userId);
    return updatedMessage;
  }
}
