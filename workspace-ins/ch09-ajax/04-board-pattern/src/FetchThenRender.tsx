// 게시글 상세 조회 API 호출
function fetchPost() {
  
}

// 댓글 목록 조회 API 호출
function fetchComments() {
  
}

// 게시글 상세 조회 화면
function FetchThenRender() {
  // TODO: 게시글 상세 조회
  
  return (
    <>
      <h4>1번 게시물 제목</h4>
      <Comments />
    </>
  );
}

// 댓글 목록을 조회해서 출력하는 컴포넌트
export function Comments() {
  // TODO: 댓글 목록 조회

  return (
    <>
      <ul>
        <li>댓글 1</li>
        <li>댓글 2</li>
        <li>댓글 3</li>
      </ul>
    </>
  );
}

export default FetchThenRender;