import { Exclude } from 'class-transformer';
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
  carbs: number;

  @Column()
  protein: number;

  @ManyToOne(() => User, (user) => user.intakes)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: true })
  userId: string;

  @OneToOne(() => Diet, (diet) => diet.intake)
  diet: Diet;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(intake?: Partial<Intake>) {
    Object.assign(this, intake);
  }
}
