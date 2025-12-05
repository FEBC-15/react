import { useState } from 'react';
import './App.css';

// 이메일 검증 정규식
const emailExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// 휴대폰 검증 정규식
const cellphoneExp = /^010[0-9]{4}[0-9]{4}$/;

function App() {
  console.log('App 렌더링');

  // input 요소를 제어 컴포넌트로 만들기 위해서 상태로 정의
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ cellphone, setCellphone ] = useState('010');

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }
  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }
  function handleCellphoneChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCellphone(event.target.value);
  }

  return (
    <>
      <h1>15 회원가입 입력값 상태 관리</h1>

      <form>
        <label htmlFor="name">이름</label>
        <input id="name" name="name" value={ name } onChange={ handleNameChange } /><br />
        <div className="error-style">검증 실패 메세지</div>

        <label htmlFor="email">이메일</label>
        <input id="email" name="email" value={ email } onChange={ handleEmailChange } /><br />
        <div className="error-style">검증 실패 메세지</div>

        <label htmlFor="cellphone">휴대폰</label>
        <input id="cellphone" name="cellphone" value={ cellphone } onChange={ handleCellphoneChange } /><br />
        <div className="error-style">검증 실패 메세지</div>

        <button type="submit">가입</button>
      </form>

      <p>
        이름: { name }<br />
        이메일: { email }<br />
        휴대폰: { cellphone }<br />
      </p>
    </>
  );
}

export default App;