import { getPosts } from "@/lib/post";
import { ErrorRes, PostListItem, PostListRes } from "@/types";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: '목록 조회',
  description: '게시판 목록 조회 페이지입니다.',
}

export default async function PostList(){
  console.log('게시물 목록 조회');

  // 3초 후에 resolve 됨
  // await new Promise(resolve => setTimeout(resolve, 1000*3));

  // 서버 컴포넌트에서는 route handler를 호출할 필요는 없음
  // const res = await fetch('http://localhost:3000/api/posts');
  // const data: PostListItem[] = await res.json();

  const data = await getPosts();

  console.log(globalThis.navigator.userAgent);

  const list = data.map(post => <li key={post._id}><Link href={`/posts/${post._id}`}>{post._id} - {post.title}</Link></li>);
  
  return (
    <>
      <h1>목록 조회</h1>
      <ul>
        { list }
      </ul>
    </>
  );
}