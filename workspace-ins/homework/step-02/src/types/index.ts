/**
 * 타입 정의 파일
 * 환율 계산기에 사용되는 타입들을 정의합니다.
 */

/**
 * 지원하는 통화 타입
 * - KRW: 대한민국 원화
 * - USD: 미국 달러
 * - EUR: 유럽 연합 유로
 * - JPY: 일본 엔화
 */
export type Currency = 'KRW' | 'USD' | 'EUR' | 'JPY';

/**
 * 환율 정보를 담는 인터페이스
 * 각 통화를 기준으로 다른 통화들의 환율을 저장합니다.
 */
export interface ExchangeRates {
  KRW: number;
  USD: number;
  EUR: number;
  JPY: number;
}
