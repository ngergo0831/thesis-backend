import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DietModule } from '../diet/diet.module';
import { IntakeController } from './intake.controller';
import { Intake } from './intake.entity';
import { IntakeService } from './intake.service';
import { IntakeSubscriber } from './intake.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([Intake]), DietModule],
  providers: [IntakeService, IntakeSubscriber],
  controllers: [IntakeController],
  exports: [TypeOrmModule, IntakeService]
})
export class IntakeModule {}
