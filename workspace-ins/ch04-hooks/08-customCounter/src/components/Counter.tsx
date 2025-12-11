import Button from "@/components/Button";
import useCounter from "@/hooks/useCounter";
import { useState } from "react";

interface CounterProps {
  children: string;
}

function Counter({ children }: CounterProps) {
  console.log('\tCounter 호출됨');

  const initCount = Number(children);

  const { count, step, handleStepChange, handleDown, handleUp, handleReset } = useCounter(initCount);

  return (
    <div id="counter">
      <label htmlFor="step">증감치</label>
      <input 
        id="step" 
        type="number" 
        value={ step }
        onChange={ (e) => handleStepChange(Number(e.target.value)) }
      />
      <Button bgColor="red" color="black" onClick={ handleDown }>-_-</Button>
      <Button bgColor="gray" type="submit" onClick={ handleReset }>0_0</Button>
      <Button type="reset" onClick={ handleUp }>+_+</Button>
      <span>{ count }</span>
    </div>
  );
}

export default Counter;