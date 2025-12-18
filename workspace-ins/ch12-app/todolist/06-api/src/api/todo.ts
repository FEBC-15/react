import type { TodoListRes } from "@/types/todo";

const API_URL = 'https://fesp-api.koyeb.app/todo';

// 할일 목록 조회
export async function getTodoList(): Promise<TodoListRes> {
  const res = await fetch(`${API_URL}/todolist`);
  const data = await res.json();

  if(!res.ok){
    // 서버의 응답 상태코드가 4xx, 5xx인 에러일 경우 라우터 에러로 변환
    throw new Response(data.message, { status: res.status });
  }
  return data;
}

// 할일 상세 조회
export async function getTodoInfo() {
  
}