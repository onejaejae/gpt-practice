import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UuidEntity } from 'src/core/database/typeorm/base.entity';
import { ChatHistory } from '../chat-history/chat-history.entity';
import { User } from '../user/user.entity';
import { FeedBackStatus } from './feedback.interface';

@Entity('feedback')
export class Feedback extends UuidEntity {
  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'uuid' })
  chatHistoryId: string;

  @Column({
    type: 'enum',
    enum: FeedBackStatus,
    default: FeedBackStatus.Pending,
  })
  status: FeedBackStatus;

  @Column({ type: 'boolean', default: true })
  isPositive: boolean;

  @ManyToOne(() => User, (user) => user.Feedbacks)
  @JoinColumn({ name: 'user_id' })
  User: User;

  @ManyToOne(() => ChatHistory, (chatHistory) => chatHistory.Feedbacks)
  @JoinColumn({ name: 'chat_history_id' })
  ChatHistory: ChatHistory;
}
