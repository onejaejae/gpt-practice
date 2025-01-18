import { CustomRepository } from 'libs/common/typeorm.ex/typeorm-ex.decorator';
import { GenericTypeOrmRepository } from 'src/core/database/typeorm/generic-typeorm.repository';
import { Thread } from 'src/entities/thread/thread.entity';

@CustomRepository(Thread)
export class ThreadRepository extends GenericTypeOrmRepository<Thread> {}
