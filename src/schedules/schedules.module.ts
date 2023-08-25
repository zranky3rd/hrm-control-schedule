import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from './schedule.entity';
import { Device } from './device.entity';
import { SchedulesController } from './schedules.controller';
import { SchedulesService } from './schedules.service';
import { HrmTbDevicesService } from './hrm-devices.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([Schedule, Device]),
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
  ],
  controllers: [SchedulesController],
  providers: [SchedulesService, HrmTbDevicesService],
})
export class SchedulesModule {}
