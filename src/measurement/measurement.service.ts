import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MeasurementDto } from './dto/measurement.dto';
import { Measurement } from './measurement.entity';

@Injectable()
export class MeasurementService {
  constructor(
    @InjectRepository(Measurement) private measurementRepository: Repository<Measurement>
  ) {}

  public async getAllMeasurements(userId: string): Promise<MeasurementDto[]> {
    return this.measurementRepository.find({
      where: { userId },
      order: {
        createdAt: 'DESC'
      }
    });
  }

  public async getMeasurementById(id: string): Promise<MeasurementDto> {
    return this.measurementRepository.findOne(id);
  }

  public async createMeasurement(measurement: MeasurementDto): Promise<MeasurementDto> {
    return this.measurementRepository.save(measurement);
  }

  public async updateMeasurement(id: string, measurement: MeasurementDto): Promise<void> {
    console.log(measurement);
    await this.measurementRepository.update(id, measurement);
  }

  public async deleteMeasurement(id: string): Promise<void> {
    await this.measurementRepository.delete(id);
  }
}
