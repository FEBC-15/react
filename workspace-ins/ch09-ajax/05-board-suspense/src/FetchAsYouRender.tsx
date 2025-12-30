import type { BoardInfo, BoardInfoRes, BoardReply, BoardReplyListRes } from "@/types/board";
import axios from "axios";
import { useEffect, useState } from "react";

// 게시글 상세 조회 API 호출
function fetchPost() {
  return axios.get<BoardInfoRes>('https://fesp-api.koyeb.app/market/posts/1?delay=3000', {
    headers: {
      'client-id': 'openmarket'
    }
  }).then(res => res.data.item);
}

// 댓글 목록 조회 API 호출
function fetchComments() {
  return axios.get<BoardReplyListRes>('https://fesp-api.koyeb.app/market/posts/1/replies?page=1&limit=3&delay=2000', {
    headers: {
      'client-id': 'openmarket'
    }
  }).then(res => res.data.item);
}

// 게시글 상세 조회 화면
function FetchAsYouRender() {
  const [data, setData] = useState<BoardInfo>();

  useEffect(() => {
    fetchPost().then(setData);
  }, []);

  if(!data){
    return <div>1번 게시물 로딩중...</div>;
  }

  return (
    <>
      <h4>{data.title}</h4>
      <Comments />
    </>
  );
}

// 댓글 목록 조회 화면
export function Comments() {
  const [data, setData] = useState<BoardReply[]>();

  useEffect(() => {
    fetchComments().then(setData);
  }, []);

  if(!data){
    return <div>댓글 로딩중...</div>;
  }

  const list = data.map((item) => <li key={item._id}>{item.content}</li>);

  return (
    <>
      <ul>{ list }</ul>
    </>
  );
}

export default FetchAsYouRender;