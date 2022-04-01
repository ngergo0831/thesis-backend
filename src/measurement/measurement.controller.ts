import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Measurement } from './measurement.entity';
import { MeasurementService } from './measurement.service';

@ApiTags('Measurements')
@Controller('measurements')
export class MeasurementController {
  constructor(private readonly measurementService: MeasurementService) {}

  @Get()
  public async getAllMeasurements(): Promise<any> {
    return this.measurementService.getAllMeasurements();
  }

  @Get('/:id')
  public async getMeasurementById(@Param('id') id: string): Promise<Measurement> {
    return this.measurementService.getMeasurementById(id);
  }
}
