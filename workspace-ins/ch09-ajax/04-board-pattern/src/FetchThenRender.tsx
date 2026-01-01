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

// 게시글과 댓글 목록을 동시에 조회
function fetchData(){
  return Promise.all([fetchPost(), fetchComments()]).then(([post, comments]) => {
    return { post, comments };
  });
}

// 데이터 패칭 시작
// 모듈의 탑 레벨에 두면 import 되는 순간에 실행됨
const fetchResult = fetchData();

// 게시글 상세 조회 화면
function FetchThenRender() {
  // TODO: 게시글 상세 조회
  const [post, setPost] = useState<BoardInfo>();
  const [comments, setComments] = useState<BoardReply[]>();
  
  useEffect(() => {
    fetchResult.then(({ post, comments }) => {
      setPost(post);
      setComments(comments);
    });
  }, []);

  if(!post || !comments){
    return <h4>게시물 정보 로딩중...</h4>;
  }

  return (
    <>
      <h4>{post._id} - {post.title}</h4>
      <Comments comments={comments}/>
    </>
  );
}

// 댓글 목록을 조회해서 출력하는 컴포넌트
export function Comments({ comments } : { comments: BoardReply[] }) {
  // TODO: 댓글 목록 조회
  const list = comments.map((reply) => <li key={reply._id}>{reply.content}</li>);

  return (
    <>
      <ul>
        { list }
      </ul>
    </>
  );
}

export default FetchThenRender;