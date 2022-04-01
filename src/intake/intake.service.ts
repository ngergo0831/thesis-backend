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
    const intake = await this.intakeRepository.findOne(id);

    if (!intake) {
      throw new NotFoundException(`Intake not found with id ${id}`);
    }

    return intake;
  }
}
