import { Module } from '@nestjs/common';
import { MeasurementService } from './measurement.service';
import { MeasurementController } from './measurement.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Measurement } from './measurement.entity';
import { MeasurementSubscriber } from './measurement.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([Measurement])],
  providers: [MeasurementService, MeasurementSubscriber],
  controllers: [MeasurementController],
  exports: [TypeOrmModule, MeasurementService]
})
export class MeasurementModule {}
