import PostList from "@/PostList";
import { Suspense } from "react";

function App() {
  return (
    <>
      <h1>06 데이터 패칭 패턴 - React Query와 Suspense 함께 사용</h1>
      <Suspense fallback={<h2>게시물 목록 로딩중</h2>}>
        <PostList />
      </Suspense>
    </>
  );
}

export default App
