import Button from "@/components/Button";
import useMyReducer from "@/hooks/useMyReducer";
import { counterReducer } from "@/reducers";
import { useReducer, useState } from "react";

interface CounterProps {
  children: string;
}

function Counter({ children }: CounterProps) {
  console.log('\tCounter 호출됨');

  const initCount = Number(children);
  // const [ count, setCount ] = useState(initCount);
  const [ count, countDispatch ] = useReducer(counterReducer, initCount);
  
  // const [ count, countDispatch ] = useMyReducer(counterReducer, initCount); // custom hooks으로 작성
  const [ step, setStep ] = useState(1);

  // 카운트 감소
  const handleDown = () => {
    countDispatch({ type: 'DOWN', value: step });
    // counterReducer(10, { type: 'DOWN', value: 1 });
  };

  // 카운트 증가
  const handleUp = () => {
    countDispatch({ type: 'UP', value: step });
  };

  // 카운트 초기화
  const handleReset = () => {
    countDispatch({ type: 'RESET', value: initCount });
  };

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