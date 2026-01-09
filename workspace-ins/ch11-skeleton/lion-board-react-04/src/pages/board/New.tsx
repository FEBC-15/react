import { Link, useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import InputError from "@/components/ui/InputError";
import type { ErrorRes, PostCreateForm, PostInfoRes, PostType } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "@/api/post";
import type { AxiosError } from "axios";

function New() {
  const { register, formState: { errors }, handleSubmit, setError } = useForm<PostCreateForm>();
  
  const { type = 'info' } = useParams<{ type: PostType }>();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  // useMutation<mutationFn의 반환 타입, mutationFn의 에러 타입, mutate 함수에 전달되는 인자 타입>
  const { mutate } = useMutation<PostInfoRes, AxiosError<ErrorRes>, FormData>({
    mutationFn: createPost,
    onSuccess: (newPost) => { // data: mutationFn의 반환 타입
      alert(`${newPost.item._id}번 글이 등록 되었습니다.`);
      queryClient.invalidateQueries({ queryKey: ['posts', type] });
      navigate(`/${type}`);
    },
    onError: (err) => {
      const errors = err.response?.data.errors;
      const message = err.response?.data.message;
      if(errors){
        // 서버 검증 에러를 각 필드에 설정        
        Object.keys(errors).forEach((fieldName) => {
          setError(fieldName as keyof PostCreateForm, { 
            type: 'server',
            message: errors[fieldName].msg 
          });
        });
      }else if(message){
        alert(message || '게시글 등록에 실패했습니다. 잠시 후 다시 시도해주세요.');
      }
    },
  });

  const onSubmit = (data: PostCreateForm) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', data.content);
    formData.append('type', type);
    mutate(formData);
  };

  return (
    <main className="flex-1 min-w-[320px] p-4">
      <div className="text-center py-4">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">게시글 등록</h2>
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
              {...register('title', { required: '제목을 입력하세요.' })}
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
              { ...register('content', { required: '내용을 입력하세요' }) }
            ></textarea>
            <InputError target={ errors.content } />
          </div>
          <hr />
          <div className="flex justify-end my-6">
            <button type="submit" className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded">등록</button>
            <Link to="/info" className="bg-gray-900 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded">취소</Link>
          </div>
        </form>
      </section>
    </main>
  );
}

export default New;