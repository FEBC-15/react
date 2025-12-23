import { createContext, useState } from "react";

interface CounterContextType {
  count: number;
  countUp: (step: number) => void;
  reset: (initValue: number) => void;
  countDown: (step: number) => void;
}

// 1. Context 객체 생성
// const CounterContext = createContext<CounterContextType | null>(null);
const CounterContext = createContext<CounterContextType>({
  count: 0,
  countUp: () => {},
  countDown: () => {},
  reset: () => {}
});

// 2. Provider 컴포넌트를 만들어서 export
export function CounterProvider({ children }: { children: React.ReactNode }){
  const [count, setCount] = useState(10);

  const countUp = (step: number) => {
    setCount(count + step);
  };

  const reset = (initValue: number) => {
    setCount(initValue);
  };

  const countDown = (step: number) => {
    setCount(count - step);
  };

  const context = { count, countUp, reset, countDown };

  return (
    <CounterContext value={context}>
      { children }
    </CounterContext>
  );
}

export default CounterContext;
