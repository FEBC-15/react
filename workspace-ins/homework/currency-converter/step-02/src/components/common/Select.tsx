import React from 'react';

/**
 * Select 옵션 인터페이스
 * 드롭다운 옵션의 값과 표시 텍스트를 정의합니다.
 */
export interface Option {
  /** 옵션의 실제 값 */
  value: string;
  /** 사용자에게 표시될 레이블 텍스트 */
  label: string;
}

/**
 * Select 컴포넌트의 Props 인터페이스
 * React.SelectHTMLAttributes를 확장하여 기본 select 속성을 상속받습니다.
 */
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /** select 요소의 레이블 텍스트 */
  label: string;
  /** select 요소의 고유 식별자 */
  id: string;
  /** 드롭다운에 표시될 옵션 목록 */
  options: Option[];
}

/**
 * 공통 Select 컴포넌트
 * 
 * 재사용 가능한 드롭다운 select 컴포넌트입니다.
 * 레이블과 함께 옵션 목록을 표시하는 select 요소를 렌더링합니다.
 * 
 * @param props - SelectProps
 * @returns JSX.Element
 */
function Select({ label, id, options, ...props }: SelectProps) {
  return (
    <>
      <label htmlFor="from">From</label>

      <select id="from">
        <option value="KRW">KRW</option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="JPY">JPY</option>
      </select>
    </>
  );
}

export default Select;
