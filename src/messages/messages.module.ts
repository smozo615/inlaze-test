import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { MessagesController } from './controllers/messages/messages.controller';
import { MessagesService } from './services/messages/messages.service';
import { Message } from './models/messages.model';

@Module({
  imports: [SequelizeModule.forFeature([Message])],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
