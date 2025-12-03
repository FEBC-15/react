import { useState } from "react";
import Button from "./Button";

export default function Counter(){
  console.log('\tCounter 렌더링.');

  const [ count, setCount ] = useState(0);

  const countUp = () => {
    setCount(count + 1);
  };

  function countDown(){
    setCount(count - 1);
  }

  const reset = () => {
    setCount(0);
  };

  return (
    <div id="counter">
      <Button type="submit" onClick={ countDown }>-_-</Button>
      <Button>0_0</Button>
      <Button onClick={ countUp }>+_+</Button>
      <span>{ count }</span>
    </div>
  );
}