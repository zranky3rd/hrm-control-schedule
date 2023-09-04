import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import constants from '../constants/constants';
import { Device } from './device.entity';
import { HrmTbDevicesService } from './hrm-devices.service';
import { ScheduleConsumer } from './schedule.consumer';
import { Schedule } from './schedule.entity';
import { SchedulesController } from './schedules.controller';
import { SchedulesService } from './schedules.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Schedule, Device]),
    BullModule.registerQueue({
      name: constants.QUEUE_SCHEDULE,
    }),
  ],
  controllers: [SchedulesController],
  providers: [SchedulesService, HrmTbDevicesService, ScheduleConsumer],
})
export class SchedulesModule {}
