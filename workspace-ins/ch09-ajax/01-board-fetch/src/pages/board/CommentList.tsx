import CommentNew from "@/pages/board/CommentNew";
import { useEffect } from "react";

function CommentList() {
  // TODO 7: data, isLoading, error 상태 관리

  const requestCommentList = async () => {
    // TODO 6: API 서버에 1번 게시물의 댓글 목록을 fetch() 요청으로 보낸다.
    // API 참고: https://fesp-api.koyeb.app/market/apidocs/#/게시판/get_posts___id__replies
    // client-id: 'openmarket'

  }

  useEffect(() => {
    requestCommentList();
  }, []); // 마운트 후에 한번만 실행

  return (
    <>
      {/* TODO 8: 로딩중, 에러, 데이터가 있을 때 화면 표시
        로딩중에는 <p>로딩중...</p> 표시
        에러가 발생하면 <p>{ error.message }</p> 표시
        데이터가 있으면 <ul> <li>댓글 내용 1</li><li>댓글 내용 2</li>... </ul> 표시 
      */}
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