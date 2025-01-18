import { ConflictException, Injectable } from '@nestjs/common';
import { FeedbackRepository } from './repository/feedback.repository';
import { User } from 'src/entities/user/user.entity';
import { CreateFeedbackBody } from './dto/req/createFeedback.body';

@Injectable()
export class FeedbackService {
  constructor(private readonly feedbackRepository: FeedbackRepository) {}

  async createFeedback(userId: User['id'], body: CreateFeedbackBody) {
    const { chatHistoryId } = body;

    const isFeedbackExists = await this.feedbackRepository.findOneByFilters({
      userId,
      chatHistoryId,
    });

    if (isFeedbackExists) {
      throw new ConflictException('Feedback already exists');
    }

    const feedback = body.toEntity();
    feedback.userId = userId;

    return this.feedbackRepository.save(feedback);
  }
}
