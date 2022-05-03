import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { DietController } from './diet.controller';
import { Diet } from './diet.entity';
import { DietService } from './diet.service';
import { DietSubscriber } from './diet.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([Diet]), UserModule],
  providers: [DietService, DietSubscriber],
  controllers: [DietController],
  exports: [TypeOrmModule, DietService]
})
export class DietModule {}
