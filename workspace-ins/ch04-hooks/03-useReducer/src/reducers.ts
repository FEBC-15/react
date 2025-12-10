export interface CounterAction {
  type: 'UP' | 'DOWN' | 'RESET';
  value: number;
}

// 리듀서 함수
// 현재 상태와 action 객체를 받아서 새로운 상태를 반환하는 순수 함수
// 상태 변경 로직은 컴포넌트 내부에 두지 않고 외부에서 구현
// state: 이전 상태
// action: 동작을 정의한 작업(자유롭게 작성. 일반적으로 type 속성에 동작을, value 속성에 값을 지정)
// 리턴값: 새로운 상태
// 호출 예시, counterReducer(5, { type: 'UP', value: 3 }); -> 8
export function counterReducer(state: number, action: CounterAction) {
  let newState = state;

  switch(action.type){
    case 'UP':
      newState = state + action.value;
      break;
    case 'DOWN':
      newState = state - action.value;
      break;
    case 'RESET':
      newState = action.value;
      break;
    default :
      break;
  }

  console.log(`${state} ${action.type} ${action.value} -> ${newState}`);
  return newState;
}

console.log(counterReducer(5, { type: 'UP', value: 3 }) === 8); // 8
console.log(counterReducer(19, { type: 'DOWN', value: 10 }) === 9); // 9
console.log(counterReducer(30, { type: 'RESET', value: 10 }) === 10); // 10