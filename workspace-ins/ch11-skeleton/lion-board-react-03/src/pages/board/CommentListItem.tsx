import { deleteReply } from "@/api/post";
import type { DeleteRes, ErrorRes, Reply } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { Link, useParams } from "react-router";
import useUserStore from "@/zustand/userStore";

function CommentListItem({ reply }: { reply: Reply }) {
  const { user } = useUserStore();
  const { _id } = useParams();
  const queryClient = useQueryClient();
  const { mutate } = useMutation<DeleteRes, AxiosError<ErrorRes>, void>({
    mutationFn: () => deleteReply(Number(_id), reply._id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts', _id, 'replies'] });
    }
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (confirm('삭제하시겠습니까?')) {
      mutate();
    }
  };

  return (
    <div className="shadow-md rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <img
            className="w-8 mr-2 rounded-full"
            src={reply.user.image || '/images/favicon.svg'}
            alt={`${reply.user.name} 프로필 이미지`}
          />
          <Link to="" className="text-orange-400">{reply.user.name}</Link>
        </div>
        <time className="text-gray-500" dateTime={reply.updatedAt}>{reply.updatedAt}</time>
      </div>
      <div className="flex justify-between items-start mb-2">
        <p className="whitespace-pre-wrap text-sm flex-1">{reply.content}</p>
        { user && user?._id === reply.user._id && (
          <form onSubmit={ onSubmit } className="inline ml-2">
            <button type="submit" className="bg-red-500 py-1 px-2 text-sm text-white font-semibold ml-2 hover:bg-amber-400 rounded">삭제</button>
          </form>
        ) }
      </div>
    </div>
  );
}

export default CommentListItem;