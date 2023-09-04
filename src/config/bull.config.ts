import { BullRootModuleOptions } from '@nestjs/bull';
import { registerAs } from '@nestjs/config';
import constants from '../constants/constants';

export default registerAs(
  'bull.config',
  (): BullRootModuleOptions => ({
    redis: {
      host: process.env.REDIS_HOST,
      port: constants.REDIS_PORT,
    },
  }),
);
