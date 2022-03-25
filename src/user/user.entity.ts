import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BeforeInsert } from 'typeorm';
import * as moment from 'moment';
import { Exclude } from 'class-transformer';
import { Gender } from '../enum/gender.enum';

const bcrypt = require('bcrypt');

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

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

  @CreateDateColumn()
  createdAt: Date;

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
