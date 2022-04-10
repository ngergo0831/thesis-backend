import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Intake } from './intake.entity';

@Injectable()
export class IntakeService {
  constructor(@InjectRepository(Intake) private readonly intakeRepository: Repository<Intake>) {}

  public async getAllIntakes(): Promise<Intake[]> {
    return this.intakeRepository.find();
  }

  public async getIntakeById(id: string): Promise<Intake> {
    return this.intakeRepository.findOne(id);
  }

  public async createIntake(intake: Intake): Promise<Intake> {
    return this.intakeRepository.save(intake);
  }

  public async updateIntake(intake: Intake): Promise<void> {
    await this.intakeRepository.update(intake.id, intake);
  }

  public async deleteIntake(id: string): Promise<void> {
    await this.intakeRepository.delete(id);
  }
}
