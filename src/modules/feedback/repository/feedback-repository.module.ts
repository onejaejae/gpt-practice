import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'libs/common/typeorm.ex/typeorm-ex.module';
import { FeedbackRepository } from './feedback.repository';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([FeedbackRepository])],
  exports: [TypeOrmExModule.forCustomRepository([FeedbackRepository])],
})
export class FeedbackRepositoryModule {}
