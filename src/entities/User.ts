import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

import { v4 as uuid } from 'uuid';

@Entity('users')
export class User {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar')
  email: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
