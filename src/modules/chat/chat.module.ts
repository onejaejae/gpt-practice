import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ThreadRepositoryModule } from '../thread/repository/thread-repository.module';
import { ChatHistoryRepositoryModule } from '../chat-history/repository/chat-history-repository.module';
import { FeedbackRepositoryModule } from '../feedback/repository/feedback-repository.module';
import { UserRepositoryModule } from '../user/repository/user-repository.module';

@Module({
  imports: [
    ChatModule,
    UserRepositoryModule,
    ThreadRepositoryModule,
    ChatHistoryRepositoryModule,
    FeedbackRepositoryModule,
  ],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
