import React from 'react';

/**
 * Input 컴포넌트의 Props 인터페이스
 * React.InputHTMLAttributes를 확장하여 기본 input 속성을 상속받습니다.
 */
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** input 요소의 레이블 텍스트 */
  label: string;
  /** input 요소의 고유 식별자 */
  id: string;
}

/**
 * 공통 Input 컴포넌트
 * 
 * 재사용 가능한 입력 필드 컴포넌트입니다.
 * 레이블과 함께 input 요소를 렌더링합니다.
 * 
 * @param props - InputProps
 * @returns JSX.Element
 */
function Input({ label, id, ...props }: InputProps) {
  return (
    <>
      <label htmlFor="amount">금액</label>
      <input id="amount" type="number" step="1" value="100" />
    </>
  );
}

export default Input;
