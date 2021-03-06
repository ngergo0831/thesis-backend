import {
  Body,
  CACHE_MANAGER,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  NotFoundException,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Cache } from 'cache-manager';
import { DietDto } from '../diet/dto/diet.dto';
import { Period } from '../enum/period.enum';
import { IntakeDto } from './dto/intake.dto';
import { IntakeService } from './intake.service';

@ApiTags('Intakes')
@Controller('intakes')
export class IntakeController {
  constructor(
    private readonly intakeService: IntakeService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  @Get()
  public async getAllIntakes(): Promise<IntakeDto[]> {
    const cachedResponse = await this.cacheManager.get('intakes');

    if (cachedResponse) {
      return cachedResponse as IntakeDto[];
    }

    const intakes = await this.intakeService.getAllIntakes();

    await this.cacheManager.set('intakes', intakes, { ttl: 0 });

    return intakes;
  }

  @Get(':id')
  public async getIntakeById(@Param('id') id: string): Promise<IntakeDto> {
    const intake = await this.intakeService.getIntakeById(id);

    if (!intake) {
      throw new NotFoundException(`Intake not found with id ${id}`);
    }

    return intake;
  }

  @Post()
  public async createIntake(@Body() intake: IntakeDto): Promise<IntakeDto> {
    return this.intakeService.createIntake(intake);
  }

  @Patch(':id')
  @HttpCode(204)
  public async updateIntake(@Param('id') id: string, @Body() intake: IntakeDto): Promise<void> {
    const intakeToUpdate = await this.intakeService.getIntakeById(id);

    if (!id || !intakeToUpdate) {
      throw new NotFoundException(`Intake not found with id ${id}`);
    }

    await this.intakeService.updateIntake(id, intake);
  }

  @Delete(':id')
  @HttpCode(204)
  public async deleteIntake(@Param('id') id: string): Promise<void> {
    const intakeToDelete = await this.intakeService.getIntakeById(id);

    if (!id || !intakeToDelete) {
      throw new NotFoundException(`Intake not found with id ${id}`);
    }

    await this.intakeService.deleteIntake(id);
  }

  @Post(':id/create-diet')
  public async createDiet(
    @Param('id') id: string,
    @Body('creatorId') creatorId: string,
    @Body('period') period: Period
  ): Promise<DietDto> {
    return this.intakeService.createDiet(id, creatorId, period);
  }
}
