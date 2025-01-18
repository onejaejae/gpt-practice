import { plainToInstance } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';
import { Encrypt } from 'libs/util/encrypt';
import { User } from 'src/entities/user/user.entity';
import { UserRole } from 'src/entities/user/user.interface';

export class SignUpBody {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  async toEntity(): Promise<User> {
    const hashedPassword = await Encrypt.createHash(this.password);

    return plainToInstance(User, {
      ...this,
      password: hashedPassword,
      role: UserRole.User,
    });
  }
}
