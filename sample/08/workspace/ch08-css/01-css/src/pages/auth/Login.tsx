function Login() {
  return (
    <div className="container">
      <h2>Login</h2>
      <form className="form login">
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" className="input" autoComplete="email" required />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" className="input" autoComplete="current-password" required />
        </div>
        <button>회원가입</button>
        <button>로그인</button>
        <button>아이디 찾기</button>
      </form>
    </div>
  );
};

export default Login;