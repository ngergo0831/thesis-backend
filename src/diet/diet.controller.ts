import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post
} from '@nestjs/common';
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

  @Post()
  public async createDiet(@Body() diet: Diet): Promise<Diet> {
    return this.dietService.createDiet(diet);
  }

  @Patch(':id')
  @HttpCode(204)
  public async updateDiet(@Param('id') id: string, @Body() diet: Diet): Promise<void> {
    const dietToUpdate = await this.dietService.getDietById(id);

    if (!id || !dietToUpdate) {
      throw new NotFoundException(`Diet not found with id ${id}`);
    }

    await this.dietService.updateDiet(diet);
  }

  @Delete(':id')
  @HttpCode(204)
  public async deleteDiet(@Param('id') id: string): Promise<void> {
    const dietToDelete = await this.dietService.getDietById(id);

    if (!id || !dietToDelete) {
      throw new NotFoundException(`Diet not found with id ${id}`);
    }

    await this.dietService.deleteDiet(id);
  }
}
