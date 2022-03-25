import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne
} from 'typeorm';
import { Diet } from '../diet/diet.entity';
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

  @OneToOne(() => Diet)
  @JoinColumn()
  diet: Diet;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(intake?: Partial<Intake>) {
    Object.assign(this, intake);
  }
}
