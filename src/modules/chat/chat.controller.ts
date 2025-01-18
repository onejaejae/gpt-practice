import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RequestedUser } from 'src/core/decorator/user.decorator';
import { AccessTokenGuard } from 'src/core/guard/accessToken.guard';
import { User } from 'src/entities/user/user.entity';
import { ChatService } from './chat.service';
import { CreateChatBody } from './req/createChat.body';

@UseGuards(AccessTokenGuard)
@Controller('/chats')
export class ChatController {
  constructor(private readonly service: ChatService) {}

  @Post('/')
  async createChat(@RequestedUser() user: User, @Body() body: CreateChatBody) {
    return this.service.createChat(user.id, body);
  }
}
