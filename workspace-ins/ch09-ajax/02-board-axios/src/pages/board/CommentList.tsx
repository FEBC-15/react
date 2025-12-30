import CommentNew from "@/pages/board/CommentNew";
import type { BoardReply, BoardReplyListRes, ResData } from "@/types/board";
import { useEffect, useState } from "react";

function CommentList() {
  // data, isLoading, error 상태 관리
  const [data, setData] = useState<BoardReply[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const requestCommentList = async () => {
    // TODO 3: API 서버에 1번 게시물의 댓글 목록을 axios 라이브러리로 요청을 보낸다.
    // API 참고: https://fesp-api.koyeb.app/market/apidocs/#/게시판/get_posts___id__replies
    // client-id: 'openmarket'
    try{
      setIsLoading(true);
      const response = await fetch('https://fesp-api.koyeb.app/market/posts/1/replies', {
        headers: {
          'Client-Id': 'openmarket'
        }
      });

      console.log('respons', response);
      const jsonBody: ResData<BoardReplyListRes> = await response.json();
      console.log('jsonBody', jsonBody);

      if(jsonBody.ok){ // 서버의 응답 상태코드가 2xx일 경우 ok는 true가 됨
        setData(jsonBody.item);
        setError(null);
      }else{ // 서버의 응답 상태코드가 4xx, 5xx일 경우 ok는 false가 됨
        // const err = new Error(jsonBody.message);
        // setError(err);
        // setData(null);
        throw new Error(jsonBody.message);
      }
      
    }catch(err){ // 네트워크 문제일 경우
      setError(err as Error);
      setData(null);
    }finally{
      // try, catch 블럭이 실행된 후 호출
      setIsLoading(false);
    }
  }

  useEffect(() => {
    requestCommentList();
  }, []); // 마운트 후에 한번만 실행

  const list = data?.map(reply => <li key={reply._id}>{reply.content}</li>);

  return (
    <>
      { isLoading && <><h3>로딩중...</h3><p>잠시만 기다려 주세요</p></> }
      { error && <><h3>에러 발생!!!</h3><p>{ error.message }</p></> }

      { data && <>
        <h3>댓글 목록</h3>
        <ul>
          { list }
        </ul>
      </> }

      <CommentNew reload={requestCommentList}/>
    </>
  );
}

export default CommentList;