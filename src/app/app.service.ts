import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';

@Injectable()
export class AppService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async create(data: any): Promise<User> {
    return this.userRepository.save(data);
  }

  async findOneEmail(email: string): Promise<User> {
    return this.userRepository
      .createQueryBuilder('user')
      .select('user.id')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();
  }

  async findOneId(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }
}
