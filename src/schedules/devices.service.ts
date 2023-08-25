import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Device } from './device.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DevicesService {
  private readonly logger = new Logger(DevicesService.name);

  constructor(
    @InjectRepository(Device)
    private readonly repository: Repository<Device>,
  ) {}
}
