import { Controller, Post } from '@nestjs/common';

@Controller('/schedules')
export class SchedulesController {
  @Post()
  create() {
    return;
  }
}
