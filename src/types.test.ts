import { RateLimitResult, RateLimiterConfig } from './types';

describe('RateLimitResult', () => {
  test('허용 결과는 allowed와 remaining을 가진다', () => {
    const result: RateLimitResult = { allowed: true, remaining: 4 };
    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(4);
  });

  test('거부 결과는 allowed와 retryAfter를 가진다', () => {
    const result: RateLimitResult = { allowed: false, retryAfter: 1.5 };
    expect(result.allowed).toBe(false);
    expect(result.retryAfter).toBe(1.5);
  });
});

describe('RateLimiterConfig', () => {
  test('capacity와 refillRate를 가진다', () => {
    const config: RateLimiterConfig = { capacity: 5, refillRate: 1 };
    expect(config.capacity).toBe(5);
    expect(config.refillRate).toBe(1);
  });
});
