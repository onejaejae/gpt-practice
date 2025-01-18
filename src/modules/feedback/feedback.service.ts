import { ConflictException, Injectable } from '@nestjs/common';
import { FeedbackRepository } from './repository/feedback.repository';
import { User } from 'src/entities/user/user.entity';
import { CreateFeedbackBody } from './dto/req/createFeedback.body';
import { UserRole } from 'src/entities/user/user.interface';
import { FeedbackType, GetFeedbacksQuery } from './dto/req/getFeedbacks.query';
import { Feedback } from 'src/entities/feedback/feedback.entity';
import { FindOptionsWhere } from 'typeorm';
import { FeedBackStatus } from 'src/entities/feedback/feedback.interface';

@Injectable()
export class FeedbackService {
  constructor(private readonly feedbackRepository: FeedbackRepository) {}

  async getFeedbacks(
    userId: User['id'],
    role: UserRole,
    query: GetFeedbacksQuery,
  ) {
    const whereFilter: FindOptionsWhere<Feedback> = {
      userId,
    };

    if (query.feedbackType) {
      whereFilter.isPositive = query.feedbackType === FeedbackType.Positive;
    }

    if (role === UserRole.User) {
      return this.feedbackRepository.findMany(whereFilter, {
        createdAt: query.sortOption,
      });
    }

    return this.feedbackRepository.findMany(whereFilter, {
      createdAt: query.sortOption,
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

  async updateFeedback(feedbackId: Feedback['id']) {
    const feedback = await this.feedbackRepository.findByIdOrThrow(feedbackId);

    feedback.status = FeedBackStatus.Resolved;
    return this.feedbackRepository.save(feedback);
  }
}
