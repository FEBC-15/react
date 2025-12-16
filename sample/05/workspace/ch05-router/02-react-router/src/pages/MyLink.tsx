/**
 * MyLink 컴포넌트의 props 타입 정의
 * @property {React.ReactNode} children - 링크 내부에 들어갈 컨텐츠
 * @property {string} to - 이동할 경로 (예: '/home', '/page1')
 */
interface MyLinkProps {
  children: React.ReactNode;
  to: string;
}

/**
 * SPA 라우팅을 위한 커스텀 Link 컴포넌트
 * 
 * 브라우저의 기본 페이지 이동을 방지하고 History API를 사용하여
 * 클라이언트 사이드 라우팅을 구현합니다.
 * 
 * @param {MyLinkProps} props - 컴포넌트 props
 * @returns {JSX.Element} 렌더링될 a 태그
 */
function MyLink({ children, to }: MyLinkProps){
  /**
   * 링크 클릭 이벤트 핸들러
   * 
   * 1. 브라우저의 기본 동작(페이지 새로고침)을 방지
   * 2. History API를 사용하여 URL 변경
   * 3. popstate 이벤트를 발생시켜 라우팅 처리
   * 
   * @param {React.MouseEvent<HTMLAnchorElement>} e - 클릭 이벤트 객체
   */
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // 브라우저의 기본 페이지 이동을 방지
    e.preventDefault();
    
    // History API를 사용하여 URL 변경
    // 첫 번째 인자: state 객체 (null)
    // 두 번째 인자: 타이틀 (빈 문자열)
    // 세 번째 인자: 새로운 URL
    window.history.pushState(null, '', to);
    
    // URL 변경을 알리는 popstate 이벤트를 수동으로 발생
    // App 컴포넌트에서 이 이벤트를 감지하여 화면을 다시 렌더링
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  // href 속성은 유지하여 브라우저의 링크 기능 (마우스 오버시 URL 표시 등)을 보존
  return (
    <a href={ to } onClick={ handleClick }>{ children }</a>
  );
}

export default MyLink;