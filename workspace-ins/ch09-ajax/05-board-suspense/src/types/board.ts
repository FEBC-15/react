// 코드 참고: https://github.com/FEBC-15/react/blob/main/workspace-ins/ch12-app/todolist/06-api/src/types/todo.ts
// API 참고: https://fesp-api.koyeb.app/market/apidocs/#/게시판

// 게시글 상세
export interface BoardInfo {
  _id: number;
  title: string;
  content: string;
}

// 게시글 목록
export type BoardList = Omit<BoardInfo, 'content'>;

// 게시물 목록 조회 결과 타입
export interface BoardListRes {
  ok: 1;
  item: BoardList[];
}

// 게시물 상세 조회 결과 타입
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

// 서버에서 에러를 응답할 경우
export interface ErrorRes {
  ok: 0;
  message: string;
}

// 서버의 응답
export type ResData<T extends BoardListRes | BoardInfoRes | BoardReplyListRes | BoardReplyCreateRes> = T | ErrorRes;
