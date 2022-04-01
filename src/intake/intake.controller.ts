import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Intake } from './intake.entity';
import { IntakeService } from './intake.service';

@ApiTags('Intakes')
@Controller('intakes')
export class IntakeController {
  constructor(
    @InjectRepository(Intake) private readonly intakeRepository: Repository<Intake>,
    private readonly intakeService: IntakeService
  ) {}

  @Get()
  public async getAllIntakes(): Promise<Intake[]> {
    return this.intakeRepository.find();
  }

  @Get('/:id')
  public async getIntakeById(@Param('id') id: string): Promise<Intake> {
    const intake = await this.intakeRepository.findOne(id);

    if (!intake) {
      throw new NotFoundException(`Intake not found with id ${id}`);
    }

    return intake;
  }
}
