import { useState } from "react";

// Props의 타입 정의
interface ClickMeProps {
  level: number;
}

function ClickMe({ level }: ClickMeProps) {
  const [ count, setCount ] = useState<number>(level);
  const increment = () => {
    setCount(count + 1 );
  }
  return (
    <div>
      { count } X { level }: { count * level }
      <button onClick={ increment }>클릭</button>
    </div>
  );
}

export default ClickMe;