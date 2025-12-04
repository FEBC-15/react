import './App.css';

function App(){
  return (
    <>
      <h1>15 회원가입 입력값 상태 관리</h1>

      <form>
        <label htmlFor="name">이름</label>
        <input id="name" name="name" /><br />
        <div className="error-style">검증 실패 메세지</div>

        <label htmlFor="email">이메일</label>
        <input id="email" name="email" /><br />
        <div className="error-style">검증 실패 메세지</div>

        <label htmlFor="cellphone">휴대폰</label>
        <input id="cellphone" name="cellphone" /><br />
        <div className="error-style">검증 실패 메세지</div>

        <button type="submit">가입</button>
      </form>

      <p>
        이름: 무지<br />
        이메일: u1@market.com<br />
        휴대폰: 01022223333<br />
      </p>
    </>
  );
}

export default App;