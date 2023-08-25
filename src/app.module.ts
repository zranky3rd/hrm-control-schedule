import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import ormConfig from './config/orm.config';
import { SchedulesModule } from './schedules/schedules.module';
import ormConfigAcc from './config/orm.config.acc';
import ormConfigStg from './config/orm.config.stg';
import ormConfigPrd from './config/orm.config.prd';

function getOrmConfig() {
  switch (process.env.NODE_ENV) {
    case 'development':
      return ormConfig;
    case 'acceptance':
      return ormConfigAcc;
    case 'staging':
      return ormConfigStg;
    case 'production':
      return ormConfigPrd;
  }
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ormConfig],
      expandVariables: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: getOrmConfig(),
    }),
    SchedulesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
