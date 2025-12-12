import useFetch from "@/hooks/useFetch";
import type { TodoListRes } from "@/types/todo";

function TodoList() {

  const { data, error, loading } = useFetch<TodoListRes>({ url: '/todolist' });

  const list = data?.items.map(item => <li key={ item._id }>{ item.title }</li>);

  return (
    <>
      <h1>10 customHook - useFatch, useAxios 커스텀 훅 사용</h1>
      <h2>할일 목록</h2>

      {/* <!-- 로딩중일 때 로딩중 메시지 표시 --> */}
      { loading && <p>로딩중...</p> }
      
      {/* <!-- 에러가 있을 경우 빨간색으로 에러 메시지 표시 --> */}
      { error && <p style={{color: 'red'}}>{ error.message }</p> }
          
      {/* <!-- 서버에서 받은 Todo 목록을 렌더링 --> */}
      <ul>
        { data && list }
      </ul>
    </>
  );
}

export default TodoList;