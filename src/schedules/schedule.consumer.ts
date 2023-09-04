import { Process, Processor } from '@nestjs/bull';
import constants from '../constants/constants';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';

@Processor(constants.QUEUE_SCHEDULE)
export class ScheduleConsumer {
  private readonly logger = new Logger(ScheduleConsumer.name);
  @Process(constants.QUEUE_JOB_SCHEDULE)
  async sendRequest(job: Job) {
    this.logger.debug(job.data);
  }
}
