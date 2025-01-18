import { Injectable } from '@nestjs/common';
import { GptService } from 'src/core/gpt/gpt.service';
import { User } from 'src/entities/user/user.entity';
import { CreateChatBody } from './req/createChat.body';
import { GetChatsQuery } from './req/getChats.query';
import { Thread } from 'src/entities/thread/thread.entity';
import { ThreadRepository } from '../thread/repository/thread.repository';

@Injectable()
export class ChatService {
  constructor(
    private readonly gptService: GptService,
    private readonly threadRepository: ThreadRepository,
  ) {}

  async getChats(
    userId: User['id'],
    threadId: Thread['id'],
    query: GetChatsQuery,
  ) {
    return this.threadRepository.paginateWithJoin(
      query,
      {
        ChatHistories: true,
      },
      {
        id: threadId,
      },
      { ChatHistories: { createdAt: query.sortOption } },
    );
  }

  async createChat(userId: User['id'], body: CreateChatBody) {
    const { prompt, isStreaming, model } = body;

    return this.gptService.generateResponse(userId, prompt, isStreaming, model);
  }
}
