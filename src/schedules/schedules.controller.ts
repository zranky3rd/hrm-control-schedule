import { Controller, Logger, Post } from '@nestjs/common';

@Controller('/schedules')
export class SchedulesController {
  private readonly logger = new Logger(SchedulesController.name);
  @Post()
  create() {
    return;
  }
}
