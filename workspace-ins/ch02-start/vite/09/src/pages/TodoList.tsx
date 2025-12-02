

function TodoList({ list }){
  const items = list.map(item => <li key={ item._id }>{ item.title } - { item.done ? '완료' : '진행중' }</li>);
  return (
    <ul className="todolist">
      { items }
    </ul>
  );
}

export default TodoList;