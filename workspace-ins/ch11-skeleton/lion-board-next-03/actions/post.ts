'use server';

import { ErrorRes, PostInfoRes, ReplyInfoRes } from "@/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

type ActionState = ErrorRes | null;

/**
* 게시글 등록
* @param {ActionState} prevState - 이전 상태(사용하지 않음)
* @param {FormData} formData - 게시글 정보를 담은 FormData 객체
* @returns {Promise<ActionState>} - 생성 결과 응답 객체
* @throws {Error} - 네트워크 오류 발생 시
* @description
* 게시글을 생성하고, 성공 시 해당 게시판으로 리다이렉트
* 실패 시 에러 메시지를 반환
*/
export async function createPost(prevState: ActionState, formData: FormData): Promise<ActionState> {
  // FormData를 일반 Object로 변환
  const body = Object.fromEntries(formData.entries());

  let res: Response;
  let data: PostInfoRes | ErrorRes;

  try{
    res = await fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
      },
      body: JSON.stringify(body),
    });

    data = await res.json();
    
  }catch(error){ // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제로 등록에 실패했습니다.' };
  }

  // redirect()는 예외를 throw 해서 처리하는 방식이라서 try 문에서 사용하면 catch로 처리되므로 제대로 동작하지 않음
  // 따라서 try 문 밖에서 사용해야 함
  if (data.ok) {
    revalidatePath(`/${body.type}`); // 게시글 목록 갱신
    redirect(`/${body.type}`); // 게시글 목록 페이지로 리다이렉트
  }else{
    return data; // 에러 응답 객체 반환
  }
}

type ReplyActionState = ReplyInfoRes | ErrorRes | null;
/**
* 댓글 등록
* @param {ReplyInfoRes | null} prevState - 이전 상태(사용하지 않음)
* @param {FormData} formData - 댓글 정보를 담은 FormData 객체
* @returns {Promise<ReplyInfoRes | ErrorRes>} - 생성 결과 응답 객체
* @description
* 댓글을 생성하고, 성공 시 해당 게시글의 댓글 목록을 갱신
*/
export async function createReply(prevState: ReplyActionState, formData: FormData): Promise<ReplyActionState> {
  const body = Object.fromEntries(formData.entries());

  let res: Response;
  let data: ReplyInfoRes | ErrorRes;

  try{
    res = await fetch(`${API_URL}/posts/${body._id}/replies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
      },
      body: JSON.stringify(body),
    });

    data = await res.json();

  }catch(error){ // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제로 등록에 실패했습니다.' };
  }
  
  if (data.ok) {
    revalidatePath(`/${body.type}/${body._id}/replies`); // 댓글 목록 갱신
  }
  
  return data; // 에러 응답 객체 반환
}