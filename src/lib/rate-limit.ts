import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { headers } from 'next/headers';

type RateLimitConfig = {
  requests: number;
  duration: `${number} s` | `${number} m` | `${number} h` | `${number} d`;
};

const cache = new Map();

class RateLimiter {
  private static instance: RateLimiter;
  private redis: Redis;

  private constructor() {
    this.redis = Redis.fromEnv();
  }

  public static getInstance(): RateLimiter {
    if (!RateLimiter.instance) {
      RateLimiter.instance = new RateLimiter();
    }
    return RateLimiter.instance;
  }

  public async limit(
    identifier: string,
    config: RateLimitConfig
  ): Promise<{
    success: boolean;
    limit: number;
    remaining: number;
    reset: number;
  }> {
    const limiter = new Ratelimit({
      redis: this.redis,
      limiter: Ratelimit.slidingWindow(config.requests, config.duration),
      analytics: true,
      prefix: `ratelimit:${identifier}`,
      ephemeralCache: cache,
    });

    const { success, limit, remaining, reset } =
      await limiter.limit(identifier);
    return { success, limit, remaining, reset };
  }

  public async getClientIp(): Promise<string> {
    const forwardedFor = (await headers()).get('x-forwarded-for');
    if (forwardedFor) {
      console.log({ forwardedFor });
      return forwardedFor.split(',')[0] ?? 'Unknown';
    }
    return (await headers()).get('x-real-ip') ?? 'Unknown';
  }
}

export const rateLimiter = RateLimiter.getInstance();
