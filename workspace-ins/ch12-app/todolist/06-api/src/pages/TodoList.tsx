import Pagination from "@/pages/Pagination";
import TodoListItem from "@/pages/TodoListItem";
import type { ResData, TodoListRes } from "@/types/todo";
import { useState } from "react";
import { Link, useLoaderData, useSearchParams } from "react-router";

function TodoList() {

  // useEffect(() => {
  //   getTodoList().then((result) => console.log(result));
  // }, []);

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


  // const data = useLoaderData<TodoListRes>(); // 에러 처리는 loader, errorElement에서 했기 때문에 정상 응답으로 간주
  // const list = data.items.map(item => <TodoListItem key={item._id} item={item} />);

  const data = useLoaderData<ResData<TodoListRes>>();
  const list = data.ok ? data.items.map(item => <TodoListItem key={item._id} item={item} />) : <div>{ data.message }</div>;

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