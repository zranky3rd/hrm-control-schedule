import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from './schedule.entity';

@Injectable()
export class SchedulesService {
  private readonly logger = new Logger(SchedulesService.name);
  constructor(
    @InjectRepository(Schedule)
    private readonly repository: Repository<Schedule>,
  ) {}

  create(schedule: Schedule) {
    this.logger.log('Hit create()');
    return this.repository.save(schedule);
  }

  findOne(id: number): Promise<Schedule | undefined> {
    this.logger.log(`Hit findOne(), id: ${id}`);
    return this.repository.findOne({
      where: { id },
      relations: { devices: true },
    });
  }

  delete(id: number) {
    this.logger.log(`Hit delete(), id: ${id}`);
    return this.repository.delete({ id });
  }
}
