import { countAtom } from '@/jotai/atoms';
import { useAtomValue } from 'jotai';
import { useEffect } from 'react';

function Left3() {
  useEffect(()=>{
    console.log('#### Left3 렌더링.');
  });

  // useAtomValue: countAtom 구독
  const count = useAtomValue(countAtom);

  return (
    <div>
      <h3>Left3</h3>
      <span>{ count }</span>
    </div>
  );
}

export default Left3;