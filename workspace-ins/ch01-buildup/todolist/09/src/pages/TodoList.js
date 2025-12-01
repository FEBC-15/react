import Reaction from '../../../reaction.js';
import TodoItem from "./TodoItem.js";

function TodoList({ itemList, toggleDone, deleteItem }){
  // list = [ li, li, li ]
  const list = itemList.map(item => {
    return TodoItem({ item, toggleDone, deleteItem });
  });
  return (
    Reaction.createElement('ul', { class: 'todolist' }, list)
  );
}

export default TodoList;