import { getPost } from "@/lib/post";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  
  // TODO: API 서버 호출 필요
  const data = await getPost(id);

  // const data = {
  //   title: `${ id }번 게시물`,
  //   content: '게시판 이용 수칙입니다.',
  // };

  return {
    title: data.title,
    description: data.content,
  }
}

// generateStaticParams 함수가 반환한 배열 만큼 PostInfo 함수를 빌드 시점에 미리 호출함
// .next/server/app/posts/1.html, 2.html 파일을 정적으로 미리 생성함
export function generateStaticParams(){
  const paramsList = [
    { id: '1' },
    { id: '2' },
  ];

  return paramsList;
}

// 동적 세그먼트의 값을 꺼낼때 params prop을 사용
export default async function PostInfo({ params }: { params: Promise<{ id: string }> }){
  // 3초 후에 resolve 됨
  // await new Promise(resolve => setTimeout(resolve, 1000*30));
  // if(id === '444') throw new Error('444 에러!!!');

  const { id } = await params;

  const data = await getPost(id);
  console.log(id, '게시물 조회함');
  return (
    <>
      <h1>{ id }번 게시물 상세 조회</h1>
      <h2>제목: { data.title }</h2>
      <textarea className="w-full h-full focus:outline-none" defaultValue={ data.content }></textarea>
    </>
  );
}