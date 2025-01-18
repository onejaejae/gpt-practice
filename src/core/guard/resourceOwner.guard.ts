import {
  Injectable,
  CanActivate,
  ForbiddenException,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ThreadRepository } from 'src/modules/thread/repository/thread.repository';
import {
  RESOURCE_TYPE_KEY,
  ResourceType,
} from '../decorator/resource-owner.decorator';
import { UserRole } from 'src/entities/user/user.interface';
import { ChatHistoryRepository } from 'src/modules/chat-history/repository/chat-history.repository';
import { FeedbackRepository } from 'src/modules/feedback/repository/feedback.repository';

@Injectable()
export class ResourceOwnerGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly threadRepository: ThreadRepository,
    private readonly chatHistoryRepository: ChatHistoryRepository,
    private readonly feedbackRepository: FeedbackRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const resourceType = this.reflector.getAllAndOverride<string>(
      RESOURCE_TYPE_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!resourceType)
      throw new ForbiddenException('Resource type is not defined');

    const request: Request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user) return false;

    if (user.role === UserRole.Admin) return true;

    switch (resourceType) {
      case ResourceType.Thread: {
        const resourceId = request.params.threadId;
        const resource =
          await this.threadRepository.findByIdOrThrow(resourceId);

        return resource.userId === user.id;
      }

      case ResourceType.Feedback: {
        const resourceId = request.params.chatHistoryId;
        const resource =
          await this.chatHistoryRepository.findOneWithOmitNotJoinedProps(
            {
              id: resourceId,
            },
            { Thread: true },
          );

        if (!resource) throw new NotFoundException('Chat history not found');

        return resource.Thread.userId === user.id;
      }

      default:
        return false;
    }
  }
}
