import Login from "@pages/auth/Login";

function App(){
  return (
    <>
      <h1 className="bg-gray-text-blue">01 바닐라 CSS</h1>

      <div className="container">
        <button type="button">기본 버튼</button>
        <button type="button" className="bg-blue-text-red">파란 배경의 빨간 버튼</button>
        <button type="button" className="bg-yellow-text-red">노란 배경의 빨간 버튼</button>
        <button type="button" className="bg-gray-text-blue">회색 배경의 파란 버튼</button>
      </div>
      
      <Login />
    </>
  );
}

export default App;