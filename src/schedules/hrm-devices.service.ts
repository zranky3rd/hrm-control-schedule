import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class HrmTbDevicesService {
  private readonly logger = new Logger(HrmTbDevicesService.name);
  constructor(private dataSource: DataSource) {}

  findUid(di: string) {
    this.logger.log(`Hit findUid(), di: ${di}`);
    const manager = this.dataSource.manager;
    return manager.query('select uid from tb_device where di=? limit 1', [di]);
  }
}
