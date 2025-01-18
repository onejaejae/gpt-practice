import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RequestedUser } from 'src/core/decorator/user.decorator';
import { AccessTokenGuard } from 'src/core/guard/accessToken.guard';
import { User } from 'src/entities/user/user.entity';
import { ChatService } from './chat.service';
import { CreateChatBody } from './req/createChat.body';
import { GetChatsQuery } from './req/getChats.query';
import { ResourceOwnerGuard } from 'src/core/guard/resourceOwner.guard';
import {
  ResourceKey,
  ResourceType,
} from 'src/core/decorator/resource-owner.decorator';
import { Thread } from 'src/entities/thread/thread.entity';

@UseGuards(AccessTokenGuard)
@Controller('/chats')
export class ChatController {
  constructor(private readonly service: ChatService) {}

  @ResourceKey(ResourceType.Thread)
  @UseGuards(ResourceOwnerGuard)
  @Get('/:threadId')
  async getChats(
    @Param('threadId') threadId: Thread['id'],
    @Query() query: GetChatsQuery,
    @RequestedUser() user: User,
  ) {
    return this.service.getChats(user.id, threadId, query);
  }

  @Post('/')
  async createChat(@RequestedUser() user: User, @Body() body: CreateChatBody) {
    return this.service.createChat(user.id, body);
  }
}
