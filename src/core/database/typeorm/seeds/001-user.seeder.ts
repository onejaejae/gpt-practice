import { Encrypt } from 'libs/util/encrypt';
import { User } from 'src/entities/user/user.entity';
import { UserRole } from 'src/entities/user/user.interface';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export default class UserSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const userRepository = dataSource.getRepository(User);

    const users: Partial<User>[] = [
      {
        email: 'test@test.com',
        password: await Encrypt.createHash('test'),
        name: 'test',
        role: UserRole.User,
      },
      {
        email: 'test2@test.com',
        password: await Encrypt.createHash('test'),
        name: 'test2',
        role: UserRole.Admin,
      },
    ];

    // Create entity instances
    const userEntities = userRepository.create(users);

    // Save the created entities
    await userRepository.save(userEntities);
  }
}
