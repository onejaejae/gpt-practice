import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { GptConfigService } from '../config/config.service';
import { ChatHistoryService } from 'src/modules/chat-history/chat-history.service';
import { SaveChatHistory } from 'libs/aspect/save-chat-history.aspect';
import { ChatHistory } from 'src/entities/chat-history/chat-history.entity';
import { ChatHistoryRole } from 'src/entities/chat-history/chat-history.interface';
import { GptModel } from './gpt.interface';
import { User } from 'src/entities/user/user.entity';
import { ThreadRepository } from 'src/modules/thread/repository/thread.repository';

@Injectable()
export class GptService {
  private openai: OpenAI;

  constructor(
    private configService: GptConfigService,
    private readonly threadRepository: ThreadRepository,
    private chatHistoryService: ChatHistoryService,
  ) {
    const openAIConfig = this.configService.getOpenAIConfig();
    this.openai = new OpenAI({
      apiKey: openAIConfig.OPENAI_API_KEY,
    });
  }

  @SaveChatHistory({
    targetUserIdIndex: 0,
    targetPromptIndex: 1,
  })
  async generateResponse(
    userId: User['id'],
    prompt: string,
    isStreaming: boolean,
    model: GptModel,
  ): Promise<string> {
    try {
      const latestThread = await this.threadRepository.findOneByFilters(
        { userId },
        { createdAt: 'DESC' },
      );

      let messages: {
        role: ChatHistoryRole;
        content: ChatHistory['content'];
      }[] = [];

      if (latestThread) {
        const chatHistory = await this.chatHistoryService.getThreadHistory(
          latestThread.id,
        );

        messages = chatHistory.map((chat) => ({
          role: chat.role,
          content: chat.content,
        }));
      }

      const completion = await this.openai.chat.completions.create({
        model,
        messages: [...messages, { role: 'user', content: prompt }],
      });

      const reply =
        completion.choices[0].message.content || '응답을 생성할 수 없습니다.';

      return reply;
    } catch (error) {
      console.error('GPT API 오류:', error);
      throw new Error('GPT 응답 생성 중 오류가 발생했습니다.');
    }
  }
}
