import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from './config/orm.config';
import { SchedulesModule } from './schedules/schedules.module';
import { BullModule } from '@nestjs/bull';
import bullConfig from './config/bull.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ormConfig],
      expandVariables: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: ormConfig,
    }),
    BullModule.forRootAsync({
      useFactory: bullConfig,
    }),
    SchedulesModule,
  ],
})
export class AppModule {}
