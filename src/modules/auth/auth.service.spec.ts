import {
  BadRequestException,
  ConflictException,
  INestApplication,
  NotFoundException,
} from '@nestjs/common';
import { CoreModule } from 'src/core/core.module';
import { UserRepository } from '../user/repository/user.repository';
import { AuthService } from './auth.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from './auth.module';
import { EntityManager } from 'typeorm';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { SignUpBody } from './dto/req/signUp.body';
import { SignInBody } from './dto/req/signIn.body';
import { UserFactory } from 'test/factory/user.factory';
import { UserRole } from 'src/entities/user/user.interface';
import { Encrypt } from 'libs/util/encrypt';
import { FeedbackRepositoryModule } from '../feedback/repository/feedback-repository.module';
import { FeedbackRepository } from '../feedback/repository/feedback.repository';
import { ThreadRepositoryModule } from '../thread/repository/thread-repository.module';
import { ThreadRepository } from '../thread/repository/thread.repository';
import { ChatHistoryRepositoryModule } from '../chat-history/repository/chat-history-repository.module';
import { ChatHistoryRepository } from '../chat-history/repository/chat-history.repository';

let app: INestApplication;
let service: AuthService;
let userRepository: UserRepository;
let feedbackRepository: FeedbackRepository;
let threadRepository: ThreadRepository;
let chatHistoryRepository: ChatHistoryRepository;
let entityManager: EntityManager;

beforeAll(async () => {
  initializeTransactionalContext();

  const module: TestingModule = await Test.createTestingModule({
    imports: [
      CoreModule,
      AuthModule,
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

  service = module.get<AuthService>(AuthService);
});

describe('AuthService', () => {
  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await chatHistoryRepository.deleteAllForTest();
    await threadRepository.deleteAllForTest();
    await feedbackRepository.deleteAllForTest();
    await userRepository.deleteAllForTest();
  });

  describe('signUp', () => {
    it('회원가입 API 정상 동작합니다. - 비밀번호는 암호화되어 저장됩니다.', async () => {
      // given
      const email = 'test@example.com';
      const password = 'password123';
      const name = 'test';

      const dto = new SignUpBody();
      dto.email = email;
      dto.password = password;
      dto.name = name;

      const user = await service.signUp(dto);

      // then;
      expect(user).toBeDefined();
      expect(user.email).toBe(dto.email);
      expect(user.name).toBe(dto.name);
      expect(user.password).not.toBe(dto.password);
    });

    it('이미 존재하는 이메일로 가입 시도시 에러가 발생합니다.', async () => {
      // given
      const email = 'test@example.com';
      const password = 'password123';
      const name = 'test';

      const dto = new SignUpBody();
      dto.email = email;
      dto.password = password;
      dto.name = name;

      // when
      await service.signUp(dto);

      // then
      await expect(service.signUp(dto)).rejects.toThrow(
        new ConflictException('이미 존재하는 email입니다.'),
      );
    });
  });

  describe('signIn', () => {
    it('로그인 API 정상 동작합니다.', async () => {
      // given
      const email = 'test@example.com';
      const plainPassword = 'password123';
      const hashedPassword = await Encrypt.createHash(plainPassword);
      const name = 'test';
      const role = UserRole.User;

      await UserFactory.createUser(
        email,
        hashedPassword,
        name,
        role,
        userRepository,
      );

      const signInDto = new SignInBody();
      signInDto.email = email;
      signInDto.password = plainPassword;

      // when
      const result = await service.signIn(signInDto);

      // then
      expect(result).toBeDefined();
    });

    it('잘못된 비밀번호로 로그인 시도시 에러가 발생합니다.', async () => {
      // given
      const email = 'test@example.com';
      const password = 'password123';
      const name = 'test';
      const role = UserRole.User;

      await UserFactory.createUser(email, password, name, role, userRepository);

      const signInDto = new SignInBody();
      signInDto.email = email;
      signInDto.password = 'wrongpassword';

      // then
      await expect(service.signIn(signInDto)).rejects.toThrow(
        new BadRequestException('비밀번호가 일치하지 않습니다.'),
      );
    });

    it('존재하지 않는 이메일로 로그인 시도시 에러가 발생합니다.', async () => {
      // given
      const signInDto = new SignInBody();
      signInDto.email = 'nonexistent@example.com';
      signInDto.password = 'password123';

      // then
      await expect(service.signIn(signInDto)).rejects.toThrow(
        new NotFoundException(`don't exist email: ${signInDto.email}`),
      );
    });
  });
});
