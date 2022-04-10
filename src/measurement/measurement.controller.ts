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
import { MeasurementDto } from './dto/measurement.dto';
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
  public async getMeasurementById(@Param('id') id: string): Promise<MeasurementDto> {
    const measurement = await this.measurementService.getMeasurementById(id);

    if (!measurement) {
      throw new NotFoundException(`Measurement not found with id ${id}`);
    }

    return measurement;
  }

  @Post()
  public async createMeasurement(@Body() measurement: MeasurementDto): Promise<MeasurementDto> {
    return this.measurementService.createMeasurement(measurement);
  }

  @Patch(':id')
  @HttpCode(204)
  public async updateMeasurement(
    @Param('id') id: string,
    @Body() measurement: MeasurementDto
  ): Promise<void> {
    const measurementToUpdate = await this.measurementService.getMeasurementById(id);

    if (!id || !measurementToUpdate) {
      throw new NotFoundException(`Measurement not found with id ${id}`);
    }

    await this.measurementService.updateMeasurement(id, measurement);
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
