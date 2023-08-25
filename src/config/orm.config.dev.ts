import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Device } from 'src/schedules/device.entity';
import { Schedule } from 'src/schedules/schedule.entity';

export default registerAs(
  'orm.config',
  (): TypeOrmModuleOptions => ({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Schedule, Device],
    synchronize: true,
    dropSchema: !!+process.env.DB_DROP_SCHEMA,
    timezone: 'UTC',
  }),
);
