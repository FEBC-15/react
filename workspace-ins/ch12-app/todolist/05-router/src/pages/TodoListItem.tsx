import type { Todo } from "@/types/todo";
import { Link } from "react-router";

interface TodoListItemProps {
  item: Todo;
}

function TodoListItem({ item }: TodoListItemProps) {
  return (
    <li>
      <span>{item._id}</span>
      <Link to={`/todo/list/${item._id}`}>{item.title}</Link>
      <Link to="/todo/list">삭제</Link>
    </li>
  );
}

export default TodoListItem;