import { Injectable } from '@nestjs/common';
import { ThreadRepository } from './repository/thread.repository';

@Injectable()
export class ThreadService {
  constructor(private readonly threadRepository: ThreadRepository) {}

  async deleteThread(threadId: string) {
    return this.threadRepository.softDelete(threadId);
  }
}
