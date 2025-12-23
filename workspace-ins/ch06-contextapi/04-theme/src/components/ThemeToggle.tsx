import { useEffect } from "react";
import './ThemeToggle.css';

function ThemeToggle(){
  useEffect(() => {
    console.log('## ThemeToggle 렌더링.');
  });

  return (
    <button
      className="theme-toggle"
    >다크 모드</button>
  );
}

export default ThemeToggle;