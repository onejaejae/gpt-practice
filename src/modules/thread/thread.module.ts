import { Module } from '@nestjs/common';
import { ThreadController } from './thread.controller';
import { ThreadService } from './thread.service';
import { ThreadRepositoryModule } from './repository/thread-repository.module';
import { ChatHistoryRepositoryModule } from '../chat-history/repository/chat-history-repository.module';

@Module({
  imports: [ThreadRepositoryModule, ChatHistoryRepositoryModule],
  controllers: [ThreadController],
  providers: [ThreadService],
})
export class ThreadModule {}
