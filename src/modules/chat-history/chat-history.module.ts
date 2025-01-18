import { Module } from '@nestjs/common';
import { ChatHistoryRepositoryModule } from './repository/chat-history-repository.module';
import { ChatHistoryService } from './chat-history.service';

@Module({
  imports: [ChatHistoryRepositoryModule],
  providers: [ChatHistoryService],
  exports: [ChatHistoryService],
})
export class ChatHistoryModule {}
