import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { RequestedUser } from 'src/core/decorator/user.decorator';
import { AccessTokenGuard } from 'src/core/guard/accessToken.guard';
import { User } from 'src/entities/user/user.entity';
import { ChatService } from './chat.service';
import { CreateChatBody } from './req/createChat.body';
import { GetChatsQuery } from './req/getChats.query';

@UseGuards(AccessTokenGuard)
@Controller('/chats')
export class ChatController {
  constructor(private readonly service: ChatService) {}

  @Get('')
  async getChats(@Query() query: GetChatsQuery, @RequestedUser() user: User) {
    return this.service.getChats(user.id, query);
  }

  @Post('/')
  async createChat(@RequestedUser() user: User, @Body() body: CreateChatBody) {
    return this.service.createChat(user.id, body);
  }
}
