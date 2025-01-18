import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'libs/common/typeorm.ex/typeorm-ex.module';
import { ChatHistoryRepository } from './chat-history.repository';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([ChatHistoryRepository])],
  exports: [TypeOrmExModule.forCustomRepository([ChatHistoryRepository])],
})
export class ChatHistoryRepositoryModule {}
