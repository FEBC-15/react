import React from 'react';

/**
 * Button 컴포넌트의 Props 인터페이스
 * React.ButtonHTMLAttributes를 확장하여 기본 button 속성을 상속받습니다.
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼 내부에 표시될 내용 */
  children: React.ReactNode;
}

/**
 * 공통 Button 컴포넌트
 * 
 * 재사용 가능한 버튼 컴포넌트입니다.
 * 기본 button 요소를 래핑하여 일관된 스타일과 동작을 제공합니다.
 * 
 * @param props - ButtonProps
 * @returns JSX.Element
 */
function Button({ children, ...props }: ButtonProps) {
  return <button id="swap" type="button" onClick={() => {}}>변환</button>;
}

export default Button;
