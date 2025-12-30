import CommentList from "@/pages/board/CommentList";
import { useEffect } from "react";

function BoardInfo() {
  // TODO 4: data, error, isLoading 상태 관리


  const requestInfo = async () => {
    // TODO 3: API 서버에 1번 게시물의 상세정보를 fetch() 요청으로 보낸다.
    // API 참고: https://fesp-api.koyeb.app/market/apidocs/#/게시판/get_posts___id_
    // client-id: 'openmarket'
    
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

      <h1>01 Fetch API</h1>
      <h2>1번 게시물 제목</h2>
      <p>1번 게시물 상세 내용</p>
      
      <CommentList />
      
    </>
  );
}

export default BoardInfo;