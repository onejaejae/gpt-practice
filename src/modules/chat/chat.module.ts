import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { UserRepositoryModule } from '../user/repository/user-repository.module';

@Module({
  imports: [ChatModule, UserRepositoryModule],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
