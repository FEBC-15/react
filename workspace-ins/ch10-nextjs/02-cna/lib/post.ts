// API 서버와 통신 작업
// 서버 컴포넌트 전용

import { Post } from "@/types";

// 게시물 목록 조회
export async function getPosts(): Promise<Post[]>{
  const res = await fetch(`https://fesp-api.koyeb.app/market/posts`, {
    headers: {
      'Client-Id': 'openmarket'
    },
    cache: 'force-cache', // 캐시 활성화
    next: {
      revalidate: 60, // 60초 후에 캐시 무효화
    }
  });
  const data = await res.json();
  return data.item;
}

// 게시물 상세 조회
export async function getPost(id: string): Promise<Post>{
  const res = await fetch(`https://fesp-api.koyeb.app/market/posts/${id}`, {
    headers: {
      'Client-Id': 'openmarket'
    }
  });
  const data = await res.json();
  return data.item;
}
