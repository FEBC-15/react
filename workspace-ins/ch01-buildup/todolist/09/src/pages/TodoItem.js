import Reaction from '../../../reaction.js';

function TodoItem({ item, toggleDone, deleteItem }){
  return (
    Reaction.createElement('li', { 'data-num': item.num },
      Reaction.createElement('span', null, item.num),
      Reaction.createElement('span', { onclick: () => toggleDone(item.num) }, 
        item.done ? Reaction.createElement('s', null, item.title) : item.title),
      Reaction.createElement('button', { type: 'button', onclick: () => deleteItem(item.num) }, '삭제'))
  );
}

export default TodoItem;