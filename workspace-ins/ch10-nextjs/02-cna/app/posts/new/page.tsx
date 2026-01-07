import RegistForm from "@/app/posts/new/RegistForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: '게시글 등록',
  description: '게시글 등록 페이지입니다.',
}

export default function PostNew(){
  
  return (
    <>
      <h1>게시글 등록</h1>
      
      <RegistForm />
    </>
  );
}