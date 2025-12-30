function CommentNew() {

  const requestAddComment = async (formData: FormData) => {
    // TODO 9: API 서버에 댓글 등록을 fetch() 요청으로 보낸다.
    // API 참고: https://fesp-api.koyeb.app/market/apidocs/#/게시판/post_posts___id__replies
    // client-id: 'openmarket'

  }
  
  // 등록 버튼 누르면 댓글 등록 요청
  const handleAddComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    requestAddComment(formData);
  }

  return (
    <>
      <h4>댓글 등록</h4>
      <form>
        <textarea rows={3} cols={30} placeholder="댓글 내용"></textarea><br />
        <button type="submit">등록</button>
      </form>
    </>
  );
}

export default CommentNew;