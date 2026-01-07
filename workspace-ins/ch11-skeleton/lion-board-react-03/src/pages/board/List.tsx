import { getPosts } from "@/api/post";
import ListItem from "@/pages/board/ListItem";
import type { ErrorRes, PostListItem, PostListRes, PostType } from "@/types";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { Link, useParams } from "react-router";
import useUserStore from "@/zustand/userStore";

function List() {
  const { user } = useUserStore();
  const { type = 'info' } = useParams<{ type: PostType }>();

  // useQuery<queryFn의 리턴타입, 에러타입, select의 리턴타입>
  const { data } = useSuspenseQuery<PostListRes, AxiosError<ErrorRes>, PostListItem[]>({
    queryKey: ['posts', type],
    queryFn: () => getPosts(type),
    select: (data) => data.item,
    staleTime: 1000*60,
  });

  const list = data.map((post) => <ListItem key={post._id} post={post} />);

  return (
    <main className="flex-1 min-w-80 p-10">
      
      <div className="text-center py-4">
        <h2 className="pb-4 text-2xl font-bold text-gray-700 dark:text-gray-200">정보 공유</h2>
      </div>
      <div className="flex justify-end mr-4">
        
        <form action="#">
          <input
            className="dark:bg-gray-600 bg-gray-100 p-1 rounded"
            type="text"
            name="keyword"
          />
          <button type="submit" className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded">검색</button>
        </form>

        { user && 
          <Link to={`/${type}/new`} className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded">글작성</Link>
        }
      </div>
      <section className="pt-10">
        <table className="border-collapse w-full table-fixed">
          <colgroup>
            <col className="w-[10%] sm:w-[10%]" />
            <col className="w-[60%] sm:w-[30%]" />
            <col className="w-[30%] sm:w-[15%]" />
            <col className="w-0 sm:w-[10%]" />
            <col className="w-0 sm:w-[10%]" />
            <col className="w-0 sm:w-[25%]" />
          </colgroup>
          <thead>
            <tr className="border-b border-solid border-gray-600">
              <th className="p-2 whitespace-nowrap font-semibold">번호</th>
              <th className="p-2 whitespace-nowrap font-semibold">제목</th>
              <th className="p-2 whitespace-nowrap font-semibold">글쓴이</th>
              <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">조회수</th>
              <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">댓글수</th>
              <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">작성일</th>
            </tr>
          </thead>
          <tbody>
            
            { list }

          </tbody>
        </table>
        <hr />

        <div>
          <ul className="flex justify-center gap-3 m-4">
            <li className="font-bold text-blue-700">
              <Link to="/info?page=1">1</Link>
            </li>
            <li>
              <Link to="/info?page=2">2</Link>
            </li>
          </ul>
        </div>



      </section>
    </main>
  );
}

export default List;