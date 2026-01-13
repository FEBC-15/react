import './App.css'
import { RouterProvider } from "react-router";
import router from "@/routes";
import useThemeStore from '@/zustand/themeStore';
import { useEffect } from 'react';
import { Suspense } from "react";
import Spinner from '@/components/ui/Spinner';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { isDarkMode } = useThemeStore();
  
  useEffect(() => {
    // 다크 모드에 따라 .dark 클래스 추가/제거
    if(isDarkMode){
      document.documentElement.classList.add('dark');
    }else{
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);
  
  return (
    <Suspense fallback={ <Spinner.FullScreen /> }>
      <RouterProvider router={ router } />
      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        autoClose={1500}
        closeOnClick={true}
        theme="light"
        transition={ Slide }
      />
    </Suspense>
  );
}

export default App;
