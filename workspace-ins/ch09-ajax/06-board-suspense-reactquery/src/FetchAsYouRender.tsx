import type { BoardInfoRes, BoardReplyListRes } from "@/types/board";
import { useSuspenseQuery } from "@tanstack/react-query";
import axios from "axios";

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
  const { data } = useSuspenseQuery({
    queryKey: ['posts', '10'],
    queryFn: fetchPost,
  });

  return (
    <>
      <h4>{data.title}</h4>
      <Comments />
    </>
  );
}

// 댓글 목록 조회 화면
export function Comments() {
  const { data } = useSuspenseQuery({
    queryKey: ['posts', '10', 'replies'],
    queryFn: fetchComments,
  });

  const list = data.map((item) => <li key={item._id}>{item.content}</li>);

  return (
    <>
      <ul>{ list }</ul>
    </>
  );
}

export default FetchAsYouRender;