import { Redis } from '@upstash/redis';
import { ConfigService } from '@nestjs/config';

export const redisFactory = {
  inject: [ConfigService],
  useFactory: (config: ConfigService): Redis => {
    return new Redis({
      url: config.getOrThrow<string>('UPSTASH_REDIS_REST_URL'),
      token: config.getOrThrow<string>('UPSTASH_REDIS_REST_TOKEN'),
    });
  },
};
