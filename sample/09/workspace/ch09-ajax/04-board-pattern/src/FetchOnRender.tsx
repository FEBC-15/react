import type { BoardInfoRes, BoardReplyListRes } from "@/types/board";
import axios from "axios";

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
function FetchOnRender() {
  

  return (
    <>
      <h4>1번 게시물 제목</h4>
      <Comments />
    </>
  );
}

// 댓글 목록을 조회해서 출력하는 컴포넌트
export function Comments() {
  
  return (
    <>
      <ul>
        <li>댓글 1</li>
        <li>댓글 2</li>
        <li>댓글 3</li>
      </ul>
    </>
  );
}

export default FetchOnRender;