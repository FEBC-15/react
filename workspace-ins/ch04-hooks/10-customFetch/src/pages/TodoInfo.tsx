import useFetch from "@/hooks/useFetch";
import type { TodoInfoRes } from "@/types/todo";

function TodoInfo() {

  const { data, error, loading } = useFetch<TodoInfoRes>({ url: '/todolist/1' });

  return (
    <>
      <h1>10 customHook - useFatch, useAxios 커스텀 훅 사용</h1>
      <h2>할일 상세 조회</h2>

      {/* <!-- 로딩중일 때 로딩중 메시지 표시 --> */}
      { loading && <p>로딩중...</p> }

      {/* <!-- 에러가 있을 경우 빨간색으로 에러 메시지 표시 --> */}
      { error && <p style={{color: 'red'}}>{ error.message }</p> }

      { data && 
        <div>
          <p>제목: { data.item.title }</p>
          <p>내용: { data.item.content }</p>
          <p>상태: { data.item.done ? '완료' : '미완료' }</p>
          <p>작성일: { data.item.createdAt }</p>
          <p>수정일: { data.item.updatedAt }</p>
        </div>
      }
      
    </>
  );
}

export default TodoInfo;