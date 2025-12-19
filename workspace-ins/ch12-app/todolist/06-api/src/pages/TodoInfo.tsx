import type { ResData, TodoInfoRes } from "@/types/todo";
import { Link, Outlet, useLoaderData, useLocation, useMatch, useParams } from "react-router";

function TodoInfo() {
  const { _id } = useParams();

  // useEffect(() => {
  //   getTodoInfo(_id!).then((result) => console.log(result));
  // }, [_id]);

  const infoMatch = useMatch('/todo/list/:_id');

  // loader에서 반환한 값
  const data = useLoaderData<ResData<TodoInfoRes>>();

  // 요청된 URL 정보를 담고 있는 location 객체 반환
  const location = useLocation();

  return (
    <div id="main">
      <h2>할일 상세 보기</h2>
      <p>{ location.state?.message }</p>
      { data.ok ? (
        <>
          <div className="todo">
            <div>id : { _id }</div>
            <div>제목 : { data.item.title }</div>
            <div>내용 : { data.item.content }</div>
            <div>상태 : { data.item.done ? '완료' : '미완료' }</div>
            <div>작성일 : { data.item.createdAt }</div>
            <div>수정일 : { data.item.updatedAt }</div>
            
            { infoMatch && 
              <>
                <Link to={`/todo/list/${_id}/edit`}>수정</Link>
                <Link to="/todo/list">목록</Link>
              </> 
            }
            
          </div>

          {/* 중첩된 라우트의 컴포넌트를 표시하고 할일 정보를 전달 */}
          <Outlet context={{ item: data.item }} />
        </>
      )
      : (
        <p>{ data.message }</p>
      )}
    </div>
  );
}

export default TodoInfo;