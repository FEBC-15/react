import { isRouteErrorResponse, Link, useRouteError } from "react-router";

function ErrorPage() {
  const error = useRouteError(); // 발생한 에러 정보
  let message = '예상하지 못한 에러가 발생했습니다. 잠시 후 다시 이용해 주세요.';

  if(isRouteErrorResponse(error)){ // 라우터가 만든 에러인지 여부를 확인(HTTP 관련 에러)
    console.error('라우터 에러', error);
  }else if(error instanceof Error){ // 애플리케이션에서 발생한 에러(loader, action에서 throw한 에러)
    message = error.message;
  }

  return (
    <div id="main">
      <div className="todo">
        <h2>에러 발생</h2>
        <p>{ message }</p>
        <Link to="/">메인으로</Link>
      </div>
    </div>
  );
}

export default ErrorPage;