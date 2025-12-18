// 아이템 타입
export interface Todo {
  _id: number;
  title: string;
  done: boolean;
  content: string;
  createdAt: string;
  updatedAt: string;
}

// 목록 조회 결과 타입
export interface TodoListRes {
  ok: 1;
  items: Todo[];
}

// 상세 조회 결과 타입
export interface TodoInfoRes {
  ok: 1;
  item: Todo;
}

export interface TodoCreateRes {
  ok: 1;
}

// 서버에서 에러를 응답할 경우
export interface ErrorRes {
  ok: 0;
  message: string;
}

// 서버의 응답
export type ResData<T extends TodoListRes | TodoInfoRes> = T | ErrorRes;