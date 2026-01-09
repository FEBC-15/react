import Link from "next/link";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ boardType: string, _id: string }> }): Promise<Metadata> {
  const { boardType, _id } = await params;
  return {
    title: `${boardType} - 게시글 수정`,
    description: `${boardType} - 게시글을 수정하세요.`,
    openGraph: {
      title: `${boardType} - 게시글 수정`,
      description: `${boardType} - 게시글을 수정하세요.`,
      url: `/${boardType}/${_id}/edit`,
      images: {
        url: '/images/front-end.png'
      }
    }
  };
}

export default async function EditPage({ params }: { params: Promise<{ boardType: string, _id: string }> }) {
  const { boardType, _id } = await params;

  return (
    <main className="flex-1 min-w-[320px] p-4">
      <div className="text-center py-4">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">게시글 수정</h2>
      </div>
      <section className="mb-8 p-4">
        <form action={`/${boardType}/${_id}`}>
          <div className="my-4">
            <label className="block text-lg content-center" htmlFor="title">제목</label>
            <input
              id="title"
              type="text"
              placeholder="제목을 입력하세요." 
              className="w-full py-2 px-4 border rounded-md dark:bg-gray-700 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              name="title"
              defaultValue="리액트란?"
            />

            <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
              제목은 필수 입니다.
            </p>

          </div>
          <div className="my-4">
            <label className="block text-lg content-center" htmlFor="content">내용</label>
            <textarea 
              id="content"
              rows={15} 
              placeholder="내용을 입력하세요."
              className="w-full p-4 text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              name="content"
              defaultValue="React는 UI를 구성하기 위한 JavaScript 라이브러리로, 컴포넌트 기반 구조를 사용해 재사용성과 유지보수성이 뛰어납니다. 상태 관리와 가상 DOM을 통해 사용자와 빠르게 상호작용하는 동적 웹 앱을 만들 수 있습니다."
            />

            <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
              내용은 필수입니다.
            </p>

          </div>
          <hr />
          <div className="flex justify-end my-6">
            <button type="submit" className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded">수정</button>
            <Link href={`/${boardType}/${_id}`} className="bg-gray-900 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded">취소</Link>
          </div>
        </form>
      </section>
    </main>
  );
}

