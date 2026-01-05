import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  
  // TODO: API 서버 호출 필요
  const data = {
    title: `${ id }번 게시물`,
    content: '게시판 이용 수칙입니다.',
  };

  return {
    title: data.title,
    description: data.content,
  }
}

// 동적 세그먼트의 값을 꺼낼때 params prop을 사용
export default async function PostInfo({ params }: { params: Promise<{ id: string }> }){
  const { id } = await params;
  return (
    <h1>{ id }번 게시물 상세 조회</h1>
  );
}