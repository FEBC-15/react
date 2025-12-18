import { getTodoList } from "@/api/todo";
import Pagination from "@/pages/Pagination";
import TodoListItem from "@/pages/TodoListItem";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";

const dummyData = {
  items: [{
    _id: 1,
    title: '잠자기',
    content: '실컷 잠자기',
    done: true,
    createdAt: '2025.12.16 16:49:00',
    updatedAt: '2025.12.17 17:19:20',
  }, {
    _id: 2,
    title: '자바스크립트 복습',
    content: 'async/await 복습',
    done: false,
    createdAt: '2025.12.17 10:49:00',
    updatedAt: '2025.12.18 16:44:03',
  }]
};

function TodoList() {

  useEffect(() => {
    getTodoList().then((result) => console.log(result));
  }, []);

  console.log('TodoList 렌더링');

  // url의 쿼리스트링 관리
  const [ searchParams, setSearchParams ] = useSearchParams();

  // 검색어 저장
  const [ keyword, setKeyword ] = useState('');

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 브라우저 기본 동작 취소(form의 submit 취소)

    if(keyword.trim().length > 1) {
      searchParams.set('keyword', keyword);
      setSearchParams(searchParams);
    }    
  };

  const data = dummyData;
  const list = data.items.map(item => <TodoListItem key={item._id} item={item} />);

  return (
    <div id="main">
      <h2>할일 목록</h2>
      <div className="todo">
        <Link to="/todo/add">추가</Link>
        <br />
        <form className="search" onSubmit={ handleSearch }>
          <input 
            type="text" 
            name="keyword" 
            autoFocus
            value={keyword} 
            onChange={ (e) => setKeyword(e.target.value) } 
          />
          <button type="submit">검색</button>
        </form>
        <ul className="todolist">
          { list }
        </ul>

        <Pagination />

      </div>
    </div>
  );
}

export default TodoList;