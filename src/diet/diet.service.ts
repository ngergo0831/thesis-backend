import { Injectable, NotFoundException } from '@nestjs/common';
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
    const diet = await this.dietRepository.findOne(id);

    if (!diet) {
      throw new NotFoundException(`Diet not found with id ${id}`);
    }

    return diet;
  }
}
