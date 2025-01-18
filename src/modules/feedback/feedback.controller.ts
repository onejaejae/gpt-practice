import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
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
import { GetFeedbacksQuery } from './dto/req/getFeedbacks.query';
import { RolesGuard } from 'src/core/guard/role.guard';
import { Roles } from 'src/core/decorator/role.decorator';
import { UserRole } from 'src/entities/user/user.interface';
import { Feedback } from 'src/entities/feedback/feedback.entity';

@UseGuards(AccessTokenGuard)
@Controller('/feedbacks')
export class FeedbackController {
  constructor(private readonly service: FeedbackService) {}

  @Get('/')
  async getFeedbacks(
    @RequestedUser() user: User,
    @Query() query: GetFeedbacksQuery,
  ) {
    return this.service.getFeedbacks(user.id, user.role, query);
  }

  @ResourceKey(ResourceType.Feedback)
  @UseGuards(ResourceOwnerGuard)
  @Post('/')
  async createFeedback(
    @RequestedUser() user: User,
    @Body() body: CreateFeedbackBody,
  ) {
    return this.service.createFeedback(user.id, body);
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.Admin)
  @Patch('/:feedbackId')
  async updateFeedback(
    @Param('feedbackId', ParseUUIDPipe) feedbackId: Feedback['id'],
  ) {
    return this.service.updateFeedback(feedbackId);
  }
}
