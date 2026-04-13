import { TokenBucket } from './token-bucket';

describe('TokenBucket', () => {
  test('초기 토큰은 capacity와 같다', () => {
    const bucket = new TokenBucket(5, 1, () => 0);
    const result = bucket.consume();
    expect(result).toEqual({ allowed: true, remaining: 4 });
  });

  test('토큰을 모두 소비하면 거부한다', () => {
    const bucket = new TokenBucket(2, 1, () => 0);
    bucket.consume(); // 2→1
    bucket.consume(); // 1→0
    const result = bucket.consume(); // 0 → 거부
    expect(result.allowed).toBe(false);
    if (!result.allowed) {
      expect(result.retryAfter).toBeGreaterThan(0);
    }
  });

  test('시간이 지나면 토큰이 충전된다', () => {
    let now = 0;
    const bucket = new TokenBucket(2, 1, () => now);
    bucket.consume(); // 2→1
    bucket.consume(); // 1→0

    now = 2000; // 2초 후 → 2토큰 충전
    const result = bucket.consume();
    expect(result.allowed).toBe(true);
  });

  test('토큰은 capacity를 초과하여 충전되지 않는다', () => {
    let now = 0;
    const bucket = new TokenBucket(3, 1, () => now);

    now = 10000; // 10초 후 → 10토큰 충전 시도
    const result = bucket.consume();
    expect(result).toEqual({ allowed: true, remaining: 2 }); // capacity(3) - 1 = 2
  });
});
