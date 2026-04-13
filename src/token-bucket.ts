import { RateLimitResult } from './types';

export class TokenBucket {
  private tokens: number;
  private lastRefill: number;

  constructor(
    private capacity: number,
    private refillRate: number,
    private now: () => number = () => Date.now(),
  ) {
    this.tokens = capacity;
    this.lastRefill = now();
  }

  consume(): RateLimitResult {
    this.refill();

    if (this.tokens < 1) {
      const retryAfter = (1 - this.tokens) / this.refillRate;
      return { allowed: false, retryAfter };
    }

    this.tokens -= 1;
    return { allowed: true, remaining: this.tokens };
  }

  private refill(): void {
    const currentTime = this.now();
    const elapsed = (currentTime - this.lastRefill) / 1000;
    this.tokens = Math.min(this.capacity, this.tokens + elapsed * this.refillRate);
    this.lastRefill = currentTime;
  }
}
