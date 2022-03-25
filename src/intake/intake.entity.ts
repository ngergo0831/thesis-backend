import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Intake {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  calorie: number;

  @Column()
  fat: number;

  @Column()
  ch: number;

  @Column()
  protein: number;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: true })
  userId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(intake?: Partial<Intake>) {
    Object.assign(this, intake);
  }
}
