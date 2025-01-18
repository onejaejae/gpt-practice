import { CustomRepository } from 'libs/common/typeorm.ex/typeorm-ex.decorator';
import { GenericTypeOrmRepository } from 'src/core/database/typeorm/generic-typeorm.repository';
import { Feedback } from 'src/entities/feedback/feedback.entity';

@CustomRepository(Feedback)
export class FeedbackRepository extends GenericTypeOrmRepository<Feedback> {}
