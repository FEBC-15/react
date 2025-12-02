import { useState } from "react";

export default function Counter(){

  const [ count, setCount ] = useState(0);

  return (
    <div id="counter">
      <button type="button">-_-</button>
      <button type="button">0_0</button>
      <button type="button">+_+</button>
      <span>0</span>
    </div>
  );
}