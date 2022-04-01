import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Diet } from './diet.entity';
import { DietService } from './diet.service';

@ApiTags('Diets')
@Controller('diets')
export class DietController {
  constructor(private readonly dietService: DietService) {}

  @Get()
  public async getAllDiets(): Promise<Diet[]> {
    return this.dietService.getAllDiets();
  }

  @Get('/:id')
  public async getDietById(@Param('id') id: string): Promise<Diet> {
    const diet = await this.dietService.getDietById(id);

    if (!diet) {
      throw new NotFoundException(`Diet not found with id ${id}`);
    }

    return diet;
  }
}
