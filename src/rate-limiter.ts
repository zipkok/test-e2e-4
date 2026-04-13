import { RateLimiterConfig, RateLimitResult } from './types';
import { TokenBucket } from './token-bucket';

const GLOBAL_KEY = '__global__';

export class RateLimiter {
  private buckets = new Map<string, TokenBucket>();

  constructor(
    private config: RateLimiterConfig,
    private now: () => number = () => Date.now(),
  ) {}

  consume(key?: string): RateLimitResult {
    const bucketKey = key ?? GLOBAL_KEY;

    if (!this.buckets.has(bucketKey)) {
      this.buckets.set(
        bucketKey,
        new TokenBucket(this.config.capacity, this.config.refillRate, this.now),
      );
    }

    return this.buckets.get(bucketKey)!.consume();
  }
}
