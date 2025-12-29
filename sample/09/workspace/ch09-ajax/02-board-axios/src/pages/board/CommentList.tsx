import CommentNew from "@/pages/board/CommentNew";

function CommentList() {
  return (
    <>
      <h3>댓글 목록</h3>
      <ul>
        <li>3번 댓글</li>
        <li>2번 댓글</li>
        <li>1번 댓글</li>
      </ul>
      <CommentNew />
    </>
  );
}

export default CommentList;