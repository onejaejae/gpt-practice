import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from 'src/core/guard/accessToken.guard';
import { ThreadService } from './thread.service';
import {
  ResourceKey,
  ResourceType,
} from 'src/core/decorator/resource-owner.decorator';
import { ResourceOwnerGuard } from 'src/core/guard/resourceOwner.guard';
import { Thread } from 'src/entities/thread/thread.entity';

@UseGuards(AccessTokenGuard)
@Controller('/threads')
export class ThreadController {
  constructor(private readonly service: ThreadService) {}

  @ResourceKey(ResourceType.Thread)
  @UseGuards(ResourceOwnerGuard)
  @Delete('/:threadId')
  async deleteThread(@Param('threadId') threadId: Thread['id']) {
    return this.service.deleteThread(threadId);
  }
}
