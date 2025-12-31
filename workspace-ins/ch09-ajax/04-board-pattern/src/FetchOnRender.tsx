import type { BoardInfo, BoardInfoRes, BoardReply, BoardReplyListRes } from "@/types/board";
import axios from "axios";
import { useEffect, useState } from "react";

// 게시글 상세 조회 API 호출
function fetchPost() {
  return axios.get<BoardInfoRes>('https://fesp-api.koyeb.app/market/posts/10?delay=3000', {
    headers: {
      'Client-Id': 'openmarket'
    }
  }).then((response) => response.data.item);
}

// 댓글 목록 조회 API 호출
function fetchComments() {
  return axios.get<BoardReplyListRes>('https://fesp-api.koyeb.app/market/posts/10/replies?delay=2000', {
    headers: {
      'Client-Id': 'openmarket'
    }
  }).then((response) => response.data.item);
}

// 게시글 상세 조회 화면
function FetchOnRender() {
  // TODO: 게시글 상세 조회
  const [data, setData] = useState<BoardInfo>();
  
  useEffect(() => {
    fetchPost().then(setData);
  }, []);

  // 데이터가 준비되기 전에는 대체 컨텐츠를 반환
  if(!data){
    return <h4>게시물 제목 로딩중...</h4>;
  }

  return (
    <>
      <h4>{ data._id } - { data.title }</h4>
      <Comments />
    </>
  );
}

// 댓글 목록을 조회해서 출력하는 컴포넌트
export function Comments() {
  // TODO: 댓글 목록 조회
  const [data, setData] = useState<BoardReply[]>();
  
  useEffect(() => {
    fetchComments().then(setData);
  }, []);

  // 데이터가 준비되기 전에는 대체 컨텐츠를 반환
  if(!data){
    return <h4>게시물 댓글 로딩중...</h4>;
  }

  const list = data.map((reply) => <li key={reply._id}>{reply.content}</li>);

  return (
    <>
      <ul>
        { list }
      </ul>
    </>
  );
}

export default FetchOnRender;