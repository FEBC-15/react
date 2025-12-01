import Reaction from '../../../reaction.js';
import TodoInput from './TodoInput.js';
import TodoList from './TodoList.js';

function Todo({ itemList, addItem, toggleDone, deleteItem }){
  return (
    Reaction.createElement('div', { id: 'main' },
      Reaction.createElement('div', { id: 'container' },
        Reaction.createElement('ul', null,
          Reaction.createElement('li', null,
            Reaction.createElement('h2', null, '할일 목록'),
            TodoInput({ addItem }),
            TodoList({ itemList, toggleDone, deleteItem })))))
  );
}

export default Todo;