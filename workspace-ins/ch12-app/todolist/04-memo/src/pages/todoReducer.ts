import type { TodoItem } from "@pages/TodoItem";
import { produce } from "immer";

type TodoAction = 
  | { type: 'ADD'; value: TodoItem }
  | { type: 'TOGGLE' | 'DELETE'; value: Pick<TodoItem, '_id'> };

function todoReducer(state: TodoItem[], action: TodoAction){
  let newState;

  const targetIndex = state.findIndex(item => item._id === action.value._id);

  switch(action.type){
    case 'ADD':
      newState = produce(state, draft => {
        draft.push(action.value);
      });
      break;
    case 'TOGGLE':
      newState = produce(state, draft => {
        draft[targetIndex].done = !draft[targetIndex].done;
      });
      break;
    case 'DELETE':
      newState = produce(state, draft => {
        draft.splice(targetIndex, 1);
      });
      break;
    default:
      newState = state;
  }

  return newState;
}

export default todoReducer;