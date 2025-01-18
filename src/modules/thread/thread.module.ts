import { Module } from '@nestjs/common';
import { ThreadController } from './thread.controller';
import { ThreadService } from './thread.service';
import { ThreadRepositoryModule } from './repository/thread-repository.module';
import { ChatHistoryRepositoryModule } from '../chat-history/repository/chat-history-repository.module';
import { FeedbackRepositoryModule } from '../feedback/repository/feedback-repository.module';

@Module({
  imports: [
    ThreadRepositoryModule,
    ChatHistoryRepositoryModule,
    FeedbackRepositoryModule,
  ],
  controllers: [ThreadController],
  providers: [ThreadService],
})
export class ThreadModule {}
