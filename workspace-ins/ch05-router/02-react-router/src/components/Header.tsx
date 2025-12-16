import { Link } from "react-router";

function Header() {
  return (
    <>
      <header>
        <h1>리액트 라우터 - 02 react-router 사용</h1>
        <Link className="menu-dark" to="/home">home</Link>
        <br/>
        <Link className="menu" to="/page1">page1</Link>
        <br/>
        <Link className="menu" to="/page2">page2</Link>
      </header>
    </>
  )
}

export default Header;