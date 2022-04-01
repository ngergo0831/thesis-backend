import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DietController } from './diet.controller';
import { Diet } from './diet.entity';
import { DietService } from './diet.service';

@Module({
  imports: [TypeOrmModule.forFeature([Diet])],
  providers: [DietService],
  controllers: [DietController],
  exports: [TypeOrmModule, DietService]
})
export class DietModule {}
