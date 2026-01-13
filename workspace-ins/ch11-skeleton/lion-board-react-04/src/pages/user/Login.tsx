import { login } from "@/api/user";
import InputError from "@/components/ui/InputError";
import type { ErrorRes, LoginForm, UserCreateRes } from "@/types";
import useUserStore from "@/zustand/userStore";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";

function Login() {
  const setUser = useUserStore(store => store.setUser);
  const { register, formState: { errors }, handleSubmit, setError } = useForm<LoginForm>();
  
  const navigate = useNavigate();
  const location = useLocation();
  const { mutate } = useMutation<UserCreateRes, AxiosError<ErrorRes>, FormData>({
    mutationFn: login,
    onSuccess: (data) => {
      const user = data.item;
      setUser({
        _id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
        token: user.token,
      });
      alert(data.item.name + '님, 로그인 되었습니다.');
      navigate(location.state?.from || `/`, { replace: true });
    },
    onError: (err) => {
      const errors = err.response?.data.errors;
      const message = err.response?.data.message;
      if(errors){
        // 서버 검증 에러를 각 필드에 설정        
        Object.keys(errors).forEach((fieldName) => {
          setError(fieldName as keyof LoginForm, { 
            type: 'server',
            message: errors[fieldName].msg 
          });
        });
      }else if(message){
        alert(message || '로그인에 실패했습니다. 잠시 후 다시 시도해주세요.');
      }
    },
  });

  const onSubmit = (data: LoginForm) => {
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);
    mutate(formData);
  };

  return (
    <main className="min-w-80 flex grow items-center justify-center py-8">
      <div className="p-8 border border-gray-200 rounded-lg w-full max-w-md dark:bg-gray-600 dark:border-0">
        <div className="text-center py-4">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">로그인</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 mb-2" htmlFor="email">이메일</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="이메일을 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              defaultValue="u1@market.com"
              { ...register('email', { required: '이메일은 필수입니다.' }) }
            />
            <InputError target={ errors.email } />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 mb-2" htmlFor="password">비밀번호</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="비밀번호를 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              defaultValue="11111111"
              { ...register('password', { required: '비밀번호는 필수입니다.' }) }
            />
            <InputError target={ errors.password } />
            <Link to="#" className="block mt-6 ml-auto text-gray-500 text-sm dark:text-gray-300 hover:underline">비밀번호를 잊으셨나요?</Link>
          </div>
          <div className="mt-10 flex justify-center items-center">
            <button type="submit" className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded">로그인</button>
            <Link to="/user/signup" className="ml-8 text-gray-800 hover:underline">회원가입</Link>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Login;