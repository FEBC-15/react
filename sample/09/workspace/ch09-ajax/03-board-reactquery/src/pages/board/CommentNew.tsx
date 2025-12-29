import type { BoardReplyCreateRes } from "@/types/board";
import { getAxiosInstance } from "@/utils/axiosInstance";

function CommentNew({ requestCommentList }: { requestCommentList: () => void }) {

  const axiosInstance = getAxiosInstance();

  const requestAddComment = async (formData: FormData): Promise<boolean> => {
    try{
      const jsonBody = Object.fromEntries(formData.entries());
      await axiosInstance.post<BoardReplyCreateRes>('/posts/1/replies', jsonBody);
      requestCommentList();
      return true;
    }catch(err){
      console.error(err);
      return false;
    }
  };

  const handleAddComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const result = await requestAddComment(formData);
    if(result){
      form.reset();
    }
  };

  return (
    <>
      <h4>댓글 등록</h4>
      <form onSubmit={ handleAddComment }>
        <textarea rows={3} cols={30} placeholder="댓글 내용" name="content"></textarea><br />
        <button type="submit">등록</button>
      </form>
    </>
  );
}

export default CommentNew;