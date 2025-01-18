import { plainToInstance } from 'class-transformer';
import { Thread } from 'src/entities/thread/thread.entity';
import { User } from 'src/entities/user/user.entity';
import { ThreadRepository } from 'src/modules/thread/repository/thread.repository';

export class ThreadFactory {
  static async createThread(
    userId: User['id'],
    threadRepository: ThreadRepository,
  ): Promise<Thread> {
    const thread = plainToInstance(Thread, {
      userId,
    });

    return threadRepository.save(thread);
  }
}
