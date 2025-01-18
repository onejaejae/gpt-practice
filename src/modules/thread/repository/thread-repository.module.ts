import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'libs/common/typeorm.ex/typeorm-ex.module';
import { ThreadRepository } from './thread.repository';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([ThreadRepository])],
  exports: [TypeOrmExModule.forCustomRepository([ThreadRepository])],
})
export class ThreadRepositoryModule {}
