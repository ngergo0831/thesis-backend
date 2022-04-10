import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IntakeDto } from './dto/intake.dto';
import { Intake } from './intake.entity';

@Injectable()
export class IntakeService {
  constructor(@InjectRepository(Intake) private readonly intakeRepository: Repository<Intake>) {}

  public async getAllIntakes(): Promise<IntakeDto[]> {
    return this.intakeRepository.find();
  }

  public async getIntakeById(id: string): Promise<IntakeDto> {
    return this.intakeRepository.findOne(id);
  }

  public async createIntake(intake: IntakeDto): Promise<IntakeDto> {
    return this.intakeRepository.save(intake);
  }

  public async updateIntake(id: string, intake: IntakeDto): Promise<void> {
    await this.intakeRepository.update(id, intake);
  }

  public async deleteIntake(id: string): Promise<void> {
    await this.intakeRepository.delete(id);
  }
}
