import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from 'src/core/guard/accessToken.guard';
import { RequestedUser } from 'src/core/decorator/user.decorator';
import { User } from 'src/entities/user/user.entity';
import { FeedbackService } from './feedback.service';
import {
  ResourceKey,
  ResourceType,
} from 'src/core/decorator/resource-owner.decorator';
import { ResourceOwnerGuard } from 'src/core/guard/resourceOwner.guard';
import { CreateFeedbackBody } from './dto/req/createFeedback.body';
import { Feedback } from 'src/entities/feedback/feedback.entity';

@UseGuards(AccessTokenGuard)
@Controller('/feedbacks')
export class FeedbackController {
  constructor(private readonly service: FeedbackService) {}

  @ResourceKey(ResourceType.GetFeedbacks)
  @UseGuards(ResourceOwnerGuard)
  @Get('/:feedbackId')
  async getFeedback(
    @RequestedUser() user: User,
    @Param('feedbackId') feedbackId: Feedback['id'],
  ) {
    return this.service.getFeedback(user.id, feedbackId);
  }

  @ResourceKey(ResourceType.CreateFeedback)
  @UseGuards(ResourceOwnerGuard)
  @Post('/')
  async createFeedback(
    @RequestedUser() user: User,
    @Body() body: CreateFeedbackBody,
  ) {
    return this.service.createFeedback(user.id, body);
  }
}
