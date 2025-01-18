import { Module } from '@nestjs/common';
import { FeedbackRepositoryModule } from './repository/feedback-repository.module';
import { FeedbackController } from './feedback.controller';
import { FeedbackService } from './feedback.service';
import { ThreadRepositoryModule } from '../thread/repository/thread-repository.module';
import { ChatHistoryRepositoryModule } from '../chat-history/repository/chat-history-repository.module';

@Module({
  imports: [
    FeedbackRepositoryModule,
    ThreadRepositoryModule,
    ChatHistoryRepositoryModule,
  ],
  controllers: [FeedbackController],
  providers: [FeedbackService],
})
export class FeedbackModule {}
