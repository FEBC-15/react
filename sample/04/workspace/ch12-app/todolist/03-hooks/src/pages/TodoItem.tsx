export interface TodoItem {
  _id: number;
  title: string;
  done: boolean;
}

interface TodoItemProps {
  item: TodoItem;
  toggleDone: (_id: number) => void;
  deleteItem: (_id: number) => void;
}

function TodoItem({ item, toggleDone, deleteItem }: TodoItemProps){
  console.log('\t\t\t\tTodoItem 렌더링', item);
  return (
    <li>
      <span>{ item._id }</span>
      <span onClick= { () => toggleDone(item._id) }>{ item.done ? <s>{ item.title }</s> : item.title }</span>
      <button type="button" onClick={ () => deleteItem(item._id) }>삭제</button>
    </li>
  );
}

export default TodoItem;