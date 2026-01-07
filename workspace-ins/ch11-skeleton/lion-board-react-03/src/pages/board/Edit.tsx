import { getPost, updatePost } from "@/api/post";
import InputError from "@/components/ui/InputError";
import type { ErrorRes, Post, PostInfoRes, PostUpdateForm } from "@/types";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router";

function Edit() {
  const { type, _id } = useParams();

  const { data: post, isError, error } = useSuspenseQuery<PostInfoRes, AxiosError<ErrorRes>, Post>({
    queryKey: ['posts', _id],
    queryFn: () => getPost(Number(_id)),
    select: (data) => data.item,
    staleTime: 1000*60,
  });

  if(isError) throw error;

  const { register, formState: { errors }, handleSubmit, setError } = useForm<PostUpdateForm>({
    defaultValues: {
      title: post.title,
      content: post.content,
    }
  });

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate } = useMutation<PostInfoRes, AxiosError<ErrorRes>, FormData>({
    mutationFn: (post) => updatePost(Number(_id), post),
    onSuccess: (updatedPost) => {
      alert(`${updatedPost.item._id}번 게시글이 수정되었습니다.`);
      queryClient.invalidateQueries({ queryKey: ['posts', _id] });
      queryClient.invalidateQueries({ queryKey: ['posts', type] });
      navigate(`/${type}/${_id}`);
    },
    onError: (err) => {
      const errors = err.response?.data.errors;
      const message = err.response?.data.message;
      if(errors){
        // 서버 검증 에러를 각 필드에 설정        
        Object.keys(errors).forEach((fieldName) => {
          setError(fieldName as keyof PostUpdateForm, { 
            type: 'server',
            message: errors[fieldName].msg 
          });
        });
      }else if(message){
        alert(message || '게시글 수정에 실패했습니다. 잠시 후 다시 시도해주세요.');
      }
    },
  });

  const onSubmit = (data: PostUpdateForm) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', data.content);
    mutate(formData);
  };

  return (
    <main className="flex-1 min-w-[320px] p-4">
      <div className="text-center py-4">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">게시글 수정</h2>
      </div>
      <section className="mb-8 p-4">
        <form onSubmit={ handleSubmit(onSubmit) }>
          <div className="my-4">
            <label className="block text-lg content-center" htmlFor="title">제목</label>
            <input
              id="title"
              type="text"
              placeholder="제목을 입력하세요." 
              className="w-full py-2 px-4 border rounded-md dark:bg-gray-700 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              { ...register('title', { required: '제목은 필수입니다.' }) }
            />

            <InputError target={ errors.title } />

          </div>
          <div className="my-4">
            <label className="block text-lg content-center" htmlFor="content">내용</label>
            <textarea 
              id="content"
              rows={15}
              placeholder="내용을 입력하세요."
              className="w-full p-4 text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              { ...register('content', { required: '내용은 필수입니다.' }) }
            />

            <InputError target={ errors.content } />

          </div>
          <hr />
          <div className="flex justify-end my-6">
            <button type="submit" className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded">수정</button>
            <Link to="/info/1" className="bg-gray-900 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded">취소</Link>
          </div>
        </form>
      </section>
    </main>
  );
}

export default Edit;