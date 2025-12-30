import FetchOnRender from "@/FetchOnRender";
import FetchThenRender from "@/FetchThenRender";

// 게시물 목록 조회 API 호출
function fetchList(){
  
}

function PostList(){
  // TODO: 게시물 목록 조회

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