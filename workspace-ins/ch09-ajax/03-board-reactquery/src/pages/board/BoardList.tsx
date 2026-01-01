import BoardInfo from "@/pages/board/BoardInfo";
import type { BoardListRes } from "@/types/board";
import { getAxiosInstance } from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const axiosInstance = getAxiosInstance();

function BoardList(){
  // TODO 1: 게시물 목록 조회
  const { data, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: () => axiosInstance.get<BoardListRes>(`/posts`),
    select: (response) => response.data.item,
  });

  const list = data?.map(post => (
    <li 
      key={post._id}
      onClick={() => setPostId(post._id)}
      style={{cursor: 'pointer'}}
    >{post._id} - {post.title}</li>
  ));

  // TODO 2: 게시물 클릭 시 상세정보 업데이트(postId를 클릭한 게시물 id로 지정)
  const [postId, setPostId] = useState<number | null>(null);

  return (
    <>
      { isLoading && <><h3>게시물 목록 로딩중...</h3><p>잠시만 기다려 주세요</p></> }
      { error && <><h3>에러 발생!!!</h3><p>{ error.message }</p></> }

      { data && <>
        <h1>게시물 목록</h1>
        <ul>
          { list }
        </ul>
      </> }

      { postId && <BoardInfo postId={postId}/> }

    </>
  );
}

export default BoardList;