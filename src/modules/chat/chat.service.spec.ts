import { INestApplication } from '@nestjs/common';
import { CoreModule } from 'src/core/core.module';
import { UserRepository } from '../user/repository/user.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { FeedbackRepositoryModule } from '../feedback/repository/feedback-repository.module';
import { FeedbackRepository } from '../feedback/repository/feedback.repository';
import { ThreadRepositoryModule } from '../thread/repository/thread-repository.module';
import { ThreadRepository } from '../thread/repository/thread.repository';
import { ChatHistoryRepositoryModule } from '../chat-history/repository/chat-history-repository.module';
import { ChatHistoryRepository } from '../chat-history/repository/chat-history.repository';
import { ChatService } from './chat.service';
import { ChatModule } from './chat.module';
import { UserFactory } from 'test/factory/user.factory';
import { UserRole } from 'src/entities/user/user.interface';
import { ThreadFactory } from 'test/factory/thread.factory';
import { ChatHistoryRole } from 'src/entities/chat-history/chat-history.interface';
import { ChatHistoryFactory } from 'test/factory/chat-history.factory';
import { GetChatsQuery } from './req/getChats.query';

let app: INestApplication;
let service: ChatService;
let userRepository: UserRepository;
let feedbackRepository: FeedbackRepository;
let threadRepository: ThreadRepository;
let chatHistoryRepository: ChatHistoryRepository;

beforeAll(async () => {
  initializeTransactionalContext();

  const module: TestingModule = await Test.createTestingModule({
    imports: [
      CoreModule,
      ChatModule,
      FeedbackRepositoryModule,
      ThreadRepositoryModule,
      ChatHistoryRepositoryModule,
    ],
  }).compile();

  app = module.createNestApplication();
  await app.init();

  userRepository = module.get<UserRepository>(UserRepository);
  feedbackRepository = module.get<FeedbackRepository>(FeedbackRepository);
  threadRepository = module.get<ThreadRepository>(ThreadRepository);
  chatHistoryRepository = module.get<ChatHistoryRepository>(
    ChatHistoryRepository,
  );

  service = module.get<ChatService>(ChatService);
});

describe('ChatService', () => {
  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await chatHistoryRepository.deleteAllForTest();
    await threadRepository.deleteAllForTest();
    await feedbackRepository.deleteAllForTest();
    await userRepository.deleteAllForTest();
  });

  describe('getChats', () => {
    it('특정 스레드의 채팅 내역을 페이지네이션하여 가져옵니다. ', async () => {
      // given
      const user = await UserFactory.createUser(
        'test@example.com',
        'password123',
        'test',
        UserRole.User,
        userRepository,
      );
      const thread = await ThreadFactory.createThread(
        user.id,
        threadRepository,
      );
      const chatHistory1 = await ChatHistoryFactory.createChatHistory(
        thread.id,
        'test',
        ChatHistoryRole.User,
        chatHistoryRepository,
      );
      const chatHistory2 = await ChatHistoryFactory.createChatHistory(
        thread.id,
        'test',
        ChatHistoryRole.Assistant,
        chatHistoryRepository,
      );

      const query = new GetChatsQuery();

      // when
      const result = await service.getChats(user.id, query);

      // then
      expect(result.list[0].id).toBe(user.id);
    });
  });
});
