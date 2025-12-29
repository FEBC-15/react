function CommentNew() {
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