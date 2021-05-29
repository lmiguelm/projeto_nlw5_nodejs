import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

import { v4 as uuid } from 'uuid';
import { User } from './User';

@Entity('messages')
export class Message {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar', { name: 'admin_id' })
  adminId: string;

  @Column('varchar')
  text: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id' })
  userId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
