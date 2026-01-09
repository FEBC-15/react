import { create, type StateCreator } from "zustand";
import { persist } from 'zustand/middleware';

// 다크 모드 테마를 관리하는 스토어의 상태 인터페이스
interface ThemeStoreState {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

// 다크 모드 테마를 관리하는 스토어 생성
const ThemeStore: StateCreator<ThemeStoreState> = (set) => ({
  isDarkMode: window.matchMedia('(prefers-color-scheme: dark)').matches ? true : false,
  toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
});

// 스토리지를 사용할 경우 (localStorage에 저장)
const useThemeStore = create<ThemeStoreState>()(
  persist(ThemeStore, {
    name: 'themeStore',
  })
);

export default useThemeStore;