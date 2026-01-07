import { uploadFile } from "@/api/file";
import type { UserCreateRes } from "@/types";
import { getAxiosInstance } from "@/utils/axiosInstance";

const instance = getAxiosInstance();

// 회원가입
export async function createUser(user: FormData) {
  const attach = user.get('attach') as File;
  user.delete('attach');
  
  // 파일 업로드 API 호출
  if(attach && attach.size > 0){
    const fileRes = await uploadFile(attach);
    user.append('image', fileRes.item[0].path);
  }
  
  // 회원가입 API 호출
  const res = await instance.post<UserCreateRes>(`/users`, user);
  return res.data;
}

// 로그인
export async function login(user: FormData) {
  const res = await instance.post<UserCreateRes>(`/users/login`, user);
  return res.data;
}