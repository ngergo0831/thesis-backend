import { Controller, Get, Param } from '@nestjs/common';
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
    return this.intakeService.getIntakeById(id);
  }
}
