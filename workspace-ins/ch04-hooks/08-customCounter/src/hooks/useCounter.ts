import { useState } from "react";

function useCounter(initCount: number) {
  const [ count, setCount ] = useState(initCount);
  const [ step, setStep ] = useState(1);

  const handleStepChange = (newStep: number) => {
    setStep(newStep);
  };

  // 카운트 감소
  const handleDown = () => {
    setCount(count - step);
  };

  // 카운트 증가
  const handleUp = () => {
    setCount(count + step);
  };

  // 카운트 초기화
  const handleReset = () => {
    setCount(initCount);
  };

  return { count, step, handleStepChange, handleDown, handleUp, handleReset };
}

export default useCounter;