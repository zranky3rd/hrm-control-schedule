import { Body, Controller, Logger, Post } from '@nestjs/common';
import { CreateScheduleDto } from './input/create-schedule.dto';

@Controller('/schedules')
export class SchedulesController {
  private readonly logger = new Logger(SchedulesController.name);
  @Post()
  create(@Body() input: CreateScheduleDto) {
    this.logger.debug(input);
  }
}
