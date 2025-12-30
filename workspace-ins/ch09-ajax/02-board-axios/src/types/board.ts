// 코드 참고: https://github.com/FEBC-15/react/blob/main/workspace-ins/ch12-app/todolist/06-api/src/types/todo.ts
// API 참고: https://fesp-api.koyeb.app/market/apidocs/#/게시판

// TODO 2: 타입 추가
// 아이템 타입
export interface BoardInfo {
  _id: number;
  title: string;
  content: string;
}

// 목록 조회 결과 타입
export interface BoardListRes {
  ok: 1;
  item: BoardInfo[];
}

// 상세 조회 결과 타입
export interface BoardInfoRes {
  ok: 1;
  item: BoardInfo;
}

// 댓글 타입
export interface BoardReply {
  _id: number;
  content: string;
}

// 댓글 목록 조회 결과 타입
export interface BoardReplyListRes {
  ok: 1;
  item: BoardReply[];
}

// 댓글 등록 결과 타입
export interface BoardReplyCreateRes {
  ok: 1;
  item: BoardReply;
}

// 데이터 검증 오류 타입
interface FieldError {
  type: string;
  value: string;
  msg: string;
  location: string;
}

// 서버에서 에러를 응답할 경우
export interface ErrorRes {
  ok: 0;
  message: string;
  errors?: {
    [field: string]: FieldError;
  }
}

// 서버의 응답
export type ResData<T extends BoardListRes | BoardInfoRes | BoardReplyListRes | BoardReplyCreateRes> = T | ErrorRes;