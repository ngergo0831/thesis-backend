import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  public async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  public async getUserById(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  public async createUser(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  public async updateUser(user: User): Promise<void> {
    await this.userRepository.update(user.id, user);
  }

  public async deleteUser(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
