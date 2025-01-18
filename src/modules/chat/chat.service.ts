import { Injectable } from '@nestjs/common';
import { GptService } from 'src/core/gpt/gpt.service';
import { User } from 'src/entities/user/user.entity';
import { CreateChatBody } from './req/createChat.body';
import { GetChatsQuery } from './req/getChats.query';
import { UserRepository } from '../user/repository/user.repository';

@Injectable()
export class ChatService {
  constructor(
    private readonly gptService: GptService,
    private readonly userRepository: UserRepository,
  ) {}

  async getChats(userId: User['id'], query: GetChatsQuery) {
    return this.userRepository.paginateWithJoin(
      query,
      {
        Threads: {
          ChatHistories: true,
        },
      },
      {
        id: userId,
      },
      { Threads: { ChatHistories: { createdAt: query.sortOption } } },
    );
  }

  async createChat(userId: User['id'], body: CreateChatBody) {
    const { prompt, isStreaming, model } = body;

    return this.gptService.generateResponse(userId, prompt, isStreaming, model);
  }
}
