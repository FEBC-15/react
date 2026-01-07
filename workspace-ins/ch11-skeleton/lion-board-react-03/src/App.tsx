import './App.css'
import { RouterProvider } from "react-router";
import router from "@/routes";
import useThemeStore from '@/zustand/themeStore';
import { useEffect } from 'react';

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
    <RouterProvider router={ router } />
  );
}

export default App;
