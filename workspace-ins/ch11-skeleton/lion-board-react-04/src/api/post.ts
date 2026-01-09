import type { DeleteRes, PostInfoRes, PostListRes, ReplyInfoRes, ReplyListRes } from "@/types";
import { getAxiosInstance } from "@/utils/axiosInstance";

const instance = getAxiosInstance();

// 게시글 목록 조회
export async function getPosts(type: string) {
  const res = await instance.get<PostListRes>(`/posts?type=${type}`);
  return res.data;
}

// 게시글 상세 조회
export async function getPost(_id: number) {
  const res = await instance.get<PostInfoRes>(`/posts/${_id}`);
  return res.data;
}

// 댓글 목록 조회
export async function getReplies(_id: number) {
  const res = await instance.get<ReplyListRes>(`/posts/${_id}/replies`);
  return res.data;
}

// 게시글 생성
export async function createPost(post: FormData) {
  const res = await instance.post<PostInfoRes>(`/posts`, post);
  return res.data;
}

// 게시글 수정
export async function updatePost(_id: number, post: FormData) {
  const res = await instance.patch<PostInfoRes>(`/posts/${_id}`, post);
  return res.data;
}

// 댓글 생성
export async function createReply(post_id: number, reply: FormData) {
  const res = await instance.post<ReplyInfoRes>(`/posts/${post_id}/replies`, reply);
  return res.data;
}

// 댓글 삭제
export async function deleteReply(post_id: number, reply_id: number) {
  const res = await instance.delete<DeleteRes>(`/posts/${post_id}/replies/${reply_id}`);
  return res.data;
}

// 게시글 삭제
export async function deletePost(_id: number) {
  const res = await instance.delete<DeleteRes>(`/posts/${_id}`);
  return res.data;
}