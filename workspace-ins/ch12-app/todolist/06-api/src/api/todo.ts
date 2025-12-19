import type { ResData, TodoInfoRes, TodoListRes } from "@/types/todo";

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
export async function getTodoInfo(_id: string) {
  const res = await fetch(`${API_URL}/todolist/${_id}`);
  const data = await res.json();

  if(!res.ok){
    // 서버의 응답 상태코드가 4xx, 5xx인 에러일 경우 라우터 에러로 변환
    throw new Response(data.message, { status: res.status });
  }
  return data;
}

// 할일 등록
export async function createTodo(formData: FormData): Promise<ResData<TodoInfoRes>> {
  const body = {
    title: formData.get('title'),
    content: formData.get('content'),
  };
  // https://github.com/FEBC-15/js/blob/main/docs/09.js_ajax.md#52-fetchresource-options
  const res = await fetch(`${API_URL}/todolist`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' // 브라우저가 보내는 바디 데이터의 타입 지정
    },
    body: JSON.stringify(body)
  });
  const data = await res.json();

  if(!res.ok){
    // 서버의 응답 상태코드가 4xx, 5xx인 에러일 경우 라우터 에러로 변환
    throw new Response(data.message, { status: res.status });
  }
  return data;
}

// 할일 수정
export async function updateTodo(_id: number, formData: FormData): Promise<ResData<TodoInfoRes>> {
  const body = {
    title: formData.get('title'),
    content: formData.get('content'),
    done: formData.get('done') === 'on',
  };

  const res = await fetch(`${API_URL}/todolist/${_id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json' // 브라우저가 보내는 바디 데이터의 타입 지정
    },
    body: JSON.stringify(body)
  });
  const data = await res.json();

  if(!res.ok){
    // 서버의 응답 상태코드가 4xx, 5xx인 에러일 경우 라우터 에러로 변환
    throw new Response(data.message, { status: res.status });
  }
  return data;
}

// 할일 삭제
export async function deleteTodo(_id: number): Promise<ResData<TodoInfoRes>> {
  const res = await fetch(`${API_URL}/todolist/${_id}`, {
    method: 'DELETE',
  });
  const data = await res.json();

  if(!res.ok){
    // 서버의 응답 상태코드가 4xx, 5xx인 에러일 경우 라우터 에러로 변환
    throw new Response(data.message, { status: res.status });
  }
  return data;
}