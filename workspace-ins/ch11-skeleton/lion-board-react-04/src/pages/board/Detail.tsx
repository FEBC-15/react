import { deletePost, getPost } from "@/api/post";
import CommentList from "@/pages/board/CommentList";
import type { DeleteRes, ErrorRes, Post, PostInfoRes } from "@/types";
import useUserStore from "@/zustand/userStore";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from 'react-toastify';

function Detail() {
  const { user } = useUserStore();
  const { type, _id } = useParams();

  const { data: post, isError, error } = useSuspenseQuery<PostInfoRes, AxiosError<ErrorRes>, Post>({
    queryKey: ['posts', _id],
    queryFn: () => getPost(Number(_id)),
    select: (data) => data.item,
    staleTime: 1000*60,
  });

  if(isError) throw error;

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate } = useMutation<DeleteRes, AxiosError<ErrorRes>, void>({
    mutationFn: () => deletePost(Number(_id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts', type] });
      toast.success('삭제되었습니다.', {
        onClose: () => navigate(`/${post.type}`)
      });
    }
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (confirm('삭제하시겠습니까?')) {
      mutate();
    }
  };

  return (
    <main className="flex-1 container mx-auto mt-4 px-4">

      <section className="mb-8 p-4">
        <form onSubmit={ onSubmit }>
        <div className="font-semibold text-xl">제목 : {post.title}</div>
          <div className="text-right text-gray-400">
            <div>작성자 : {post.user.name}</div>
            <div>{post.updatedAt}</div>
          </div>
          <div className="mb-4">
            <div>
              <p className="w-full p-2 whitespace-pre-wrap">{post.content}</p>
            </div>
            <hr/>
          </div>
          <div className="flex justify-end my-4">
            <Link to={`/${post.type}`} className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded">목록</Link>
            { user && user?._id === post.user._id && (
              <>
                <Link to={`/${post.type}/${_id}/edit`} className="bg-gray-900 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded">수정</Link>
                <button type="submit" className="bg-red-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded">삭제</button>
              </>
            ) }
          </div>
        </form>
      </section>
      
      <CommentList />

    </main>
  );
}

export default Detail;