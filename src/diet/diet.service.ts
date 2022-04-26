import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from '../user/dto/user.dto';
import { User } from '../user/user.entity';
import { Diet } from './diet.entity';
import { DietDto } from './dto/diet.dto';

@Injectable()
export class DietService {
  constructor(@InjectRepository(Diet) private dietRepository: Repository<Diet>) {}

  public async getAllDietsByUserId(userId: string): Promise<DietDto[]> {
    return this.dietRepository.find({
      where: { creatorId: userId },
      order: {
        createdAt: 'DESC'
      },
      relations: ['intake', 'comments', 'likedBy']
    });
  }

  public async getAllDiets(): Promise<DietDto[]> {
    return this.dietRepository.find({
      order: {
        createdAt: 'DESC'
      },
      relations: ['intake', 'comments', 'likedBy']
    });
  }

  public async getDietById(id: string): Promise<DietDto> {
    return this.dietRepository.findOne({ where: { id }, relations: ['likedBy'] });
  }

  public async createDiet(diet: DietDto): Promise<DietDto> {
    return this.dietRepository.save(diet);
  }

  public async updateDiet(id: string, diet: DietDto): Promise<void> {
    await this.dietRepository.update(id, diet);
  }

  public async deleteDiet(id: string): Promise<void> {
    await this.dietRepository.delete(id);
  }

  public async likeDiet(diet: Diet, user: User): Promise<void> {
    const alreadyLiked = diet.likedBy.some(({ id }) => id === user.id);

    if (alreadyLiked) {
      diet.likedBy = diet.likedBy.filter(({ id }) => id !== user.id);
    } else {
      diet.likedBy.push(user);
    }

    await this.dietRepository.save(diet);
  }
}
