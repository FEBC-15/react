import { getPosts } from "@/lib/post";

// GET /api/posts
export async function GET(){
  const data = await getPosts();
  return Response.json(data);
}