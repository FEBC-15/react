import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import type { ErrorRes, UserCreateRes, UserCreateForm } from "@/types";
import { createUser } from "@/api/user";
import InputError from "@/components/ui/InputError";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";

function Signup() {
  const { register, formState: { errors }, handleSubmit, setError } = useForm<UserCreateForm>();
  
  const navigate = useNavigate();
  const { mutate } = useMutation<UserCreateRes, AxiosError<ErrorRes>, FormData>({
    mutationFn: createUser,
    onSuccess: (data) => {
      alert(data.item.name + '님, 회원가입 되었습니다.');
      navigate(`/`);
    },
    onError: (err) => {
      console.log(err);
      const errors = err.response?.data.errors;
      const message = err.response?.data.message;
      if(errors){
        // 서버 검증 에러를 각 필드에 설정        
        Object.keys(errors).forEach((fieldName) => {
          setError(fieldName as keyof UserCreateForm, { 
            type: 'server',
            message: errors[fieldName].msg 
          });
        });
      }else if(message){
        alert(message || '회원가입에 실패했습니다. 잠시 후 다시 시도해주세요.');
      }
    },
  });

  const onSubmit = (data: UserCreateForm) => {
    console.log(data);
    const formData = new FormData();
    formData.append('type', 'user');
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('password', data.password);
    if(data.attach && data.attach.length > 0) {
      formData.append('attach', data.attach[0]);
    }
    mutate(formData);
  };

  return (
    <main className="min-w-80 flex grow items-center justify-center py-8">
      <div className="p-8 border border-gray-200 rounded-lg w-full max-w-md dark:bg-gray-600 dark:border-0">
        <div className="text-center py-4">
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">회원 가입</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 mb-2" htmlFor="name">이름</label>
            <input
              type="text"
              id="name"
              autoComplete="name"
              placeholder="이름을 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              { ...register('name', { required: '이름은 필수입니다.' }) }
            />
            <InputError target={ errors.name } />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 mb-2" htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              autoComplete="username"
              placeholder="이메일을 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              { ...register('email', { required: '이메일은 필수입니다.' }) }
            />
            <InputError target={ errors.email } />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 mb-2" htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              autoComplete="new-password"
              placeholder="비밀번호를 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              { ...register('password', { required: '비밀번호는 필수입니다.' }) }
            />
            <InputError target={ errors.password } />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 mb-2" htmlFor="attach">프로필 이미지</label>
            <input
              type="file"
              id="attach"
              accept="image/*"
              placeholder="이미지를 선택하세요"
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
              {...register('attach')}
            />
          </div>

          <div className="mt-10 flex justify-center items-center">
            <button type="submit" className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded">회원가입</button>
            <Link to="/" className="bg-gray-900 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded">취소</Link>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Signup;