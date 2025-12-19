import type { Todo } from "@/types/todo";
import { useState } from "react";
import { Form, useNavigate, useOutletContext, useParams } from "react-router";

interface OutletContextProps {
  item: Todo;
}

function TodoEdit() {
  // 페이지 이동에 사용
  const navigate = useNavigate();
  
  const { _id } = useParams();

  // 중첩 라우팅에서 부모가 Outlet 컴포넌트의 context 속성으로 전달한 값을 자식 컴포넌트에서 꺼냄
  const { item } = useOutletContext<OutletContextProps>();
  console.log('item', item)

  const [ title, setTitle ] = useState(item.title);
  const [ content, setContent ] = useState(item.content);
  const [ done, setDone ] = useState(item.done);

  return (
    <>
      <h2>할일 수정</h2>
      <div className="todo">
        <Form method='patch'>
          <label htmlFor="title">제목 :</label>
          <input type="text" id="title" name="title" value={ title } onChange={ (e) => setTitle(e.target.value) } autoFocus />
          <br />
          <label htmlFor="content">내용 :</label>
          <textarea id="content" name="content" cols={23} rows={5} value={ content } onChange={ (e) => setContent(e.target.value) }></textarea>
          <br />
          <label htmlFor="done">완료 :</label>
          <input type="checkbox" id="done" name="done" checked={ done } onChange={ (e) => setDone(e.target.checked) } />
          <br />
          <button type="submit">수정</button>
          <button type="reset" onClick={ () => navigate(`/todo/list/${_id}`, {state:{from:'edit', message:'수정 취소'}})}>취소</button>
        </Form>
      </div>
    </>
  );
}

export default TodoEdit;