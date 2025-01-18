import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { UserRepository } from '../user/repository/user.repository';
import { JwtTokenService } from 'src/core/jwt/jwt.service';
import { SignInBody } from './dto/req/signIn.body';
import { Transactional } from 'typeorm-transactional';
import { SignUpBody } from './dto/req/signUp.body';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtTokenService: JwtTokenService,
  ) {}

  @Transactional()
  async signUp(body: SignUpBody) {
    const existUser = await this.userRepository.findOneByFilters({
      email: body.email,
    });
    if (existUser) throw new ConflictException('이미 존재하는 email입니다.');

    const userEntity = await body.toEntity();
    const user = await this.userRepository.save(userEntity);

    return user;
  }

  async signIn(body: SignInBody) {
    const { email } = body;
    const user = await this.userRepository.findOneOrThrow({
      email,
    });

    const isValidPassword = body.validationPassword(user.password);
    if (!isValidPassword)
      throw new BadRequestException('비밀번호가 일치하지 않습니다.');

    return this.jwtTokenService.generateTokens(user.id);
  }
}
