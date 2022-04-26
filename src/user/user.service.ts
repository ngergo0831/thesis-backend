import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DietDto } from '../diet/dto/diet.dto';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  public async getAllUsers(): Promise<UserDto[]> {
    return this.userRepository.find();
  }

  public async getUserById(id: string): Promise<UserDto> {
    return this.userRepository.findOne(id);
  }

  public async createUser(user: UserDto): Promise<UserDto> {
    return this.userRepository.save(user);
  }

  public async updateUser(id: string, user: UserDto): Promise<void> {
    await this.userRepository.update(id, user);
  }

  public async deleteUser(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  public async getSavedDietsByUserId(userId: string): Promise<DietDto[]> {
    const user = await this.userRepository.findOne(userId, {
      relations: ['savedDiets', 'savedDiets.intake', 'savedDiets.comments', 'savedDiets.likedBy']
    });
    return user.savedDiets;
  }
}
