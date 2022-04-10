import { Injectable } from '@nestjs/common';
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
    return this.measurementRepository.findOne(id);
  }

  public async createMeasurement(measurement: Measurement): Promise<Measurement> {
    return this.measurementRepository.save(measurement);
  }

  public async updateMeasurement(measurement: Measurement): Promise<void> {
    await this.measurementRepository.update(measurement.id, measurement);
  }

  public async deleteMeasurement(id: string): Promise<void> {
    await this.measurementRepository.delete(id);
  }
}
