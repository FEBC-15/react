import { getReplies } from "@/api/post";
import CommentListItem from "@/pages/board/CommentListItem";
import CommentNew from "@/pages/board/CommentNew";
import type { ErrorRes, Reply, ReplyListRes } from "@/types";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useParams } from "react-router";

function CommentList() {
  const { _id } = useParams();
  const { data } = useSuspenseQuery<ReplyListRes, AxiosError<ErrorRes>, Reply[]>({
    queryKey: ['posts', _id, 'replies'],
    queryFn: () => getReplies(Number(_id)),
    select: (data) => data.item,
    staleTime: 1000*10,
  });

  const list = data.map((reply) => <CommentListItem key={reply._id} reply={reply} />);

  return (
    <section className="mb-8">
      <h4 className="mt-8 mb-4 ml-2">댓글 { data.length }개</h4>

      { list }

      <CommentNew />

    </section>
  );
}

export default CommentList;