import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { UserRepositoryModule } from './modules/user/repository/user-repository.module';
import { AuthModule } from './modules/auth/auth.module';
import { AopModule } from '@toss/nestjs-aop';
import { ChatModule } from './modules/chat/chat.module';
import { ThreadModule } from './modules/thread/thread.module';
import { FeedbackModule } from './modules/feedback/feedback.module';

const applicationModules = [
  AuthModule,
  ChatModule,
  ThreadModule,
  FeedbackModule,
];

@Module({
  imports: [CoreModule, AopModule, UserRepositoryModule, ...applicationModules],
  controllers: [],
  providers: [],
})
export class AppModule {}
