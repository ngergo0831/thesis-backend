import { Module } from '@nestjs/common';
import { MeasurementService } from './measurement.service';
import { MeasurementController } from './measurement.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Measurement } from './measurement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Measurement])],
  providers: [MeasurementService],
  controllers: [MeasurementController],
  exports: [TypeOrmModule, MeasurementService]
})
export class MeasurementModule {}
