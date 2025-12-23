import { use, useEffect } from "react";
import './ThemeToggle.css';
import ThemeContext from "@/contexts/ThemeContext";

function ThemeToggle(){
  useEffect(() => {
    console.log('## ThemeToggle 렌더링.');
  });

  // TODO 5. ThemeContext 사용하기(theme, toggleTheme() 호출)
  const { theme, toggleTheme } = use(ThemeContext);
  console.log('theme', theme);

  return (
    <button
      onClick={ toggleTheme }
      className="theme-toggle"
    >{ theme === 'light' ? '🌙 다크 모드' : '☀️ 라이트 모드' }</button>
  );
}

export default ThemeToggle;