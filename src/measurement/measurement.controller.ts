import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Measurement } from './measurement.entity';
import { MeasurementService } from './measurement.service';

@ApiTags('Measurements')
@Controller('measurements')
export class MeasurementController {
  constructor(
    @InjectRepository(Measurement) private readonly measurementRepository: Repository<Measurement>,
    private readonly measurementService: MeasurementService
  ) {}

  @Get()
  public async getAllMeasurements(): Promise<any> {
    return this.measurementRepository.find();
  }

  @Get('/:id')
  public async getMeasurementById(@Param('id') id: string): Promise<Measurement> {
    const measurement = await this.measurementRepository.findOne(id);

    if (!measurement) {
      throw new NotFoundException(`Measurement not found with id ${id}`);
    }

    return measurement;
  }
}
