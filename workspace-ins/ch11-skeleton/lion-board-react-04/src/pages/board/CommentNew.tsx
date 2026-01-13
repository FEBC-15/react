import { createReply } from "@/api/post";
import InputError from "@/components/ui/InputError";
import type { ErrorRes, ReplyCreateForm, ReplyInfoRes } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";

function CommentNew() {
  
  const { register, formState: { errors }, handleSubmit, reset } = useForm<ReplyCreateForm>();
  
  const { _id } = useParams();
  const queryClient = useQueryClient();

  const { mutate } = useMutation<ReplyInfoRes, AxiosError<ErrorRes>, FormData>({
    mutationFn: (reply) => createReply(Number(_id), reply),
    onSuccess: (newReply) => {
      alert(`${newReply.item._id}번 댓글이 등록 되었습니다.`);
      queryClient.invalidateQueries({ queryKey: ['posts', _id, 'replies'] });
      reset();
    },
  });

  const onSubmit = (data: ReplyCreateForm) => {
    const formData = new FormData();
    formData.append('content', data.content);
    mutate(formData);
  };

  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <h4 className="mb-4">새로운 댓글을 추가하세요.</h4>
      <form onSubmit={ handleSubmit(onSubmit) }>
        <div className="mb-4">
          <textarea
            rows={3}
            cols={40}
            className="block p-2 w-full text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="내용을 입력하세요."
            { ...register('content', { required: '내용을 입력하세요.' }) }
          />
          <InputError target={ errors.content } />
          
        </div>
        <button type="submit" className="bg-orange-500 py-1 px-4 text-sm text-white font-semibold ml-2 hover:bg-amber-400 rounded">댓글 등록</button>
      </form>
    </div>
  );
}

export default CommentNew;