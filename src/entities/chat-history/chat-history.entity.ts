import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { UuidEntity } from 'src/core/database/typeorm/base.entity';
import { ChatHistoryRole } from './chat-history.interface';
import { Thread } from '../thread/thread.entity';
import { Feedback } from '../feedback/feedback.entity';

@Entity('chat_history')
export class ChatHistory extends UuidEntity {
  @Column({ type: 'uuid' })
  threadId: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'enum', enum: ChatHistoryRole })
  role: ChatHistoryRole;

  @OneToMany(() => Feedback, (feedback) => feedback.ChatHistory)
  Feedbacks: Feedback[];

  @ManyToOne(() => Thread, (thread) => thread.ChatHistories)
  @JoinColumn({ name: 'thread_id' })
  Thread: Thread;
}
