import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from '../../ormconfig';
import { CommentModule } from '../comment/comment.module';
import { DietModule } from '../diet/diet.module';
import { IntakeModule } from '../intake/intake.module';
import { MeasurementModule } from '../measurement/measurement.module';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import type { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';

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
    }),
    CacheModule.register<RedisClientOptions>({
      isGlobal: true,
      ttl: 10, // seconds
      max: 10,
      store: redisStore,
      host: 'localhost',
      port: 6379,
      password: 'secret'
    })
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor
    },
    AppService
  ]
})
export class AppModule {}
