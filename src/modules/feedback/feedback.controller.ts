import { Body, Controller, Post, UseGuards } from '@nestjs/common';
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

@UseGuards(AccessTokenGuard)
@Controller('/feedbacks')
export class FeedbackController {
  constructor(private readonly service: FeedbackService) {}

  @ResourceKey(ResourceType.Feedback)
  @UseGuards(ResourceOwnerGuard)
  @Post('/')
  async createFeedback(
    @RequestedUser() user: User,
    @Body() body: CreateFeedbackBody,
  ) {
    return this.service.createFeedback(user.id, body);
  }
}
