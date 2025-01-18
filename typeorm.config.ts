import { config } from 'dotenv';
import { ChatHistory } from 'src/entities/chat-history/chat-history.entity';
import { Feedback } from 'src/entities/feedback/feedback.entity';
import { Thread } from 'src/entities/thread/thread.entity';
import { User } from 'src/entities/user/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const configDataSource = async () => {
  console.log('NODE_ENV', process.env.NODE_ENV);
  const nodeEnv = process.env.NODE_ENV ?? 'local';
  config({ path: `./dotenv/.env.${nodeEnv}` });

  const options: DataSourceOptions & SeederOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '', 10),
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [User, ChatHistory, Feedback, Thread],
    namingStrategy: new SnakeNamingStrategy(),
    synchronize: false,
    logging: true,
    migrations: [__dirname + '/src/core/database/typeorm/migrations/*.ts'],
    migrationsRun: false,
    migrationsTableName: 'migrations',
    migrationsTransactionMode: 'each',
    seeds: [__dirname + '/src/core/database/typeorm/seeds/*.seeder.ts'],
    seedTracking: false,
    factories: [
      __dirname + '/src/core/database/typeorm/seeds/factories/**/*.ts',
    ],
  };
  console.log(options);

  return options;
};

export default configDataSource().then((opt) => new DataSource(opt));
