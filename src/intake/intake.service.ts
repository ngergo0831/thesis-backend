import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Diet } from '../diet/diet.entity';
import { Period } from '../enum/period.enum';
import { IntakeDto } from './dto/intake.dto';
import { Intake } from './intake.entity';

@Injectable()
export class IntakeService {
  constructor(
    @InjectRepository(Intake) private readonly intakeRepository: Repository<Intake>,
    @InjectRepository(Diet) private readonly dietRepository: Repository<Diet>
  ) {}

  public async getAllIntakes(): Promise<IntakeDto[]> {
    return this.intakeRepository.find({
      order: {
        createdAt: 'DESC'
      },
      relations: ['diet']
    });
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

  public async createDiet(id: string, creatorId: string, period: Period): Promise<void> {
    const intakeInDatabase = await this.intakeRepository.findOne(id);

    if (!intakeInDatabase) {
      throw new NotFoundException(`Intake not found with id ${id}`);
    }

    const diet = new Diet({
      intakeId: intakeInDatabase.id,
      creatorId,
      period
    });

    await this.dietRepository.save(diet);
  }
}
