import { useEffect, useState } from 'react';
import Home from '@pages/Home';
import Page1 from '@pages/Page1';
import Page2 from '@pages/Page2';

function App() {
  // 현재 URL 경로를 상태로 관리
  // 초기값은 브라우저의 현재 경로로 설정
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    /**
     * URL 변경 이벤트 핸들러
     * 
     * popstate 이벤트가 발생할 때마다 현재 URL 경로를 상태에 반영
     *   1. 사용자가 브라우저의 뒤로가기/앞으로가기 버튼을 클릭할 때
     *   2. history.back()/history.forward()/history.go() 메서드가 호출될 때
     *   3. 브라우저의 주소 표시줄에서 URL을 수동으로 변경할 때
     */
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    // popstate 이벤트 리스너 등록
    window.addEventListener('popstate', handleLocationChange);
    
    // 컴포넌트 언마운트시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []); // 빈 배열을 전달하여 마운트/언마운트시에만 실행

  /**
   * 현재 URL 경로에 따라 적절한 컴포넌트를 반환
   * 
   * @returns {JSX.Element} 현재 경로에 해당하는 페이지 컴포넌트
   */
  const renderComponent = () => {
    switch (currentPath) {
      case '/':
      case '/home':
        return <Home />;
      case '/page1':
        return <Page1 />;
      case '/page2':
        return <Page2 />;
    }
  };

  return (
    <>
      {renderComponent()}
    </>
  );
}

export default App;
