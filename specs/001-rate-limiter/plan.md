# Implementation Plan: Rate Limiter

## 구조

```
src/
├── rate-limiter.ts      # RateLimiter 클래스
├── token-bucket.ts      # TokenBucket (핵심 알고리즘)
└── types.ts             # 타입 정의
```

## 구현 순서

1. `types.ts` — RateLimitResult, RateLimiterConfig 타입 정의
2. `token-bucket.ts` — TokenBucket 클래스 (consume, refill 로직)
3. `rate-limiter.ts` — RateLimiter (키 기반 버킷 관리)

## 기술 결정

- 시간 소스를 `() => number` 함수로 주입 (기본값: `Date.now`)
- Map으로 키별 버킷 관리
- 타이머 불필요 — consume 시점에 경과 시간만큼 토큰 충전 (lazy refill)
