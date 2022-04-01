import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Diet } from './diet.entity';
import { DietService } from './diet.service';

@ApiTags('Diets')
@Controller('diets')
export class DietController {
  constructor(
    @InjectRepository(Diet) private readonly dietRepository: Repository<Diet>,
    private readonly dietService: DietService
  ) {}

  @Get()
  public async getAllDiets(): Promise<Diet[]> {
    return this.dietRepository.find();
  }

  @Get('/:id')
  public async getDietById(@Param('id') id: string): Promise<Diet> {
    const diet = await this.dietRepository.findOne(id);

    if (!diet) {
      throw new NotFoundException(`Diet not found with id ${id}`);
    }

    return diet;
  }
}
