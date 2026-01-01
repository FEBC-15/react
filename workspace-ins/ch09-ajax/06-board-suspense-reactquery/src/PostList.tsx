import axios from "axios";
import { Suspense, use } from "react";
import type { BoardListRes } from "@/types/board";
import FetchAsYouRender from "@/FetchAsYouRender";

// 게시물 목록 조회
function fetchList(){
  return axios.get<BoardListRes>('https://fesp-api.koyeb.app/market/posts?type=qna&delay=4000', {
    headers: {
      'client-id': 'openmarket',
    },
  }).then(res => res.data.item);
}

const listPromise = fetchList();

function PostList(){
  const data = use(listPromise);
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