import Header from "@components/Header";
import { Link } from "react-router";

function Page2() {
  console.log('Page2 렌더링');
  return (
    <>
      <Header />
      <h2>SPA Page2</h2>
      <p><Link to="/home">홈으로</Link></p>
    </>
  )
}

export default Page2;