import Footer from "@/components/Footer";
import Header from "@/components/Header";

function About() {
  return (
    <>
      <Header />
      <div id="main">
        <h2>About</h2>
        <div className="todo">
          <p>FrontEnd BootCamp Todo List 라우팅 적용 실습</p>
        </div>
      </div>
      <Footer />
    </>    
  );
}

export default About;