import { Form, Link, useNavigation } from "react-router";

function TodoAdd() {

  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading'; // loader 실행중
  const isSubmitting = navigation.state === 'submitting'; // action 실행중
  const isProcessing = isSubmitting || isLoading; // 처리중

  return (
    <div id="main">
      <h2>할일 추가</h2>
      <div className="todo">
        <Form method="post">
          <label htmlFor="title">제목 :</label>
          <input type="text" id="title" name="title" autoFocus />
          <br />
          <label htmlFor="content">내용 :</label>
          <textarea id="content" name="content" cols={23} rows={5}></textarea>
          <br />
          <label htmlFor="category">카테고리</label>
          <select id="category" name="category">
            <option value=""></option>
            <option value="study">공부</option>
            <option value="hobby">취미</option>
            <option value="etc">기타</option>
          </select>
          <br />
          <label htmlFor="important">중요 :</label>
          <input type="checkbox" id="important" name="important" />
          <br />
          <label htmlFor="finishAt">마감일 :</label>
          <input type="datetime-local" id="finishAt" name="finishAt" />
          <br />
          <button 
            type="submit"
            disabled={isProcessing}
          >{ isProcessing ? '추가중...' : '추가' }</button>
          <Link to="/todo/list">취소</Link>
        </Form>
      </div>
    </div>
  );
}

export default TodoAdd;