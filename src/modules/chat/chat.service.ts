import { Injectable } from '@nestjs/common';
import { GptService } from 'src/core/gpt/gpt.service';
import { User } from 'src/entities/user/user.entity';
import { CreateChatBody } from './req/createChat.body';

@Injectable()
export class ChatService {
  constructor(private readonly gptService: GptService) {}

  async createChat(userId: User['id'], body: CreateChatBody) {
    const { prompt, isStreaming, model } = body;

    return this.gptService.generateResponse(userId, prompt, isStreaming, model);
  }
}
