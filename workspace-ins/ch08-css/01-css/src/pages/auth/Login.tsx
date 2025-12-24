import Button from '@components/ui/Button';
import './Login.css';

function Login() {
  return (
    <div className="container">
      <h2>Login</h2>
      <form className="form">
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" className="input" autoComplete="email" required />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" className="input" autoComplete="current-password" required />
        </div>
        
        <Button>회원가입</Button>
        <Button>로그인</Button>
        <Button>아이디 찾기</Button>
      </form>
    </div>
  );
};

export default Login;