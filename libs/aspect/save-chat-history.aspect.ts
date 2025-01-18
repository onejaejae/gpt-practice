import { Aspect, createDecorator, WrapParams } from '@toss/nestjs-aop';
import dayjs from 'dayjs';
import { ChatHistoryRole } from 'src/entities/chat-history/chat-history.interface';
import { Thread } from 'src/entities/thread/thread.entity';
import { ChatHistoryService } from 'src/modules/chat-history/chat-history.service';
import { ChatHistoryRepository } from 'src/modules/chat-history/repository/chat-history.repository';
import { ThreadRepository } from 'src/modules/thread/repository/thread.repository';

export interface SaveChatHistoryMetadata {
  targetPromptIndex: number;
  targetUserIdIndex: number;
}

export const SAVE_CHAT_HISTORY_DECORATOR = Symbol(
  'SAVE_CHAT_HISTORY_DECORATOR',
);
export const SaveChatHistory = (metadata: SaveChatHistoryMetadata) =>
  createDecorator(SAVE_CHAT_HISTORY_DECORATOR, metadata);

@Aspect(SAVE_CHAT_HISTORY_DECORATOR)
export class SaveChatHistoryAspect {
  constructor(
    private readonly chatHistoryService: ChatHistoryService,
    private readonly chatHistoryRepository: ChatHistoryRepository,
    private readonly threadRepository: ThreadRepository,
  ) {}

  private async shouldCreateNewThread(
    threadId: Thread['id'],
  ): Promise<boolean> {
    try {
      const chatHistory = await this.chatHistoryRepository.findOneOrThrow(
        { threadId },
        { createdAt: 'DESC' },
      );
      return dayjs().diff(dayjs(chatHistory.createdAt), 'minute') > 30;
    } catch {
      return true;
    }
  }

  private async createThreadWithSystemMessage(userId: string) {
    const thread = await this.threadRepository.create({ userId });

    const systemMessage = this.chatHistoryRepository.create({
      threadId: thread.id,
      role: ChatHistoryRole.System,
      content: 'You are a helpful assistant.',
    });

    console.log('systemMessage---', systemMessage);

    thread.ChatHistories = [systemMessage];
    return this.threadRepository.save(thread);
  }

  private async getOrCreateThread(userId: string) {
    const existingThread =
      await this.threadRepository.findOneWithOmitNotJoinedProps(
        { userId },
        { ChatHistories: true },
        { createdAt: 'DESC' },
      );

    if (!existingThread) {
      return this.createThreadWithSystemMessage(userId);
    }

    const shouldCreate = await this.shouldCreateNewThread(existingThread.id);
    return shouldCreate
      ? this.createThreadWithSystemMessage(userId)
      : existingThread;
  }

  wrap(params: WrapParams<any, SaveChatHistoryMetadata>) {
    return async (...args: any[]) => {
      try {
        const { method, metadata } = params;

        const prompt = args.at(metadata.targetPromptIndex ?? 0);
        const userId = args.at(metadata.targetUserIdIndex ?? 0);

        const thread = await this.getOrCreateThread(userId);
        const result = await method(...args);

        await this.chatHistoryService.saveMessage(
          thread.id,
          ChatHistoryRole.User,
          prompt,
        );
        await this.chatHistoryService.saveMessage(
          thread.id,
          ChatHistoryRole.Assistant,
          result,
        );

        return result;
      } catch (error) {
        console.log('error', error);

        throw error;
      }
    };
  }
}
