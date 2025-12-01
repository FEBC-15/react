// Counter 컴포넌트
function Counter(){
  console.log('Counter 렌더링됨.');
  
  // 상태
  const [ count, setCount ] = Reaction.useState(5);

  // 카운터 감소
  const handleDown = () => {
    setCount(count - 1);
  };

  // 카운터 증가
  const handleUp = () => {
    setCount(count + 1);
  };

  // 카운터 초기화
  const handleReset = event => {
    console.log(event);
    setCount(0);
  };
  
  return (
    Reaction.createElement('div', { id: 'counter' }, 
      Reaction.createElement('button', { type: 'button', onclick: handleDown }, '-'), 
      Reaction.createElement('button', { type: 'button', onclick: handleReset }, 0), 
      Reaction.createElement('button', { type: 'button', onclick: handleUp }, '+'), 
      Reaction.createElement('span', null, count))
  );
}

export default Counter;