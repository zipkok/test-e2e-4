import { RateLimiter } from './rate-limiter';

describe('RateLimiter', () => {
  test('키별로 독립적인 버킷을 관리한다', () => {
    const limiter = new RateLimiter({ capacity: 1, refillRate: 1 }, () => 0);

    const a = limiter.consume('user-A');
    const b = limiter.consume('user-B');

    expect(a.allowed).toBe(true);
    expect(b.allowed).toBe(true);
  });

  test('같은 키는 같은 버킷을 사용한다', () => {
    const limiter = new RateLimiter({ capacity: 1, refillRate: 1 }, () => 0);

    limiter.consume('user-A'); // 1→0
    const result = limiter.consume('user-A'); // 0 → 거부

    expect(result.allowed).toBe(false);
  });

  test('키 없으면 글로벌 기본 버킷을 사용한다', () => {
    const limiter = new RateLimiter({ capacity: 2, refillRate: 1 }, () => 0);

    const r1 = limiter.consume();
    const r2 = limiter.consume();
    const r3 = limiter.consume();

    expect(r1.allowed).toBe(true);
    expect(r2.allowed).toBe(true);
    expect(r3.allowed).toBe(false);
  });
});
