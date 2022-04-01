import { Controller, Get, Param } from '@nestjs/common';
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
    return this.dietService.getDietById(id);
  }
}
