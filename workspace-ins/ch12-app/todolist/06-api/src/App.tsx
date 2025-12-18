import { RouterProvider } from 'react-router';
import './App.css';
import router from '@/routes';

function App(){
  return (
    <>
      <div className="todoapp">
        {/* react-router가 router를 기준으로 선택한 컴포넌트를 렌더링 */}
        <RouterProvider router={ router } />
      </div>
    </>
  );
}

export default App;