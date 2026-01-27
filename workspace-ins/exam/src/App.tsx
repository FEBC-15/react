/*
=== 구현할 기능 ===
로그인 성공시: 하단의 로그인 가능한 계정으로 로그인을 성공하면 API 서버로부터 사용자 정보가 반환되고 
그중에서 name 속성값을 이용해 사용자 이름과 환영 메세지를 alert 함수로 출력합니다.
예시) "제이지님 환영합니다."

로그인 가능한 계정 1: u1@market.com / 11111111
로그인 가능한 계정 2: s1@market.com / 11111111

로그인 실패시: API 서버로부터 에러 정보가 반환되고 message 값을 alert 함수로 출력합니다.
예시) "아이디와 패스워드를 확인하시기 바랍니다.", "잘못된 입력값이 있습니다."

API 서버 URL: https://fesp-api.koyeb.app/market/users/login
서버에 보낼 헤더: {'Client-Id': 'openmarket', 'Content-Type': 'application/json'}
method: post
바디로 전송할 데이터: email, password
API 문서 참고: https://fesp-api.koyeb.app/market/apidocs/#/%ED%9A%8C%EC%9B%90/post_users_login

* Postman이나 Bruno로 먼저 테스트 해보세요.

=== 샘플 앱 ===
링크: https://fesp-api.koyeb.app/exam/login.html
샘플 앱으로 접속하면 로그인 성공과 실패시에 어떻게 처리되는지 확인 할 수 있습니다.

=== 배점(60점 만점) ===
1. email, password 입력 양식 작성(10점)
2. submit 이벤트 등록(10점)
3. API 서버 호출(10점)
4. API 서버 호출시 헤더, 바디 전달(10점)
5. API 서버의 응답 메세지 처리(10점)
6. 기타(10점)
*/

function App() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const user = {
        email: formData.get('email'),
        password: formData.get('password'),
      };
      
      const url = 'https://fesp-api.koyeb.app/market/users/login';
      // TODO 3. API 서버 호출
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Client-Id': 'openmarket',
        },
        body: JSON.stringify(user),
      });

      const data = await res.json();
      if(data.ok){
        // TODO 4. 로그인 성공 메세지 출력(xxx님 환영합니다.)
        alert(data.item.name + '님 환영합니다.');
      }else{
        throw new Error(data.message);
      }
    } catch (err) {
      // TODO 5. 로그인 실패 메세지 출력(서버의 응답 데이터중 message 값을 출력)
      if(err instanceof Error){
        alert(err.message);
      }
    }
  };

  return (
    <>
      <h1>로그인</h1>

      {/* TODO 2. submit 이벤트 등록 */}
      <form onSubmit={handleSubmit}>
        {/* TODO 1. email, password 입력 필드와 submit 버튼 추가 */}
        <label htmlFor="email">이메일</label>
        <input type="email" id="email" name="email" placeholder="이메일" defaultValue="u1@market.com" /><br />
        <label htmlFor="password">비밀번호</label>
        <input type="password" id="password" name="password" placeholder="비밀번호" defaultValue="11111111" />
        <button type="submit">로그인</button>
      </form>
    </>
  );
}

export default App;
