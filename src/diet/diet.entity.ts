import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  OneToOne
} from 'typeorm';
import { Comment } from '../comment/comment.entity';
import { Period } from '../enum/period.enum';
import { Intake } from '../intake/intake.entity';
import { User } from '../user/user.entity';

@Entity()
export class Diet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Intake)
  @JoinColumn()
  intake: Intake;

  @Column({ type: 'enum', enum: Period, nullable: true })
  period: Period;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'creatorId' })
  createdBy: User;

  @Column()
  creatorId: string;

  @OneToMany(() => Comment, (comment) => comment.diet)
  comments: Comment[];

  @ManyToMany(() => User, (user) => user.likedDiets)
  likedBy: User[];

  @ManyToMany(() => User, (user) => user.savedDiets)
  savedBy: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(diet?: Partial<Diet>) {
    Object.assign(this, diet);
  }
}
