import CommentNew from "@/pages/board/CommentNew";
import type { BoardReplyListRes } from "@/types/board";
import { getAxiosInstance } from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const axiosInstance = getAxiosInstance();

function CommentList({ postId }: { postId: number }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['posts', postId, 'replies'],
    queryFn: () => axiosInstance.get<BoardReplyListRes>(`/posts/${postId}/replies`),
    select: (response) => response.data.item,
    staleTime: 1000*10, // 일정 시간동안 캐시해서 서버 호출 횟수 줄임
    refetchOnWindowFocus: false, // 다른탭이나 앱에서 작업 후에 돌아오면 데이터를 자동으로 갱신할지 여부
    // refetchInterval: 1000*2, // 주기적으로 호출해서 데이터 갱신을 자동화
  });

  const list = data?.map(reply => <li key={reply._id}>{reply.content}</li>);

  return (
    <>
      { isLoading && <><h3>댓글 목록 로딩중...</h3><p>잠시만 기다려 주세요</p></> }
      { error && <><h3>에러 발생!!!</h3><p>{ error.message }</p></> }

      { data && <>
        <h3>댓글 목록</h3>
        <ul>
          { list }
        </ul>
      </> }

      <CommentNew postId={postId}/>
    </>
  );
}

export default CommentList;