import CounterContext from '@/contexts/CounterContext';
import ThemeContext from '@/contexts/ThemeContext';
import { use, useEffect } from 'react';

function Left3() {
  useEffect(()=>{
    console.log('#### Left3 렌더링.');
  });

  // context 사용하기
  const { count } = use(CounterContext); // React 19에 추가

  // TODO 4. ThemeContext 사용하기(theme)
  const { theme } = use(ThemeContext);

  return (
    <div>
      {/* 라이트 모드에서는 숫자를, 다크 모드에서는 숫자만큼 별을 보여줌 */}

      <h3>Left3 { theme === 'dark' && ' - 💫' }</h3>
      <span>{ theme === 'light' ? count : new Array(count).fill('💫') }</span>

    </div>
  );
}

export default Left3;