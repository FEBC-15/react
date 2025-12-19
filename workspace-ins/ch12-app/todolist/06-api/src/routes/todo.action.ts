import { createTodo, deleteTodo, updateTodo } from "@/api/todo";
import { redirect, type ActionFunctionArgs } from "react-router";

// react-router의 action에서 사용할 등록 함수
export async function todoCreateAction({ request }: ActionFunctionArgs) {
  try{
    const formData = await request.formData();
    await createTodo(formData);
    return redirect(`/todo/list`); // loader, action에서 페이지 이동에 사용
  }catch(err){
    if (err instanceof Response) throw err; // errorElement에서 처리할 4xx, 5xx 에러
    throw new Error('일시적인 네트워크 문제가 발생했습니다. 잠시후 다시 시도하세요.');
  }
}

// react-router의 action에서 사용할 수정 함수
export async function todoUpdateAction({ request, params }: ActionFunctionArgs) {
  try{
    const formData = await request.formData();
    // 동적 세그먼트로 지정한 _id 추출
    // path로 '/todo/list/:_id/edit' 지정했을 경우
    // url이 '/todo/list/3/edit' 일 경우 params = { _id: '3' }
    await updateTodo(params._id!, formData);
    return redirect(`/todo/list/${params._id}`);
  }catch(err){
    if (err instanceof Response) throw err; // errorElement에서 처리할 4xx, 5xx 에러
    throw new Error('일시적인 네트워크 문제가 발생했습니다. 잠시후 다시 시도하세요.');
  }
}

// react-router의 action에서 사용할 삭제 함수
export async function todoDeleteAction({ params }: ActionFunctionArgs) {
  try{
    return deleteTodo(params._id!);
  }catch(err){
    if (err instanceof Response) throw err; // errorElement에서 처리할 4xx, 5xx 에러
    throw new Error('일시적인 네트워크 문제가 발생했습니다. 잠시후 다시 시도하세요.');
  }
}