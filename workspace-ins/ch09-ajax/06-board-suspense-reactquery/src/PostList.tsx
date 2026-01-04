import axios from "axios";
import { Suspense } from "react";
import type { BoardListRes } from "@/types/board";
import FetchAsYouRender from "@/FetchAsYouRender";
import { useSuspenseQuery } from "@tanstack/react-query";

// 게시물 목록 조회
function fetchList(){
  return axios.get<BoardListRes>('https://fesp-api.koyeb.app/market/posts?type=qna&delay=4000', {
    headers: {
      'client-id': 'openmarket',
    },
  }).then(res => res.data.item);
}

function PostList(){
  
  const { data } = useSuspenseQuery({
    queryKey: ['posts'],
    queryFn: fetchList,
  });

  return (
    <>
      <h2>게시물 { data.length }건.</h2>
      <hr />
      <Suspense fallback={<div>1번 게시물 로딩중...</div>}>
        <FetchAsYouRender />
      </Suspense>
    </>
  );
}

export default PostList;