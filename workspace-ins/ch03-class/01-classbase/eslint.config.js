import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      // eslint가 node_modules를 기준으로 프로젝트 루트를 인식함
      // 프로젝트에서 자체 node_modules를 사용하지 않고 상위의 node_modules를 사용하도록 설정하면
      // 하위의 여러 프로젝트에서 tsconfig 파일을 여러개 찾아내기 때문에 오류가 발생
      // 명시적으로 프로젝트 루트를 지정해야 함.
      parserOptions: {
        tsconfigRootDir: import.meta.dirname, // 현재 파일이 있는 디렉토리 경로
      }
    },
  },
])
