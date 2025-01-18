import { plainToInstance } from 'class-transformer';
import { User } from 'src/entities/user/user.entity';
import { UserRepository } from 'src/modules/user/repository/user.repository';

export class UserFactory {
  static async createUser(
    email: User['email'],
    password: User['password'],
    name: User['name'],
    role: User['role'],
    userRepository: UserRepository,
  ): Promise<User> {
    const user = plainToInstance(User, {
      email,
      password,
      name,
      role,
    });

    return userRepository.save(user);
  }
}
