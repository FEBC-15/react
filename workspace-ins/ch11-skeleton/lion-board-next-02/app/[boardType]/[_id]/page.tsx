import CommentList from "@/app/[boardType]/[_id]/CommentList";
import Link from "next/link";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ boardType: string, _id: string }> }): Promise<Metadata> {
  const { boardType, _id } = await params;
  return {
    title: `${boardType} - React란?`,
    description: `${boardType} - React는 UI를 구성하기 위한 JavaScript 라이브러리로... `,
    openGraph: {
      title: `${boardType} - React란?`,
      description: `${boardType} - React는 UI를 구성하기 위한 JavaScript 라이브러리로... `,
      url: `/${boardType}/${_id}`,
      images: {
        url: '/images/front-end.png'
      }
    }
  };
}

export default async function InfoPage({ params }: { params: Promise<{ boardType: string, _id: string }> }) {
  const { boardType, _id } = await params;

  return (
    <main className="flex-1 container mx-auto mt-4 px-4">

      <section className="mb-8 p-4">
        <form action={`/${boardType}`}>
        <div className="font-semibold text-xl">제목 : React란?</div>
          <div className="text-right text-gray-400">
            <div>작성자 : 네오</div>
            <div>2026.01.03 14:00:00</div>
          </div>
          <div className="mb-4">
            <div>
              <p className="w-full p-2 whitespace-pre-wrap">React는 UI를 구성하기 위한 JavaScript 라이브러리로, 컴포넌트 기반 구조를 사용해 재사용성과 유지보수성이 뛰어납니다.<br />상태 관리와 가상 DOM을 통해 사용자와 빠르게 상호작용하는 동적 웹 앱을 만들 수 있습니다.</p>
            </div>
            <hr/>
          </div>
          <div className="flex justify-end my-4">
            <Link href={`/${boardType}`} className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded">목록</Link>
            <Link href={`/${boardType}/${_id}/edit`} className="bg-gray-900 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded">수정</Link>
            <button type="submit" className="bg-red-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded">삭제</button>
          </div>
        </form>
      </section>    
      
      <CommentList />

    </main>
  );
}