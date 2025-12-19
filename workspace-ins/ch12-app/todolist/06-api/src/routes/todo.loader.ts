import { getTodoList } from "@/api/todo";
import type { LoaderFunctionArgs } from "react-router";

export async function todoListLoader({ request }: LoaderFunctionArgs) {
  console.log(request.url);
  try{
    return getTodoList();
  }catch(err){
    if (err instanceof Response) throw err; // errorElement에서 처리할 4xx, 5xx 에러
    throw new Error('일시적인 네트워크 문제가 발생했습니다. 잠시후 다시 시도하세요.');
  }
}

