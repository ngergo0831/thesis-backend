import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post
} from '@nestjs/common';
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
    const measurement = await this.measurementService.getMeasurementById(id);

    if (!measurement) {
      throw new NotFoundException(`Measurement not found with id ${id}`);
    }

    return measurement;
  }

  @Post()
  public async createMeasurement(@Body() measurement: Measurement): Promise<Measurement> {
    return this.measurementService.createMeasurement(measurement);
  }

  @Patch(':id')
  @HttpCode(204)
  public async updateMeasurement(
    @Param('id') id: string,
    @Body() measurement: Measurement
  ): Promise<void> {
    const measurementToUpdate = await this.measurementService.getMeasurementById(id);

    if (!id || !measurementToUpdate) {
      throw new NotFoundException(`Measurement not found with id ${id}`);
    }

    await this.measurementService.updateMeasurement(measurement);
  }

  @Delete(':id')
  @HttpCode(204)
  public async deleteMeasurement(@Param('id') id: string): Promise<void> {
    const measurementToDelete = await this.measurementService.getMeasurementById(id);

    if (!id || !measurementToDelete) {
      throw new NotFoundException(`Measurement not found with id ${id}`);
    }

    await this.measurementService.deleteMeasurement(id);
  }
}
