import { Module } from '@nestjs/common';
import { GptService } from './gpt.service';
import { ThreadRepositoryModule } from 'src/modules/thread/repository/thread-repository.module';
import { SaveChatHistoryAspect } from 'libs/aspect/save-chat-history.aspect';
import { ChatHistoryRepositoryModule } from 'src/modules/chat-history/repository/chat-history-repository.module';
import { ChatHistoryModule } from 'src/modules/chat-history/chat-history.module';

@Module({
  imports: [
    ChatHistoryRepositoryModule,
    ChatHistoryModule,
    ThreadRepositoryModule,
  ],
  providers: [GptService, SaveChatHistoryAspect],
  exports: [GptService],
})
export class GptModule {}
