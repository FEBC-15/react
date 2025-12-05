import { useForm } from 'react-hook-form';
import './App.css';

interface Member {
  name: string;
  email: string;
  cellphone: string;
}

// 이메일 검증 정규식
const emailExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// 휴대폰 검증 정규식
const cellphoneExp = /^010[0-9]{4}[0-9]{4}$/;

function App() {

  const { register, handleSubmit, formState: { errors } } = useForm({
    // mode: 'onSubmit', // 최초 검증 시점, default: submit 버튼 클릭 시 검증
    // mode: 'onChange', // 입력 시 검증
    // mode: 'onBlur', // 포커스를 벗어나면 검증
    // reValidateMode: 'onChange', // 재검증 시점, default
    // reValidateMode: 'onBlur',
    // reValidateMode: 'onSubmit',
    criteriaMode: 'firstError', // default, 첫 오류 하나만 포함
    // criteriaMode: 'all', // 에러 모드, 모든 오류 포함
    defaultValues: {
      name: '',
      email: '',
      cellphone: '010'
    }
  });

  // 검증이 통과된 이후에 실행되는 함수
  function registMember(user: Member) {
    console.log('서버에 전송', user);
  }

  return (
    <>
      <h1>16 회원가입 입력값 상태 관리 - react-hook-form</h1>

      <form onSubmit={ handleSubmit(registMember) }>
        <label htmlFor="name">이름</label>
        <input 
          id="name" 
          { ...register('name', {
            required: '이름을 입력하세요',
            minLength: {
              value: 2,
              message: '2글자 이상 입력하세요.'
            }
          }) } 
        /><br />
        <div className="error-style">{ errors.name?.message }</div>

        <label htmlFor="email">이메일</label>
        <input 
          id="email" 
          { ...register('email', {
            required: '이메일을 입력하세요',
            pattern: {
              value: emailExp,
              message: '이메일 양식에 맞지 않습니다.'
            }
          }) } 
        /><br />
        <div className="error-style">{ errors.email?.message }</div>

        <label htmlFor="cellphone">휴대폰</label>
        <input 
          id="cellphone" 
          { ...register('cellphone', {
            required: '휴대폰 번호를 입력하세요',
            pattern: {
              value: cellphoneExp,
              message: '휴대폰 번호 양식에 맞지 않습니다.'
            }
          }) }
        /><br />
        <div className="error-style">{ errors.cellphone?.message }</div>

        <button type="submit">가입</button>
      </form>
    </>
  );
}

export default App;