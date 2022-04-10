import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Diet } from './diet.entity';

@Injectable()
export class DietService {
  constructor(@InjectRepository(Diet) private dietRepository: Repository<Diet>) {}

  public async getAllDiets(): Promise<Diet[]> {
    return this.dietRepository.find();
  }

  public async getDietById(id: string): Promise<Diet> {
    return this.dietRepository.findOne(id);
  }

  public async createDiet(diet: Diet): Promise<Diet> {
    return this.dietRepository.save(diet);
  }

  public async updateDiet(diet: Diet): Promise<void> {
    await this.dietRepository.update(diet.id, diet);
  }

  public async deleteDiet(id: string): Promise<void> {
    await this.dietRepository.delete(id);
  }
}
