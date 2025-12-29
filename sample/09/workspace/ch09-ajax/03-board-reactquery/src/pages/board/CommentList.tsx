import CommentNew from "@/pages/board/CommentNew";
import type { BoardReply, BoardReplyListRes } from "@/types/board";
import { getAxiosInstance } from "@/utils/axiosInstance";
import { useEffect, useState } from "react";

function CommentList() {
  const [data, setData] = useState<BoardReply[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const axiosInstance = getAxiosInstance();

  const requestCommentList = async () => {
    try{
      setIsLoading(true);

      const response = await axiosInstance.get<BoardReplyListRes>('/posts/1/replies');
      console.log('response', response);

      setData(response.data.item);
      setError(null);

    }catch(err){
      setError(err as Error);
      setData(null);
      console.error(err);
    }finally{
      setIsLoading(false);
    }
  };

  useEffect(() => {
    requestCommentList();
  }, []);

  const replyList = data?.map(reply => <li key={ reply._id }>{ reply.content }</li>);

  return (
    <>
      <h3>댓글 목록</h3>

      { isLoading && <p>로딩중...</p> }
      { error && <p>{ error.message }</p> }
      { data && (
        <>
          <ul>
            { replyList }
          </ul>
          <CommentNew requestCommentList={ requestCommentList } />
        </>
      )}
    </>
  );
}

export default CommentList;