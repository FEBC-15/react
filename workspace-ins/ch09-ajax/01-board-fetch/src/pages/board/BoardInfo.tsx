import CommentList from "@/pages/board/CommentList";
import type { BoardInfo as BoardInfoType, BoardInfoRes, ResData } from "@/types/board";
import { useEffect, useState } from "react";

function BoardInfo() {
  // TODO 4: data, error, isLoading 상태 관리
  const [data, setData] = useState<BoardInfoType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const requestInfo = async () => {
    // TODO 3: API 서버에 1번 게시물의 상세정보를 fetch() 요청으로 보낸다.
    // API 참고: https://fesp-api.koyeb.app/market/apidocs/#/게시판/get_posts___id_
    // client-id: 'openmarket'
    try{
      setIsLoading(true);
      const response = await fetch('https://fesp-api.koyeb.app/market/posts/1', {
        headers: {
          'Client-Id': 'openmarket'
        }
      });

      console.log('respons', response);
      const jsonBody: ResData<BoardInfoRes> = await response.json();
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
    
  };

  useEffect(() => {
    requestInfo();
  }, []); // 마운트 후에 한번만 setup 함수가 호출됨

  return (
    <>
      {/* TODO 5: 로딩중, 에러, 데이터가 있을 때 화면에 표시
        로딩중에는 <p>로딩중...</p> 표시
        에러가 발생하면 <p>{ error.message }</p>
        데이터가 있으면 <h2>{ data.title }</h2><p>{ data.content }</p>
      */}

      { isLoading && <><h2>로딩중...</h2><p>잠시만 기다려 주세요</p></> }
      { error && <><h2>에러 발생!!!</h2><p>{ error.message }</p></> }

      { data && <>
        <h2>{ data.title }</h2>
        <p>{ data.content }</p>
      </> }
      
      <CommentList />

    </>
  );
}

export default BoardInfo;