import { useEffect } from 'react';
import Left1 from '@/components/Left1';
import Right1 from '@/components/Right1';
import './App.css';
import { CounterProvider } from '@/contexts/CounterContext';
import ThemeToggle from '@components/ThemeToggle';

function App() {

  useEffect(()=>{
    console.log('# App 렌더링.');
  });

  return (
    <>
      <h1>04 Context API - 테마 변경 <ThemeToggle /></h1>
      <div id="container">
        <h1>App</h1>
        <div id="grid">
          <CounterProvider>
            <Left1 />
            <Right1 />
          </CounterProvider>
        </div>
      </div>
    </>
  );
}

export default App;