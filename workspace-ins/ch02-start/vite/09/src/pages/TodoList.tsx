import type { TodoItem } from "@/App";
interface TodoListProps{
  list: TodoItem[]
}

function TodoList({ list }: TodoListProps){
  // const items = list.map(function(item){
  //   return <li key={ item._id }>{ item.title } - { item.done ? '완료' : '진행중' }</li>;
  // });
  const items = list.map(item => <li key={ item._id }>{ item.title } - { item.done ? '완료' : '진행중' }</li>);
  return (
    <ul className="todolist">
      { items }
    </ul>
  );
}

export default TodoList;