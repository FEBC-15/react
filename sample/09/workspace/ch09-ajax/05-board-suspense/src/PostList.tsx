import axios from "axios";
import FetchThenRender from "@/FetchThenRender";
import FetchOnRender from "@/FetchOnRender";
import { useEffect, useState } from "react";
import type { BoardListRes } from "@/types/board";

// 게시물 목록 조회
function fetchList(){
  return axios.get('https://fesp-api.koyeb.app/market/posts?type=qna&delay=4000', {
    headers: {
      'client-id': 'openmarket',
    },
  });
}

function PostList(){
  // TODO: 게시물 건수 조회
  const [data, setData] = useState<BoardListRes[]>();

  useEffect(() => {
    fetchList().then(res => {
      setData(res.data.item);
    });
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