export type RateLimitResult =
  | { allowed: true; remaining: number }
  | { allowed: false; retryAfter: number };

export interface RateLimiterConfig {
  capacity: number;
  refillRate: number; // 토큰/초
}
