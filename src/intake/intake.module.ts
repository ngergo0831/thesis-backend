import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IntakeController } from './intake.controller';
import { Intake } from './intake.entity';
import { IntakeService } from './intake.service';

@Module({
  imports: [TypeOrmModule.forFeature([Intake])],
  providers: [IntakeService],
  controllers: [IntakeController],
  exports: [TypeOrmModule, IntakeService]
})
export class IntakeModule {}
