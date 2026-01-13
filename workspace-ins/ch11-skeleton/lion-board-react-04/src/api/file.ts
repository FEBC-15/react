import type { FileUploadRes } from "@/types";
import { getAxiosInstance } from "@/utils/axiosInstance";

const instance = getAxiosInstance();

// 파일 업로드
export async function uploadFile(attach: File) {
  const fileFormData = new FormData();
  fileFormData.append('attach', attach);
  
  const fileRes = await instance.post<FileUploadRes>(`/files`, fileFormData, {
    headers: {
      'Content-Type': undefined,
    },
  });
  console.log(`fileRes`, fileRes);
  return fileRes.data;
}