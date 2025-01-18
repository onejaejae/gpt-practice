import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { UuidEntity } from 'src/core/database/typeorm/base.entity';
import { User } from '../user/user.entity';
import { ChatHistory } from '../chat-history/chat-history.entity';

@Entity('thread')
export class Thread extends UuidEntity {
  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne(() => User, (user) => user.Threads)
  @JoinColumn({ name: 'user_id' })
  User: User;

  @OneToMany(() => ChatHistory, (chatHistory) => chatHistory.Thread)
  ChatHistories: ChatHistory[];
}
