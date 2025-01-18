import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ThreadRepositoryModule } from '../thread/repository/thread-repository.module';

@Module({
  imports: [ChatModule, ThreadRepositoryModule],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
