// 'use client';

import { createPost } from "@/actions/post";

export default function RegistForm(){
  console.log('RegistForm', globalThis.navigator.userAgent);
  return (
    <form action={createPost}>
      <label htmlFor="title">제목</label>
      <input type="text" id="title" name="title" />
      <label htmlFor="content">내용</label>
      <input type="text" id="content" name="content" />
      <button type="submit">등록</button>
    </form>
  );
}