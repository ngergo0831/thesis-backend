import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Diet } from './diet.entity';
import { DietDto } from './dto/diet.dto';

@Injectable()
export class DietService {
  constructor(@InjectRepository(Diet) private dietRepository: Repository<Diet>) {}

  public async getAllDiets(): Promise<DietDto[]> {
    return this.dietRepository.find();
  }

  public async getDietById(id: string): Promise<DietDto> {
    return this.dietRepository.findOne(id);
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
}
