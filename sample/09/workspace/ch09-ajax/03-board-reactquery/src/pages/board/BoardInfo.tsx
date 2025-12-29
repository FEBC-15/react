import CommentList from "@/pages/board/CommentList";
import type { BoardInfo as BoardInfoType, BoardInfoRes } from "@/types/board";
import { getAxiosInstance } from "@/utils/axiosInstance";
import { useEffect, useState } from "react";

function BoardInfo() {
  const [data, setData] = useState<BoardInfoType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const axiosInstance = getAxiosInstance();

  const requestInfo = async () => {
    try{
      setIsLoading(true);

      const response = await axiosInstance.get<BoardInfoRes>('/posts/1');
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
    requestInfo();
  }, []);

  return (
    <>
      <h1>03 React Query 라이브러리</h1>
      
      { isLoading &&  <p>로딩중...</p> }
      { error && <p>{ error.message }</p> }
      { data && (
        <>
          <h2>{ data.title }</h2>
          <p>{ data.content }</p>
        </>
      )}

      <CommentList />
    </>
  );
}

export default BoardInfo;