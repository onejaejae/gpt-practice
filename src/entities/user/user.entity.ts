import { Entity, Column, OneToMany } from 'typeorm';
import { UuidEntity } from 'src/core/database/typeorm/base.entity';
import { UserRole } from './user.interface';
import { Thread } from '../thread/thread.entity';
import { Feedback } from '../feedback/feedback.entity';

@Entity('user')
export class User extends UuidEntity {
  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

  @OneToMany(() => Thread, (thread) => thread.User)
  Threads: Thread[];

  @OneToMany(() => Feedback, (feedback) => feedback.User)
  Feedbacks: Feedback[];
}
