import type { BoardInfoRes, BoardReplyListRes } from "@/types/board";
import axios from "axios";
import { useEffect, useState } from "react";

// 게시글 상세 조회 API 호출
function fetchPost() {
  return axios.get<BoardInfoRes>('https://fesp-api.koyeb.app/market/posts/1?delay=3000', {
    headers: {
      'client-id': 'openmarket'
    }
  });
}

// 댓글 목록 조회 API 호출
function fetchComments() {
  return axios.get<BoardReplyListRes>('https://fesp-api.koyeb.app/market/posts/1/replies?page=1&limit=3&delay=2000', {
    headers: {
      'client-id': 'openmarket'
    }
  });
}

// 게시글 상세 조회 화면
function FetchThenRender() {
  const [data, setData] = useState<BoardInfoRes | null>(null);

  useEffect(() => {
    fetchPost().then(res => {
      setData(res.data);
    });
  }, []);

  if(!data){
    return <div>1번 게시물 로딩중...</div>;
  }

  return (
    <>
      <h4>{data.item.title}</h4>
      <Comments />
    </>
  );
}

// 댓글 목록을 조회해서 출력하는 컴포넌트
export function Comments() {
  const [data, setData] = useState<BoardReplyListRes | null>(null);

  useEffect(() => {
    fetchComments().then((res) => {
      setData(res.data);
    });
  }, []);

  if(!data){
    return <div>댓글 로딩중...</div>;
  }

  const list = data?.item.map((item) => <li key={item._id}>{item.content}</li>);

  return (
    <>
      <ul>{ list }</ul>
    </>
  );
}

export default FetchThenRender;