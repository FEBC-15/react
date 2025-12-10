import type { CounterAction } from "@/reducers";
import { useState } from "react";

function useMyReducer(reducer: (state: number, action: CounterAction) => number, initValue: number){
  const [ state, setState ] = useState(initValue);

  function dispatch(action: CounterAction){
    const newState = reducer(state, action);
    setState(newState);
  }
  return [ state, dispatch ] as const;
}

export default useMyReducer;