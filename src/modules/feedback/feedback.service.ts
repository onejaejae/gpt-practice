import { ConflictException, Injectable } from '@nestjs/common';
import { FeedbackRepository } from './repository/feedback.repository';
import { User } from 'src/entities/user/user.entity';
import { CreateFeedbackBody } from './dto/req/createFeedback.body';
import { Feedback } from 'src/entities/feedback/feedback.entity';

@Injectable()
export class FeedbackService {
  constructor(private readonly feedbackRepository: FeedbackRepository) {}

  async getFeedback(userId: User['id'], feedbackId: Feedback['id']) {
    return this.feedbackRepository.findOneByFilters({
      userId,
      id: feedbackId,
    });
  }

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
