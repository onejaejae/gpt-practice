import { plainToInstance } from 'class-transformer';
import { ChatHistory } from 'src/entities/chat-history/chat-history.entity';
import { Thread } from 'src/entities/thread/thread.entity';
import { ChatHistoryRepository } from 'src/modules/chat-history/repository/chat-history.repository';

export class ChatHistoryFactory {
  static async createChatHistory(
    threadId: Thread['id'],
    content: ChatHistory['content'],
    role: ChatHistory['role'],
    chatHistoryRepository: ChatHistoryRepository,
  ): Promise<ChatHistory> {
    const chatHistory = plainToInstance(ChatHistory, {
      threadId,
      content,
      role,
    });

    return chatHistoryRepository.save(chatHistory);
  }
}
