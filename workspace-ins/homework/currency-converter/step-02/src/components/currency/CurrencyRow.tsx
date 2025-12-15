import React from 'react';
import Select from '../common/Select';
import type { Currency } from '../../types';
import type { Option } from '../common/Select';

/**
 * CurrencyRow 컴포넌트의 Props 인터페이스
 */
interface CurrencyRowProps {
  /** 변환할 원본 통화 */
  from: Currency;
  /** 변환될 대상 통화 */
  to: Currency;
  /** 원본 통화 변경 핸들러 */
  onFromChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  /** 대상 통화 변경 핸들러 */
  onToChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

/**
 * 지원하는 통화 옵션 목록
 * KRW, USD, EUR, JPY 네 가지 통화를 제공합니다.
 */
const CURRENCY_OPTIONS: Option[] = [
  { value: 'KRW', label: 'KRW' },
  { value: 'USD', label: 'USD' },
  { value: 'EUR', label: 'EUR' },
  { value: 'JPY', label: 'JPY' },
];

/**
 * 통화 선택 행 컴포넌트
 * 
 * 변환할 통화(From)와 변환될 통화(To)를 선택할 수 있는 두 개의 드롭다운을 나란히 배치하여 표시합니다.
 * 
 * @param props - CurrencyRowProps
 * @returns JSX.Element
 */
function CurrencyRow({ from, to, onFromChange, onToChange }: CurrencyRowProps) {
  return (
    <div className="row">
      <div>
        <Select
          label="From"
          id="from"
          options={CURRENCY_OPTIONS}
          value={from}
          onChange={onFromChange}
        />
      </div>
      <div>
        <Select
          label="To"
          id="to"
          options={CURRENCY_OPTIONS}
          value={to}
          onChange={onToChange}
        />
      </div>
    </div>
  );
}

export default CurrencyRow;
