import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from '../../ormconfig';
import { CommentModule } from '../comment/comment.module';
import { DietModule } from '../diet/diet.module';
import { IntakeModule } from '../intake/intake.module';
import { MeasurementModule } from '../measurement/measurement.module';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    CommentModule,
    DietModule,
    IntakeModule,
    MeasurementModule,
    UserModule,
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' }
    })
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
