import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { DietController } from './diet.controller';
import { Diet } from './diet.entity';
import { DietService } from './diet.service';

@Module({
  imports: [TypeOrmModule.forFeature([Diet]), UserModule],
  providers: [DietService],
  controllers: [DietController],
  exports: [TypeOrmModule, DietService]
})
export class DietModule {}
