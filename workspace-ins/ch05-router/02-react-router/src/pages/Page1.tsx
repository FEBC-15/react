import Header from "@components/Header";
import { Link } from "react-router";

function Page1() {
  console.log('Page1 렌더링');
  return (
    <>
      <Header />
      <h2>SPA Page1</h2>
      <p><Link to="/home">홈으로</Link></p>
    </>
  )
}

export default Page1;