# Feature Specification: Rate Limiter

## 유저 시나리오

- 사용자가 API를 호출할 때, 설정된 제한을 초과하면 요청이 거부된다
- 제한 시간이 지나면 다시 요청할 수 있다

## 요구사항

### FR-001: Token Bucket 알고리즘

- 토큰이 일정 속도로 충전된다 (refillRate: 토큰/초)
- 요청 시 토큰을 1개 소비한다
- 토큰이 0이면 요청이 거부된다
- 최대 토큰 수(capacity)를 초과하여 충전되지 않는다

### FR-002: 키 기반 제한

- 키별로 독립적인 버킷을 관리한다 (예: IP별, 사용자별)
- 키가 없으면 글로벌 기본 버킷을 사용한다

### FR-003: 요청 결과

- 허용: `{ allowed: true, remaining: number }`
- 거부: `{ allowed: false, retryAfter: number }` (초 단위)

## 수락 기준

- Given capacity=5, refillRate=1/초
  When 5번 연속 요청
  Then 모두 허용, remaining이 4→3→2→1→0

- Given capacity=5, refillRate=1/초, 토큰=0
  When 요청
  Then 거부, retryAfter > 0

- Given 키 "user-A"와 "user-B"
  When 각각 독립 요청
  Then 서로 영향 없음

## 가정

- 단일 프로세스 환경 (분산 미고려)
- 시간 소스는 주입 가능해야 함 (테스트를 위해)
