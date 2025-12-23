export const COUNTER_ACTION = {
  UP: 'countUp',
  DOWN: 'countDown',
  RESET: 'countReset',
};

// TODO 1. ActionCreator 생성
// Store에 전달할 액션을 생성해서 반환
// Store에 전달된 액션은 다시 Reducer로 전달됨
// { type: 'countUp', payload: { step: 2 } }
const counterActionCreator = {
  countUp: (step: number) => ({ type: COUNTER_ACTION.UP, payload: { step } }),
  countDown: (step: number) => ({ type: COUNTER_ACTION.DOWN, payload: { step } }),
  countReset: () => ({ type: COUNTER_ACTION.RESET }),
};

export default counterActionCreator;