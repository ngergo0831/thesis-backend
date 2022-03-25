import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BeforeInsert,
  OneToMany,
  ManyToMany,
  JoinTable,
  UpdateDateColumn
} from 'typeorm';
import * as moment from 'moment';
import { Exclude } from 'class-transformer';
import { Gender } from '../enum/gender.enum';
import { Diet } from '../diet/diet.entity';
import { Comment } from '../comment/comment.entity';
import { Intake } from '../intake/intake.entity';
import { Measurement } from '../measurement/measurement.entity';

const bcrypt = require('bcrypt');

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'float', nullable: true })
  weight?: number;

  @Column({ type: 'float', nullable: true })
  height?: number;

  @Column({ type: 'enum', enum: Gender, nullable: true })
  gender?: Gender;

  @Column({ nullable: true })
  DOB?: Date;

  @OneToMany(() => Diet, (diet) => diet.createdBy)
  diets: Diet[];

  @ManyToMany(() => Diet, (diet) => diet.savedBy)
  @JoinTable()
  savedDiets: Diet[];

  @ManyToMany(() => Diet, (diet) => diet.likedBy)
  @JoinTable()
  likedDiets: Diet[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => Intake, (intake) => intake.user)
  intakes: Intake[];

  @OneToMany(() => Measurement, (measurement) => measurement.user)
  measurements: Measurement[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Exclude()
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @Exclude()
  get age() {
    if (!this.DOB) {
      return undefined;
    }
    return moment().diff(moment(this.DOB), 'years');
  }

  constructor(user?: Partial<User>) {
    Object.assign(this, user);
  }
}
