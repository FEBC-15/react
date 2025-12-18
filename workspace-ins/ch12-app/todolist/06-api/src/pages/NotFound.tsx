import { Link } from "react-router";

function NotFound() {
  return (
    <div id="main">
      <div className="todo">
        <h2>404 에러 발생</h2>
        <p>요청하신 페이지가 존재하지 않습니다.</p>
        <Link to="/">메인으로</Link>
      </div>
    </div>
  );
}

export default NotFound;