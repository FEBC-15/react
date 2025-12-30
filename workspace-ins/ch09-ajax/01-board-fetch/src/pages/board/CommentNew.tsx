import type { BoardReplyCreateRes } from "@/types/board";
import { useState } from "react";

function CommentNew({ reload }: { reload: () => void }) {
  const [data, setData] = useState<BoardReplyCreateRes | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const requestAddComment = async (formData: FormData) => {
    // TODO 9: API 서버에 댓글 등록을 fetch() 요청으로 보낸다.
    // API 참고: https://fesp-api.koyeb.app/market/apidocs/#/게시판/post_posts___id__replies
    // client-id: 'openmarket'
    try{
      setIsLoading(true);
      // FormData를 일반 Object로 변환
      const jsonBody = Object.fromEntries(formData.entries());
      console.log('요청 바디', jsonBody);
      const response = await fetch('https://fesp-api.koyeb.app/market/posts/1/replies', {
        headers: {
          'Client-Id': 'openmarket',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(jsonBody)
      });

      if(response.ok){ // 등록 성공
        console.log('등록 성공');
        // 댓글 목록 다시 조회
        reload();
        return true;
      }else{
        throw new Error('등록 실패');
      }
      
    }catch(err){ // 네트워크 문제일 경우
      setError(err as Error);
      setData(null);
      return false;
    }finally{
      // try, catch 블럭이 실행된 후 호출
      setIsLoading(false);
    }
  }
  
  // 등록 버튼 누르면 댓글 등록 요청
  const handleAddComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // submit 기본 동작 취소
    const formElem = event.currentTarget;
    const formData = new FormData(formElem);
    const result = await requestAddComment(formData);
    if(result){ // 등록에 성공했을 경우
      formElem.reset();
    }
  }

  return (
    <>
      <h4>댓글 등록</h4>
      <form onSubmit={handleAddComment}>
        <textarea rows={3} cols={30} placeholder="댓글 내용" name="content"></textarea><br />
        <button type="submit">등록</button>
      </form>
    </>
  );
}

export default CommentNew;