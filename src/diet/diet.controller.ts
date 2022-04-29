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
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { Diet } from './diet.entity';
import { DietService } from './diet.service';
import { DietDto } from './dto/diet.dto';

@ApiTags('Diets')
@Controller('diets')
export class DietController {
  constructor(
    private readonly dietService: DietService,
    private readonly userService: UserService
  ) {}

  @Get()
  public async getAllDiets(): Promise<DietDto[]> {
    return this.dietService.getAllDiets();
  }

  @Get('user/:id')
  public async getAllDietsByUserId(@Param('id') userId: string): Promise<DietDto[]> {
    return this.dietService.getAllDietsByUserId(userId);
  }

  @Get(':id')
  public async getDietById(@Param('id') id: string): Promise<DietDto> {
    const diet = await this.dietService.getDietById(id);

    if (!diet) {
      throw new NotFoundException(`Diet not found with id ${id}`);
    }

    return diet;
  }

  @Post()
  public async createDiet(@Body() diet: DietDto): Promise<DietDto> {
    return this.dietService.createDiet(diet);
  }

  @Patch(':id')
  @HttpCode(204)
  public async updateDiet(@Param('id') id: string, @Body() diet: DietDto): Promise<void> {
    const dietToUpdate = await this.dietService.getDietById(id);

    if (!id || !dietToUpdate) {
      throw new NotFoundException(`Diet not found with id ${id}`);
    }

    await this.dietService.updateDiet(id, diet);
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

  @Post(':id/like')
  public async likeDiet(
    @Param('id') id: string,
    @Body() { userId }: { userId: string }
  ): Promise<void> {
    const diet = (await this.dietService.getDietById(id)) as Diet;
    const user = (await this.userService.getUserById(userId)) as User;

    if (!diet || !user) {
      throw new NotFoundException(`Diet or user not found with id ${id}`);
    }

    return this.dietService.likeDiet(diet, user);
  }

  @Post(':id/save')
  public async saveDiet(
    @Param('id') id: string,
    @Body() { userId }: { userId: string }
  ): Promise<void> {
    const diet = (await this.dietService.getDietById(id)) as Diet;
    const user = (await this.userService.getUserById(userId)) as User;

    if (!diet || !user) {
      throw new NotFoundException(`Diet or user not found with id ${id}`);
    }

    return this.dietService.saveDiet(diet, user);
  }
}
