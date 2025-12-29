import axios from "axios";
import FetchThenRender from "@/FetchThenRender";
import FetchOnRender from "@/FetchOnRender";

// 게시물 목록 조회
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function fetchList(){
  return axios.get('https://fesp-api.koyeb.app/market/posts?type=qna&delay=4000', {
    headers: {
      'client-id': 'openmarket',
    },
  });
}

function PostList(){
  // TODO: 게시물 건수 조회

  return (
    <>
      <h2>게시물 5건.</h2>
      <hr />
      <h3>Fetch-On-Render 방식(폭포수 현상)</h3>
      <FetchOnRender />
      <hr />
      <h3>Fetch-Then-Render 방식(복잡도 증가)</h3>
      <FetchThenRender />
    </>
  );
}

export default PostList;