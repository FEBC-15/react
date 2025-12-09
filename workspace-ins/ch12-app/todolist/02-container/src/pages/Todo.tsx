
import TodoInput from "@pages/TodoInput";
import type { TodoItem } from "@pages/TodoItem";
import TodoList from "@pages/TodoList";
import { useState } from "react";

function Todo(){
  console.log('\tTodo 렌더링');

  // 샘플 목록
  const initItemList: TodoItem[] = [
    { _id: 1, title: '자바스크립트 공부', done: true },
    { _id: 2, title: 'JS 프로젝트', done: true },
    { _id: 3, title: 'React 공부', done: false },
  ];

  // 상태가 수정되면 자동으로 화면이 리렌더링 된다.
  const [itemList, setItemList] = useState(initItemList);

  // 할일 추가
  const addItem = (title: string) => {
    const item: TodoItem = { _id: itemList[itemList.length-1]?._id + 1 || 1, title, done: false };
    setItemList([ ...itemList, item ]);
  }

  // 완료/미완료 처리
  const toggleDone = (_id: number) => {
    const newItemList = itemList.map(item => item._id === _id ? { ...item, done: !item.done } : item);
    setItemList(newItemList);
  }

  // 할일 삭제
  const deleteItem = (_id: number) => {
    const newItemList = itemList.filter(item => item._id !== _id );
    setItemList(newItemList);
  }

  return (
    <div id="main">
      <div id="container">
        <ul>
          <li>
            <h2>할일 목록</h2>
            <TodoInput addItem={ addItem } />
            <TodoList itemList={ itemList } toggleDone={ toggleDone } deleteItem={ deleteItem } />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Todo;