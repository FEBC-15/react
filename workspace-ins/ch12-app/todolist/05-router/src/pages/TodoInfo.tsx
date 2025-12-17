import type { Todo } from "@/types/todo";
import { Link, Outlet, useMatch, useParams } from "react-router";

// 임시 데이터 - API 연동 전까지 사용할 더미 데이터
const dummyData: Todo = {
  _id: 5,
  title: '임시 데이터',
  content: '임시 데이터 입니다.',
  done: true,
  createdAt: '2026.12.12 12:23:45',
  updatedAt: '2026.12.12 13:45:12'
};

function TodoInfo() {

  // path가 '/list/:_id'로 지정하고 실제 URL이 '/list/3'일 때 useParams()는 { _id: '3' }을 반환
  const { _id } = useParams();

  // 현재의 URL이 지정한 패턴의 URL과 일치하면 PathMatch 객체를, 일치하지 않으면 null을 반환
  const infoMatch = useMatch('/todo/list/:_id'); // 동적 세그먼트 지정 가능

  const data = dummyData;

  return (
    <div id="main">
      <h2>할일 상세 보기</h2>
      <div className="todo">
        <div>id : { _id }</div>
        <div>제목 : { data.title }</div>
        <div>내용 : { data.content }</div>
        <div>상태 : { data.done ? '완료' : '미완료' }</div>
        <div>작성일 : { data.createdAt }</div>
        <div>수정일 : { data.updatedAt }</div>
        
        { infoMatch && 
          <>
            <Link to={`/todo/list/${_id}/edit`}>수정</Link>
            <Link to="/todo/list">목록</Link>
          </> 
        }
        
      </div>

      <Outlet />

    </div>
  );
}

export default TodoInfo;