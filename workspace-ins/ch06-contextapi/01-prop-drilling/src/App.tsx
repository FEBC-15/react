import { useEffect, useState } from 'react';
import Left1 from '@/components/Left1';
import Right1 from '@/components/Right1';
import './App.css';
import { CounterProvider } from '@/contexts/CounterContext';

function App() {

  // count 정의
  const [count, setCount] = useState(0);

  // countUp() 정의
  const countUp = (step: number) => {
    setCount(count + step);
  };

  useEffect(()=>{
    console.log('# App 렌더링.');
  });

  return (
    <>
      <h1>01 Prop Drilling</h1>
      <div id="container">
        <h1>App</h1>
        <div id="grid">
          {/* 자식 컴포넌트에 Context 제공 */}
          <CounterProvider>
            <Left1 count={ count } /> {/* props로 count 전달 */}
            <Right1 countUp={ countUp } /> {/* props로 countUp 전달 */}
          </CounterProvider>
        </div>
      </div>
    </>
  );
}

export default App;