import TodoItem, { type TodoItem as TodoItemType } from "@pages/TodoItem";

interface TodoListProps {
  itemList: TodoItemType[];
  toggleDone: (_id: number) => void;
  deleteItem: (_id: number) => void;
}

function TodoList({ itemList, toggleDone, deleteItem }: TodoListProps){
  console.log('\t\tTodoList 렌더링', itemList);
  const list = itemList.map((item) => {
    return <TodoItem key={ item._id } item={ item } toggleDone={ toggleDone } deleteItem={ deleteItem } />;
  });
  return(
    <ul className="todolist">
      { list }
    </ul>
  );
}

export default TodoList;