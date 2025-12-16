import MyLink from "@pages/MyLink";

function Header() {
  return (
    <header>
      <h1>02 리액트 라우터 사용</h1>
      <MyLink to="home">home</MyLink>
      <br/>
      <MyLink to="page1">page1</MyLink>
      <br/>
      <MyLink to="page2">page2</MyLink>
    </header>
  );
}

export default Header;