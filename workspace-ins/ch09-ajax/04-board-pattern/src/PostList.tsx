// import FetchOnRender from "@/FetchOnRender";
import type { BoardList, BoardListRes } from "@/types/board";
import FetchThenRender from "@/FetchThenRender";

import axios from "axios";
import { useEffect, useState } from "react";

// 게시물 목록 조회 API 호출
function fetchList(){
  return axios.get<BoardListRes>('https://fesp-api.koyeb.app/market/posts?delay=4000', {
    headers: {
      'Client-Id': 'openmarket'
    }
  }).then((response) => response.data.item);
}

function PostList(){
  // TODO: 게시물 목록 조회
  const [data, setData] = useState<BoardList[]>();

  useEffect(() => {
    fetchList().then(setData);
  }, []);

  // 데이터가 준비되기 전에는 대체 컨텐츠를 반환
  if(!data){
    return <h2>게시물 목록 로딩중...</h2>;
  }

  // 데이터가 준비된 이후에 렌더링 됨
  return (
    <>
      <h2>게시물 { data.length }건.</h2>
      {/* <hr />
      <h3>Fetch-On-Render 방식(폭포수 현상)</h3>
      <FetchOnRender /> */}
      <hr />
      <h3>Fetch-Then-Render 방식(복잡도 증가)</h3>
      <FetchThenRender />
    </>
  );
}

export default PostList;