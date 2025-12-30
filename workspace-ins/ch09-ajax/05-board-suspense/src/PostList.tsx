import axios from "axios";
import { useEffect, useState } from "react";
import type { BoardList, BoardListRes } from "@/types/board";

// 게시물 목록 조회
function fetchList(){
  return axios.get<BoardListRes>('https://fesp-api.koyeb.app/market/posts?type=qna&delay=4000', {
    headers: {
      'client-id': 'openmarket',
    },
  }).then(res => res.data.item);
}

function PostList(){
  const [data, setData] = useState<BoardList[]>();

  useEffect(() => {
    fetchList().then(setData);
  }, []);

  if(!data){
    return <div>게시물 목록 로딩중...</div>;
  }

  return (
    <>
      <h2>게시물 { data.length }건.</h2>
    </>
  );
}

export default PostList;