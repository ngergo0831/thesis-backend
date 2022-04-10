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
import { Intake } from './intake.entity';
import { IntakeService } from './intake.service';

@ApiTags('Intakes')
@Controller('intakes')
export class IntakeController {
  constructor(private readonly intakeService: IntakeService) {}

  @Get()
  public async getAllIntakes(): Promise<Intake[]> {
    return this.intakeService.getAllIntakes();
  }

  @Get('/:id')
  public async getIntakeById(@Param('id') id: string): Promise<Intake> {
    const intake = await this.intakeService.getIntakeById(id);

    if (!intake) {
      throw new NotFoundException(`Intake not found with id ${id}`);
    }

    return intake;
  }

  @Post()
  public async createIntake(@Body() intake: Intake): Promise<Intake> {
    return this.intakeService.createIntake(intake);
  }

  @Patch(':id')
  @HttpCode(204)
  public async updateIntake(@Param('id') id: string, @Body() intake: Intake): Promise<void> {
    const intakeToUpdate = await this.intakeService.getIntakeById(id);

    if (!id || !intakeToUpdate) {
      throw new NotFoundException(`Intake not found with id ${id}`);
    }

    await this.intakeService.updateIntake(intake);
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
}
