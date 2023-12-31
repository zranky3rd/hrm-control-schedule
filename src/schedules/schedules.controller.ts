import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Logger,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { Device } from './device.entity';
import { HrmTbDevicesService } from './hrm-devices.service';
import { CreateScheduleDto } from './input/create-schedule.dto';
import { Schedule } from './schedule.entity';
import { SchedulesService } from './schedules.service';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import constants from '../constants/constants';

@Controller('/schedules')
export class SchedulesController {
  private readonly logger = new Logger(SchedulesController.name);

  constructor(
    private readonly service: SchedulesService,
    private readonly hrmDevicesService: HrmTbDevicesService,
    @InjectQueue(constants.QUEUE_SCHEDULE)
    private readonly queue: Queue,
  ) {}

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  async createAndSendRequest(@Body() input: CreateScheduleDto) {
    this.logger.log('Hit createAndSendRequest()');

    const schedule = new Schedule({
      ...input,
    });

    schedule.devices = [];
    for (const di of input.deviceIds) {
      const rows = await this.hrmDevicesService.findUid(di);
      const device = new Device({ di });
      if (rows.length) {
        const [{ uid }] = rows;
        device.uid = uid;
      }
      schedule.devices.push(device);
    }
    await this.service.create(schedule);
    this.queue.clean(5000);
    this.queue.add(constants.QUEUE_JOB_SCHEDULE, new Schedule(schedule));
    delete schedule.devices;

    return schedule;
  }

  @Get('/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  async read(@Param('id', ParseIntPipe) id: number) {
    this.logger.log('Hit read()');
    const schedule = await this.service.findOne(id);
    if (!schedule) {
      throw new NotFoundException();
    }
    return schedule;
  }

  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    this.logger.log('Hit delete()');
    const schedule = await this.service.findOne(id);
    if (!schedule) {
      throw new NotFoundException();
    }
    this.service.delete(id);
  }
}
