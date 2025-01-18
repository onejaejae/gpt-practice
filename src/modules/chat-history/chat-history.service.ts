// src/chat/services/chat-history.service.ts
import { Injectable } from '@nestjs/common';
import { ChatHistoryRepository } from './repository/chat-history.repository';
import { plainToInstance } from 'class-transformer';
import { OmitUppercaseProps } from 'src/core/database/typeorm/typeorm.interface';
import { ChatHistory } from 'src/entities/chat-history/chat-history.entity';
import { ChatHistoryRole } from 'src/entities/chat-history/chat-history.interface';
import { Thread } from 'src/entities/thread/thread.entity';

@Injectable()
export class ChatHistoryService {
  constructor(private readonly repository: ChatHistoryRepository) {}

  async getThreadHistory(
    threadId: Thread['id'],
  ): Promise<OmitUppercaseProps<ChatHistory[]>> {
    return this.repository.findMany({ threadId }, { createdAt: 'ASC' });
  }

  async saveMessage(
    threadId: Thread['id'],
    role: ChatHistoryRole,
    content: ChatHistory['content'],
  ): Promise<void> {
    const plainChatHistory: Partial<ChatHistory> = {
      threadId,
      role,
      content,
    };
    const chatHistory = plainToInstance(ChatHistory, plainChatHistory);

    await this.repository.save(chatHistory);
  }
}
