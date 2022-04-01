import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
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
}
