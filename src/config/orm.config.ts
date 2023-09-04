import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import constants from '../constants/constants';
import { Device } from '../schedules/device.entity';
import { Schedule } from '../schedules/schedule.entity';

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
    synchronize: process.env.NODE_ENV === constants.NODE_ENV_DEV,
    dropSchema: false,
  }),
);
