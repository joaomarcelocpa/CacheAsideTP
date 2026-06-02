import { Module } from '@nestjs/common';
import { redisFactory } from './redis.config';

export const REDIS_CLIENT = 'REDIS_CLIENT';

@Module({
  providers: [
    {
      provide: REDIS_CLIENT,
      ...redisFactory,
    },
  ],
  exports: [REDIS_CLIENT],
})
export class RedisModule {}
