// Launch.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export enum LaunchType {
  CREDIT = 'credit',
  DEBIT = 'debit',
}

@Entity('launches')
export class Launch {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column({
    type: 'enum',
    enum: LaunchType,
  })
  type!: LaunchType;

  @Column('decimal', { precision: 10, scale: 2 })
  value!: number;

  @Column()
  category!: string;

  @Column({ type: 'timestamp' })
  launchDate!: Date;

  @CreateDateColumn()
  createdAt!: Date;
}