import { IsEmail, IsString } from 'class-validator';
import { Encrypt } from 'libs/util/encrypt';

export class SignInBody {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  validationPassword(hashedPassword: string) {
    return Encrypt.isSameAsHash(hashedPassword, this.password);
  }
}
