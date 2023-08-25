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
import { CreateScheduleDto } from './input/create-schedule.dto';
import { Schedule } from './schedule.entity';
import { SchedulesService } from './schedules.service';
import { HrmTbDevicesService } from './hrm-devices.service';

@Controller('/schedules')
export class SchedulesController {
  private readonly logger = new Logger(SchedulesController.name);

  constructor(
    private readonly service: SchedulesService,
    private readonly hrmDevicesService: HrmTbDevicesService,
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
    const savedSchedule = await this.service.create(schedule);
    delete savedSchedule.devices;
    return savedSchedule;
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
