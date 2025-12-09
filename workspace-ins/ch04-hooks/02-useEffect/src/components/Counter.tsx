import Button from "@/components/Button";
import { useState } from "react";

interface CounterProps {
  children: string;
}

function Counter({ children }: CounterProps) {
  console.log('\tCounter 호출됨');

  const initCount = Number(children);
  const [ count, setCount ] = useState(initCount);
  const [ step, setStep ] = useState(1);

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

  // 리액트 규칙: 렌더링 중에 상태가 변경되면 안됨

  // TODO 1. 1초 후에 handleUp()을 호출해서 자동으로 값을 1회 증가

  // TODO 2. 증감치(step)가 수정되면 1초 후에 handleUp()을 호출해서 자동으로 값을 1회 증가

  // TODO 3. 1초마다 handleUp()을 호출해서 자동으로 값을 계속 증가

  return (
    <div id="counter">
      <label htmlFor="step">증감치</label>
      <input 
        id="step" 
        type="number" 
        value={ step }
        onChange={ (e) => setStep(Number(e.target.value)) }
      />
      <Button bgColor="red" color="black" onClick={ handleDown }>-_-</Button>
      <Button bgColor="gray" type="submit" onClick={ handleReset }>0_0</Button>
      <Button type="reset" onClick={ handleUp }>+_+</Button>
      <span>{ count }</span>
    </div>
  );
}

export default Counter;