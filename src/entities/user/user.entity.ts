import { Entity, Column, OneToMany } from 'typeorm';
import { UuidEntity } from 'src/core/database/typeorm/base.entity';
import { ChatHistory } from '../chat-history/chat-history.entity';
import { UserRole } from './user.interface';

@Entity()
export class User extends UuidEntity {
  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

  @OneToMany(() => ChatHistory, (chatHistory) => chatHistory.User)
  chatHistories: ChatHistory[];
}
