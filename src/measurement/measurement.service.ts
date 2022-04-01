import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Measurement } from './measurement.entity';

@Injectable()
export class MeasurementService {
  constructor(
    @InjectRepository(Measurement) private measurementRepository: Repository<Measurement>
  ) {}

  public async getAllMeasurements(): Promise<Measurement[]> {
    return this.measurementRepository.find();
  }

  public async getMeasurementById(id: string): Promise<Measurement> {
    const measurement = await this.measurementRepository.findOne(id);

    if (!measurement) {
      throw new NotFoundException(`Measurement not found with id ${id}`);
    }

    return measurement;
  }
}
