import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from '../../ormconfig';
import { CommentModule } from '../comment/comment.module';
import { DietModule } from '../diet/diet.module';
import { IntakeModule } from '../intake/intake.module';
import { MeasurementModule } from '../measurement/measurement.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    CommentModule,
    DietModule,
    IntakeModule,
    MeasurementModule,
    UserModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
