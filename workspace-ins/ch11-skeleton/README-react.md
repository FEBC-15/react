# 11장 게시판 앱 개발(React)
* TypeScript
* React
* Vite
* [Next.js 버전 보기](./README-next.md)

## 목차
- [0 개발 준비](#0-개발-준비)
  - [0.1 샘플 코드 테스트](#01-샘플-코드-테스트)
  - [0.2 프로젝트 생성](#02-프로젝트-생성)
  - [0.3 추가 패키지 설치](#03-추가-패키지-설치)
  - [0.4 불필요한 파일 정리](#04-불필요한-파일-정리)
  - [0.5 프로젝트 설정](#05-프로젝트-설정)
- [1 Step 01 - html 파일을 리액트 컴포넌트로 변환](#1-step-01---html-파일을-리액트-컴포넌트로-변환)
  - [1.1 정적인 자원 처리](#11-정적인-자원-처리)
  - [1.2 UI 컴포넌트 작성](#12-ui-컴포넌트-작성)
  - [1.3 라우터 작성](#13-라우터-작성)
  - [1.4 src 폴더 전체 구조](#14-src-폴더-전체-구조)
  - [1.5 Step 01 완료](#15-step-01-완료)
- [2 Step 02 - API 서버 연동](#2-step-02---api-서버-연동)
  - [2.1 준비](#21-준비)
  - [2.2 타입 정의](#22-타입-정의)
  - [2.3 React Query 설정](#23-react-query-설정)
  - [2.4 axios 유틸리티 작성](#24-axios-유틸리티-작성)
  - [2.5 API 서버 호출 로직 작성](#25-api-서버-호출-로직-작성)
  - [2.6 게시물 목록 조회 컴포넌트 작성](#26-게시물-목록-조회-컴포넌트-작성)
  - [2.7 게시물 상세 조회 컴포넌트 작성](#27-게시물-상세-조회-컴포넌트-작성)
  - [2.8 댓글 목록 조회 컴포넌트 작성](#28-댓글-목록-조회-컴포넌트-작성)
  - [2.9 회원 가입 컴포넌트 작성](#29-회원-가입-컴포넌트-작성)
  - [2.10 로그인 컴포넌트 작성](#210-로그인-컴포넌트-작성)
  - [2.11 게시물 등록 컴포넌트 작성](#211-게시물-등록-컴포넌트-작성)
  - [2.12 게시물 수정 컴포넌트 작성](#212-게시물-수정-컴포넌트-작성)
  - [2.13 댓글 등록 컴포넌트 작성](#213-댓글-등록-컴포넌트-작성)
  - [2.14 댓글 삭제 기능 구현](#214-댓글-삭제-기능-구현)
  - [2.15 게시물 삭제 기능 구현](#215-게시물-삭제-기능-구현)
  - [2.16 Step 02 완료](#216-step-02-완료)
- [3 Step 03 - 전역 상태 관리](#3-step-03---전역-상태-관리)
  - [3.1 준비](#31-준비)
  - [3.2 로그인과 JWT 토큰 관리](#32-로그인과-jwt-토큰-관리)
  - [3.3 다크 모드 적용](#33-다크-모드-적용)
  - [3.4 Step 03 완료](#34-step-03-완료)
- [4 Step 04 - 배포 및 최적화](#4-step-04---배포-및-최적화)
  - [4.1 준비](#41-준비)
    - [4.1.1 프로젝트 생성](#411-프로젝트-생성)
  - [4.2 배포 준비](#42-배포-준비)
    - [4.2.1 배포전 테스트](#421-배포전-테스트)
    - [4.2.2 .env](#422-env)
  - [4.3 배포](#43-배포)
    - [4.3.1 netlify 설정 파일 추가](#431-netlify-설정-파일-추가)
    - [4.3.2 배포](#432-배포)
  - [4.4 최적화](#44-최적화)
    - [4.4.1 SEO(Search Engine Optimization)](#441-seosearch-engine-optimization)
    - [4.4.2 사용자 경험(UX) 최적화](#442-사용자-경험ux-최적화)
  - [4.5 Step 04 완료](#45-step-04-완료)

# 0 개발 준비

## 0.1 샘플 코드 테스트
### 0.1.1 샘플 코드 복사
* 레포지토리 루트 폴더(react)에서 실행
  ```sh
  cp -r sample/11/workspace/ch11-skeleton/lion-board-template workspace/ch11-skeleton/lion-board-template-react
  ```

### 0.1.2 샘플 코드 실행
* 레포지토리 루트 폴더(React)에서 실행
  ```sh
  cd workspace/ch11-skeleton
  npx live-server lion-board-template-react
  ```

### 0.1.3 접속 테스트
* http://127.0.0.1:8080

## 0.2 프로젝트 생성
* 참고: https://github.com/FEBC-15/react/tree/main/workspace-ins/ch02-start#211-vite
* workspace/ch11-skeleton 폴더에서 다음 명령 실행
  ```sh
  npm create vite@latest lion-board-react-01
  ```

  - Select a framework: React
  - Select a variant: TypeScript
  - Use rolldown-vite (Experimental)?: No
  - Install with npm and start now? Yes

## 0.3 추가 패키지 설치
* 개발서버 중지
  - 터미널에서 `Ctrl` + `C`

* 프로젝트 루트로 이동
```sh
cd lion-board-react-01
```

* 추가 패키지 설치
```sh
npm i react-hook-form react-router zustand axios @tanstack/react-query @tanstack/react-query-devtools react-spinners react-toastify
npm i -D tailwindcss @tailwindcss/vite
```

## 0.4 불필요한 파일 정리
* ch11-skeleton/lion-board-react-01/src 하위 파일 정리
  - assets 폴더 삭제
  - index.css, App.css 파일의 내용 삭제
  - App.tsx 수정
    ```tsx
    import './App.css'
    function App() {
      return (
        <>
          <h1>라이언 보드 v.01</h1>
        </>
      )
    }
    export default App
    ```

* ch11-skeleton/lion-board-react-01/public/vite.svg 파일 삭제

## 0.5 프로젝트 설정
### 0.5.1 alias 추가
* 참고: https://github.com/FEBC-15/react/tree/main/workspace-ins/ch02-start#viteconfigjs

#### vite.config.js
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: "/src" },
    ],
  },
})
```
#### tsconfig.app.json
```json
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@/*": ["./*"],
    }
  }
}
```

### 0.5.2 Tailwind CSS 설정
* 참고: https://github.com/FEBC-15/react/tree/main/workspace-ins/ch08-css#432-vite-플러그인-구성

* vite.config.ts
```js
......
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({
  ......
  plugins: [
    ......
    tailwindcss(),
  ],
  ......
});
```

* src/index.css
```css
@import 'tailwindcss';

@layer base {
  button {
    cursor: pointer;
  }
}
```

# 1 Step 01 - html 파일을 리액트 컴포넌트로 변환
* HTML 코드를 기반으로 리액트 컴포넌트 생성
* 리액트 라우터 적용
* 작업 폴더: workspace/ch11-skeleton/lion-board-react-01

## 1.1 정적인 자원 처리
* lion-board-template-react/images 폴더를 lion-board-react-01/public 폴더에 복사
* lion-board-react-01/index.html 파일 수정
  - 언어 설정
    ```html
    <html lang="ko">
    ```
  - favicon 설정
    ```html
    <link rel="icon" type="image/svg+xml" href="/images/favicon.svg" />
    ```
    
## 1.2 UI 컴포넌트 작성
* 참고: https://github.com/FEBC-15/react/tree/main/workspace-ins/ch02-start#4-tsx
* workspace/ch11-skeleton/lion-board-template-react 폴더의 html 코드를 컴포넌트로 이동
  - header 태그는 Header.tsx에서 사용
  - footer 태그는 Footer.tsx에서 사용
  - div id="main" 태그는 각 페이지의 컴포넌트에서 사용
  - JSX 문법에 맞게 수정

### 1.2.1 공통 컴포넌트
* lion-board-react-01/src/components/layout 폴더 생성후 파일 작성
* Header.tsx
  - lion-board-template-react/index.html의 `<header>` 영역 복사
  - JSX 문법에 맞게 수정
  - 제목을 `라이언 보드`에서 `라이언 보드 v.01`로 수정

```tsx
function Header() {
  return (
    <header className="px-8 min-w-80 bg-slate-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200 transition-color duration-500 ease-in-out">
      <nav className="flex flex-wrap justify-center items-center p-4 md:flex-nowrap md:justify-between">
        <div className="w-1/2 order-1 md:w-auto">
          <a href="/" className="flex items-center gap-2">
            <img className="mr-3 h-6 w-auto sm:h-9" src="/images/favicon.svg" width="24" height="24" alt="로고 이미지" />
            <span className="text-lg font-bold">라이언 보드 v.01</span>
          </a>
        </div>
        <div className="w-auto order-2 text-base mt-4 md:mt-0">
          <ul className="flex items-center gap-6 uppercase">
            <li className="hover:text-amber-500 hover:font-semibold"><a href="/info">정보공유</a></li>
            <li className="hover:text-amber-500 hover:font-semibold"><a href="/info">자유게시판</a></li>
            <li className="hover:text-amber-500 hover:font-semibold"><a href="/info">질문게시판</a></li>
          </ul>
        </div>

        <div className="w-1/2 order-1 flex justify-end items-center md:order-2 md:w-auto">

          <form action="/">
            <p className="flex items-center">
              <img 
                className="w-8 rounded-full mr-2" 
                src="https://res.cloudinary.com/ddedslqvv/image/upload/v1767106161/user-jayg_i3nudk.webp"
                alt="용쌤 프로필 이미지" />
              용쌤님 :)
              <button type="submit" className="bg-gray-900 py-1 px-2 text-sm text-white font-semibold ml-2 hover:bg-amber-400 rounded">로그아웃</button>
            </p>
          </form>


          <div className="flex justify-end">
            <a href="/user/login" className="bg-orange-500 py-1 px-2 text-sm text-white font-semibold ml-2 hover:bg-amber-400 rounded">로그인</a>
            <a href="/user/signup" className="bg-gray-900 py-1 px-2 text-sm text-white font-semibold ml-2 hover:bg-amber-400 rounded">회원가입</a>
          </div>

          <button
            type="button"
            data-toggle-dark="dark"
            className="ml-4 flex items-center w-8 h-8 justify-center text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg toggle-dark-state-example hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 dark:bg-gray-800 focus:outline-none dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            <svg
              data-toggle-icon="moon"
              className="w-3.5 h-3.5 hidden"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 20"
            >
              <path d="M17.8 13.75a1 1 0 0 0-.859-.5A7.488 7.488 0 0 1 10.52 2a1 1 0 0 0 0-.969A1.035 1.035 0 0 0 9.687.5h-.113a9.5 9.5 0 1 0 8.222 14.247 1 1 0 0 0 .004-.997Z"></path>
            </svg>
            <svg
              data-toggle-icon="sun"
              className="w-3.5 h-3.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-11a1 1 0 0 0 1-1V1a1 1 0 0 0-2 0v2a1 1 0 0 0 1 1Zm0 12a1 1 0 0 0-1 1v2a1 1 0 1 0 2 0v-2a1 1 0 0 0-1-1ZM4.343 5.757a1 1 0 0 0 1.414-1.414L4.343 2.929a1 1 0 0 0-1.414 1.414l1.414 1.414Zm11.314 8.486a1 1 0 0 0-1.414 1.414l1.414 1.414a1 1 0 0 0 1.414-1.414l-1.414-1.414ZM4 10a1 1 0 0 0-1-1H1a1 1 0 0 0 0 2h2a1 1 0 0 0 1-1Zm15-1h-2a1 1 0 1 0 0 2h2a1 1 0 0 0 0-2ZM4.343 14.243l-1.414 1.414a1 1 0 1 0 1.414 1.414l1.414-1.414a1 1 0 0 0-1.414-1.414ZM14.95 6.05a1 1 0 0 0 .707-.293l1.414-1.414a1 1 0 1 0-1.414-1.414l-1.414 1.414a1 1 0 0 0 .707 1.707Z"></path>
            </svg>
            <span className="sr-only">Toggle dark/light mode</span>
          </button>

        </div>
      </nav>
    </header>
  );
}

export default Header;
```

* Footer.tsx
  - lion-board-template-react/index.html의 `<footer>` 영역 복사
  - JSX 문법에 맞게 수정

```tsx
function Footer() {
  return (
    <footer className="p-4 pb-12 w-full border-t border-t-slate-200  dark:border-t-slate-500 dark:bg-gray-600 text-gray-600 dark:text-white transition-color duration-500 ease-in-out">
      <div className="min-w-[320px] flex flex-wrap gap-4 justify-center items-center text-sm text-slate-400">
        <a href="#" className="hover:font-semibold dark:hover:text-gray-200">약관</a>
        <a href="#" className="hover:font-semibold dark:hover:text-gray-200">게시판 정책</a>
        <a href="#" className="hover:font-semibold dark:hover:text-gray-200">회사소개</a>
        <a href="#" className="hover:font-semibold dark:hover:text-gray-200">광고</a>
        <a href="#" className="hover:font-semibold dark:hover:text-gray-200">마이비즈니스</a>
        <a href="#" className="hover:font-semibold dark:hover:text-gray-200">제휴 제안</a>
        <a href="#" className="hover:font-semibold dark:hover:text-gray-200">이용약관</a>
        <a href="#" className="hover:font-semibold dark:hover:text-gray-200">개인정보취급방침</a>
        <a href="#" className="hover:font-semibold dark:hover:text-gray-200">청소년보호 정책</a>
        <a href="#" className="hover:font-semibold dark:hover:text-gray-200">고객센터</a>
      </div>
    </footer>
  );
}

export default Footer;
```

### 1.2.2 레이아웃 컴포넌트 작성
* lion-board-react-01/src/components/layout/index.tsx 파일 작성
  ```tsx
  import Header from "@/components/layout/Header";
  import Footer from "@/components/layout/Footer";

  import { Outlet } from "react-router";

  export default function Layout(){
    return (
      <div className="flex flex-col min-h-screen dark:bg-gray-700 dark:text-gray-200 transition-color duration-500 ease-in-out">
        <Header />
        <Outlet />
        <Footer />
      </div>
    );
  }
  ```

### 1.2.3 페이지별 컴포넌트
#### 메인 페이지
* lion-board-react-01/src/pages/index.tsx 파일 생성
- lion-board-template-react/index.html의 `<main>` 영역 복사
  - JSX 문법에 맞게 수정
```tsx
function MainPage() {
  return (
    <main className="flex-1 container mx-auto mt-10 p-4 transition-color">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">라이언 보드에 오신 것을 환영합니다!</h1>
        <p className="text-xl mb-6">다양한 주제의 커뮤니티와 활발한 소통을 위한 플랫폼입니다. 관심사에 따라 참여하고, 의견을 나누세요.</p>
        <a href="/" className="bg-orange-500 text-white px-6 py-3 rounded hover:bg-orange-600">커뮤니티 참여하기</a>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-4 text-center">주요 기능</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded shadow dark:bg-gray-800">
            <h3 className="text-xl font-bold mb-2">정보 공유</h3>
            <p className="mb-4">다양한 정보와 지식을 공유하세요.</p>
            <a href="/info" className="text-orange-500 hover:underline">바로가기</a>
          </div>
          <div className="bg-white p-6 rounded shadow dark:bg-gray-800">
            <h3 className="text-xl font-bold mb-2">자유 게시판</h3>
            <p className="mb-4">자유롭게 이야기를 나누세요.</p>
            <a href="/info" className="text-orange-500 hover:underline">바로가기</a>
          </div>
          <div className="bg-white p-6 rounded shadow dark:bg-gray-800">
            <h3 className="text-xl font-bold mb-2">질문 게시판</h3>
            <p className="mb-4">궁금한 점을 질문하고 답변을 받아보세요.</p>
            <a href="/info" className="text-orange-500 hover:underline">바로가기</a>
          </div>
        </div>
      </section>
    </main>
  );
}

export default MainPage;
```

#### 게시판 기능
* lion-board-react-01/src/pages/board 폴더 생성
* lion-board-template-react 폴더의 각 html 파일에 있는 `<main>` 태그 복사한 후 JSX 문법으로 수정
  - List.tsx: lion-board-template-react/info/index.html의 `<main>` 태그 복사
    - ListItem.tsx: List.tsx에서 `<tbody>` 내부의 `<tr>` 영역 분리
  - Detail.tsx: lion-board-template-react/info/1/index.html의 `<main>` 태그 복사
    - CommentList.tsx: Detail.tsx에서 `<section className="mb-8">` 영역 분리
      - CommentListItem.tsx: CommentList.tsx에서 `<div className="shadow-md rounded-lg p-4 mb-4">` 영역 분리
      - CommentNew.tsx: CommentList.tsx에서 `<div className="p-4 border border-gray-200 rounded-lg">` 영역 분리
  - New.tsx: lion-board-template-react/new/index.html의 `<main>` 태그 복사
  - Edit.tsx: lion-board-template-react/info/1/edit/index.html의 `<main>` 태그 복사

#### 회원 기능
* lion-board-react-01/src/pages/user 폴더 생성
* lion-board-template-react 폴더의 각 html 파일에 있는 `<main>` 태그 복사한 후 JSX 문법으로 수정해서 완성
  - Login.tsx: lion-board-template-react/user/login/index.html의 `<main>` 태그 복사
  - Signup.tsx: lion-board-template-react/user/signup/index.html의 `<main>` 태그 복사

#### 에러 페이지
* 에러가 발생할 경우 `Layout` 컴포넌트 대신 에러 페이지를 보여주어야 하므로 `<Header>`, `<Footer>`를 포함한 완전한 페이지로 구성해야 함
* lion-board-react-01/src/pages/ErrorPage.tsx 파일 생성
* lion-board-react-01/src/components/layout/index.tsx 코드 복사
* `<Outlet />` 컴포넌트 대신 lion-board-template-react/error.html의 `<main>` 영역 복사
  - JSX 문법에 맞게 수정

  ```tsx
  import Footer from "@/components/layout/Footer";
  import Header from "@/components/layout/Header";
  import { Link } from "react-router";

  function ErrorPage() {
    return (
      <div className="flex flex-col min-h-screen dark:bg-gray-700 dark:text-gray-200 transition-color duration-500 ease-in-out">
        <Header />
        <main className="flex-1 py-20 bg-red-100 border border-red-400 text-red-700 p-4 rounded-lg flex flex-col items-center space-y-2">
            <h2 className="text-xl font-semibold mb-2 text-center">🚧 앗, 무언가 잘못됐네요!</h2>
            <h3 className="text-md font-semibold mb-2 text-center">잠시후 다시 이용해 주시기 바랍니다.</h3>
            <Link to="/" className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600">
              ⚙️ 홈으로 이동
            </Link>
          </main>
        <Footer />
      </div>
    );
  }

  export default ErrorPage;
  ```

## 1.3 라우터 작성
* 참고: https://github.com/FEBC-15/react/tree/main/workspace-ins/ch05-router#2-리액트-라우터란

### 1.3.1 라우터 생성
* lion-board-react-01/src/routes.tsx 파일 생성
* BrowserRouter 사용
  ```tsx
  import Layout from "@/components/layout";
  import Detail from "@/pages/board/Detail";
  import Edit from "@/pages/board/Edit";
  import List from "@/pages/board/List";
  import New from "@/pages/board/New";
  import ErrorPage from "@/pages/ErrorPage";
  import MainPage from "@/pages/index";
  import Login from "@/pages/user/Login";
  import Signup from "@/pages/user/Signup";

  import { createBrowserRouter } from "react-router";

  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <ErrorPage />,
      element: <Layout />,
      children: [
        { index: true, element: <MainPage /> },
        { path: ":type", element: <List /> },
        { path: ":type/new", element: <New /> },
        { path: ":type/:_id", element: <Detail /> },
        { path: ":type/:_id/edit", element: <Edit /> },
        { path: "user/login", element: <Login /> },
        { path: "user/signup", element: <Signup /> },
      ]
    },
  ]);

  export default router;
  ```

### 1.3.2 RouterProvider 추가
* App.tsx 수정
  ```tsx
  import { RouterProvider } from "react-router-dom";
  import router from "@/routes";

  function App() {
    return (
      <RouterProvider router={ router } />
    );
  }

  export default App;
  ```

### 1.3.3 라우팅 테스트
#### 링크 테스트
* 모든 링크가 잘 동작하는지 확인

### 1.3.4 클라이언트 라우팅 적용
#### `<Link>` 컴포넌트 사용
* `<a>` 태그는 페이지 새로고침이 발생하므로 React Router의 `<Link>` 컴포넌트로 수정
  - `href` 속성은 `to`로 수정

* Header.tsx 예시
  ```tsx
  <Link to="/info">정보공유</Link>
  <Link to="/free">자유게시판</Link>
  <Link to="/qna">질문게시판</Link>
  ```

### 1.3.5 클라이언트 라우팅 테스트
* submit 버튼을 제외한 모든 링크 클릭시 페이지 새로고침이 발생하지 않아야 함
  - 개발자 도구의 Network 탭에 서버에 요청한 내역이 없어야 함

## 1.4 src 폴더 전체 구조
```
src/
├── components/                   # 재사용 가능한 컴포넌트
│   └── layout/                   # 레이아웃 관련 컴포넌트
│       │── Footer.tsx            # 하단 푸터 컴포넌트
│       │── Header.tsx            # 상단 헤더 컴포넌트
│       └── index.tsx             # 레이아웃 컴포넌트
│── pages/                        # 페이지 컴포넌트
│    │── board/                   # 게시판 관련 페이지
│    │   ├── CommentList.tsx      # 댓글 목록 컴포넌트
│    │   ├── CommentListItem.tsx  # 댓글 아이템 컴포넌트
│    │   ├── CommentNew.tsx       # 댓글 작성 컴포넌트
│    │   ├── Detail.tsx           # 게시글 상세 페이지
│    │   ├── Edit.tsx             # 게시글 수정 페이지
│    │   ├── List.tsx             # 게시판 목록 페이지
│    │   ├── ListItem.tsx         # 게시판 목록 아이템 컴포넌트
│    │   └── New.tsx              # 게시글 작성 페이지
│    │── user/                    # 회원 관련 페이지
│    │   ├── Login.tsx            # 로그인 페이지
│    │   └── Signup.tsx           # 회원가입 페이지
│    │── ErrorPage.tsx            # 에러 페이지
│    └── index.tsx                # 메인 페이지
│── App.css                       # 앱 스타일
│── App.tsx                       # 메인 앱 컴포넌트
│── index.css                     # 전역 스타일
│── main.tsx                      # 앱 진입점
└── routes.tsx                    # 라우터 설정
```

## 1.5 Step 01 완료
* 완성된 코드 참고: https://github.com/FEBC-15/react/tree/main/workspace-ins/ch11-skeleton/lion-board-react-01

# 2 Step 02 - API 서버 연동
* 참고: https://github.com/FEBC-15/react/tree/main/workspace-ins/ch09-ajax#9장-http-통신과-ajax
* 작업 폴더: workspace/ch11-skeleton/lion-board-react-02

## 2.1 준비
### 2.1.1 프로젝트 생성
* workspace/ch11-skeleton 폴더에서 실행

  ```sh
  # lion-board-react-01 폴더를 복사해서 lion-board-react-02 폴더 생성
  cp -r lion-board-react-01 lion-board-react-02
  ```

* lion-board-react-02/src/components/layout/Header.tsx 파일 수정
  - `라이언 보드 v.01` -> `라이언 보드 v.02`

## 2.2 타입 정의
### 2.2.1 유저 타입 정의
* src/types/user.ts 생성

  ```ts
  // 사용자 정보 인터페이스
  export interface User {
    _id: number,
    email: string,
    name: string,
    image?: string,
    token?: {
      accessToken: string,
      refreshToken: string,
    },
  }

  // 회원가입 폼 타입
  export type UserCreateForm = Pick<User, 'name' | 'email'> & {
    password: string,
    attach?: FileList,
  }

  // 로그인 폼 타입
  export type LoginForm = Pick<User, 'email'> & {
    password: string,
  }
  ```

### 2.2.2 게시물 타입 정의
* src/types/post.ts 생성

  ```ts
  import type { User } from "@/types/user";

  // 댓글 상세
  export interface Reply {
    _id: number;
    content: string;
    user: User;
    createdAt: string;
    updatedAt: string;
  }

  // 댓글 생성 폼 타입
  export type ReplyCreateForm = Pick<Reply, 'content'>;

  // 게시글 타입
  export type PostType = 'info' | 'free' | 'qna';

  // 게시글 상세
  export interface Post {
    _id: number;
    type: PostType;
    title: string;
    content: string;
    user: Pick<User, '_id' | 'name' | 'image'>;
    views: number;
    replies?: Reply[];
    createdAt: string;
    updatedAt: string;
  }

  // 목록에서 사용할 게시글 타입
  export type PostListItem = Pick<Post, '_id' | 'type' | 'title' | 'user' | 'views' | 'updatedAt'> & {
    repliesCount: number;
  };

  // 게시글 수정 폼 타입
  export type PostUpdateForm = Pick<Post, 'title' | 'content'>;

  // 게시글 생성 폼 타입
  export type PostCreateForm = PostUpdateForm & {
    type: PostType;
  };
  ```

### 2.2.3 서버 응답 데이터 타입 정의
* src/types/api.ts 작성

  ```ts
  import type { Post, PostListItem, Reply } from "@/types/post";
  import type { User } from "@/types/user";

  // 게시물 목록 조회 결과 타입
  export interface PostListRes {
    ok: 1;
    item: PostListItem[];
  }

  // 게시물 상세 조회 결과 타입
  export interface PostInfoRes {
    ok: 1;
    item: Post;
  }

  // 댓글 목록 조회 결과 타입
  export interface ReplyListRes {
    ok: 1;
    item: Reply[];
  }

  // 댓글 등록 결과 타입
  export interface ReplyInfoRes {
    ok: 1;
    item: Reply;
  }

  // 파일 업로드 결과 타입
  export interface FileUploadRes {
    ok: 1;
    item: {
      name: string;
      path: string;
    }[];
  }

  // 회원가입 결과 타입
  export interface UserCreateRes {
    ok: 1;
    item: User;
  }

  // 게시글, 댓글 삭제 결과 타입
  export interface DeleteRes {
    ok: 1;
  }

  // 서버 검증 에러 타입
  export interface ServerValidationError {
    type: string,
    value: string,
    msg: string,
    location: string
  }

  // 에러 타입
  export interface ErrorRes {
    ok: 0;
    message: string;
    errors?: {
      [fieldName: string]: ServerValidationError;
    };
  }
  ```

### 2.2.4 통합 타입 정의
* src/types/index.ts 작성
* 여러 타입을 모아서 하나로 export

  ```ts
  export * from './user';
  export * from './post';
  export * from './api';
  ```

## 2.3 React Query 설정
* QueryClient 지정
* 참고: https://github.com/FEBC-15/react/tree/main/workspace-ins/ch09-ajax#7-react-querytanstack-query

* main.tsx 수정
  ```tsx
  import { StrictMode } from 'react'
  import { createRoot } from 'react-dom/client'
  import './index.css'
  import App from './App.tsx'
  import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
  import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

  const client = new QueryClient();

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <QueryClientProvider client={ client }>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </StrictMode>,
  )
  ```

## 2.4 axios 유틸리티 작성
#### src/utils/axiosInstance.ts 작성
```ts
import axios from "axios";
// API 서버 주소
const API_SERVER = 'https://fesp-api.koyeb.app/market';

// Axios 인스턴스 생성 함수
export function getAxiosInstance() {
  const instance = axios.create({
    baseURL: API_SERVER,
    timeout: 1000*15,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Client-Id': 'openmarket',
    }
  });

  // 요청 인터셉터 추가
  instance.interceptors.request.use((config) => {
    // 로그인 후에 응답받은 Access Token을 Authorization 헤더로 전달
    // config.headers.Authorization = `Bearer xxx`;
    config.params = {
      // delay: 500,
      ...config.params,
    };
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  // 응답 인터셉터 추가
  instance.interceptors.response.use((response) => {
    return response;
  }, (error) => {
    console.error('에러 응답 인터셉터 호출', error);
    return Promise.reject(error);
  });

  return instance;
}
```

## 2.5 API 서버 호출 로직 작성
### 2.5.1 게시판 API
#### src/api/post.ts 작성
```ts
import type { DeleteRes, PostInfoRes, PostListRes, ReplyInfoRes, ReplyListRes } from "@/types";
import { getAxiosInstance } from "@/utils/axiosInstance";

const instance = getAxiosInstance();

// 게시글 목록 조회
export async function getPosts(type: string) {
  const res = await instance.get<PostListRes>(`/posts?type=${type}`);
  return res.data;
}

// 게시글 상세 조회
export async function getPost(_id: number) {
  const res = await instance.get<PostInfoRes>(`/posts/${_id}`);
  return res.data;
}

// 댓글 목록 조회
export async function getReplies(_id: number) {
  const res = await instance.get<ReplyListRes>(`/posts/${_id}/replies`);
  return res.data;
}

// 게시글 생성
export async function createPost(post: FormData) {
  const res = await instance.post<PostInfoRes>(`/posts`, post);
  return res.data;
}

// 게시글 수정
export async function updatePost(_id: number, post: FormData) {
  const res = await instance.patch<PostInfoRes>(`/posts/${_id}`, post);
  return res.data;
}

// 댓글 생성
export async function createReply(post_id: number, reply: FormData) {
  const res = await instance.post<ReplyInfoRes>(`/posts/${post_id}/replies`, reply);
  return res.data;
}

// 댓글 삭제
export async function deleteReply(post_id: number, reply_id: number) {
  const res = await instance.delete<DeleteRes>(`/posts/${post_id}/replies/${reply_id}`);
  return res.data;
}

// 게시글 삭제
export async function deletePost(_id: number) {
  const res = await instance.delete<DeleteRes>(`/posts/${_id}`);
  return res.data;
}
```

### 2.5.2 파일 업로드 API
#### src/api/file.ts 작성
```ts
import type { FileUploadRes } from "@/types";
import { getAxiosInstance } from "@/utils/axiosInstance";

const instance = getAxiosInstance();

// 파일 업로드
export async function uploadFile(attach: File) {
  const fileFormData = new FormData();
  fileFormData.append('attach', attach);
  
  const fileRes = await instance.post<FileUploadRes>(`/files`, fileFormData, {
    headers: {
      'Content-Type': undefined,
    },
  });
  console.log(`fileRes`, fileRes);
  return fileRes.data;
}
```
  
### 2.5.3 회원 API
#### src/api/user.ts 작성
```ts
import { uploadFile } from "@/api/file";
import type { UserCreateRes } from "@/types";
import { getAxiosInstance } from "@/utils/axiosInstance";

const instance = getAxiosInstance();

// 회원가입
export async function createUser(user: FormData) {
  const attach = user.get('attach') as File;
  user.delete('attach');
  
  // 파일 업로드 API 호출
  if(attach && attach.size > 0){
    const fileRes = await uploadFile(attach);
    user.append('image', fileRes.item[0].path);
  }
  
  // 회원가입 API 호출
  const res = await instance.post<UserCreateRes>(`/users`, user);
  return res.data;
}

// 로그인
export async function login(user: FormData) {
  const res = await instance.post<UserCreateRes>(`/users/login`, user);
  return res.data;
}
```
  
## 2.6 게시물 목록 조회 컴포넌트 작성
### 2.6.1 게시물 목록 기능 추가
#### src/pages/board/List.tsx 수정
- react query의 useSuspenseQuery로 게시물 목록 조회

  ```tsx
  import { getPosts } from "@/api/post";
  import ListItem from "@/pages/board/ListItem";
  import type { ErrorRes, PostListItem, PostListRes, PostType } from "@/types";
  import { useSuspenseQuery } from "@tanstack/react-query";
  import type { AxiosError } from "axios";
  import { Link, useParams } from "react-router";

  function List() {
    const { type = 'info' } = useParams<{ type: PostType }>();

    const { data } = useSuspenseQuery<PostListRes, AxiosError<ErrorRes>, PostListItem[]>({
      queryKey: ['posts', type],
      queryFn: () => getPosts(type),
      select: (data) => data.item,
      staleTime: 1000*60,
    });

    const list = data.map((post) => <ListItem key={post._id} post={post} />);

    return (
      ...
      <tbody>{ list }</tbody>
      ...
    );
  }

  export default List;
  ```

#### src/pages/board/ListItem.tsx 수정
- props로 전달 받은 게시물 정보 출력

  ```tsx
  import type { PostListItem } from "@/types";
  import { Link } from "react-router";

  function ListItem({ post }: { post: PostListItem }) {
    return (
      <tr className="border-b border-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300 ease-in-out">
        <td className="p-2 text-center">{post._id}</td>
        <td className="p-2 truncate indent-4"><Link to={`/${post.type}/${post._id}`} className="hover:text-orange-500 hover:underline">{post.title}</Link></td>
        <td className="p-2 text-center truncate">{post.user.name}</td>
        <td className="p-2 text-center hidden sm:table-cell">{post.views}</td>
        <td className="p-2 text-center hidden sm:table-cell">{post.repliesCount}</td>
        <td className="p-2 truncate text-center hidden sm:table-cell">{post.updatedAt}</td>
      </tr>
    );
  }

  export default ListItem;
  ```

* 게시물 목록 조회 테스트
  - 정보공유 게시판: http://localhost:5173/info
  - 자유 게시판: http://localhost:5173/free
  - 질문 계시판: http://localhost:5173/qna

## 2.7 게시물 상세 조회 컴포넌트 작성
### 2.7.1 게시물 상세 조회 기능 추가
#### src/pages/board/Detail.tsx 수정
- react query의 useSuspenseQuery로 게시물 상세 조회

  ```tsx
  import { getPost } from "@/api/post";
  import CommentList from "@/pages/board/CommentList";
  import type { ErrorRes, Post, PostInfoRes } from "@/types";
  import { useSuspenseQuery } from "@tanstack/react-query";
  import type { AxiosError } from "axios";
  import { Link, useParams } from "react-router";

  function Detail() {

    const { _id } = useParams();

    const { data: post, isError, error } = useSuspenseQuery<PostInfoRes, AxiosError<ErrorRes>, Post>({
      queryKey: ['posts', _id],
      queryFn: () => getPost(Number(_id)),
      select: (data) => data.item,
      staleTime: 1000*60,
    });

    if(isError) throw error;

    return (
      <main className="flex-1 container mx-auto mt-4 px-4">

        <section className="mb-8 p-4">
          <form action="/info">
            <div className="font-semibold text-xl">제목 : {post.title}</div>
            <div className="text-right text-gray-400">
              <div>작성자 : {post.user.name}</div>
              <div>{post.updatedAt}</div>
            </div>
            <div className="mb-4">
              <div>
                <p className="w-full p-2 whitespace-pre-wrap">{post.content}</p>
              </div>
              <hr/>
            </div>
            <div className="flex justify-end my-4">
              <Link to={`/${post.type}`} className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded">목록</Link>
              <Link to={`/${post.type}/${_id}/edit`} className="bg-gray-900 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded">수정</Link>
              <button type="submit" className="bg-red-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded">삭제</button>
            </div>
          </form>
        </section>
        
        <CommentList />

      </main>
    );
  }

  export default Detail;
  ```

* 게시물 상세 조회 테스트
  - http://localhost:5173/info/6

## 2.8 댓글 목록 조회 컴포넌트 작성
### 2.8.1 댓글 목록 조회 기능 추가
#### src/pages/board/CommentList.tsx 수정
- react query의 useSuspenseQuery로 댓글 목록 조회

  ```tsx
  import { getReplies } from "@/api/post";
  import CommentListItem from "@/pages/board/CommentListItem";
  import CommentNew from "@/pages/board/CommentNew";
  import type { ErrorRes, Reply, ReplyListRes } from "@/types";
  import { useSuspenseQuery } from "@tanstack/react-query";
  import type { AxiosError } from "axios";
  import { useParams } from "react-router";

  function CommentList() {
    const { _id } = useParams();
    const { data } = useSuspenseQuery<ReplyListRes, AxiosError<ErrorRes>, Reply[]>({
      queryKey: ['posts', _id, 'replies'],
      queryFn: () => getReplies(Number(_id)),
      select: (data) => data.item,
      staleTime: 1000*10,
    });

    const list = data.map((reply) => <CommentListItem key={reply._id} reply={reply} />);

    return (
      <section className="mb-8">
        <h4 className="mt-8 mb-4 ml-2">댓글 { data.length }개</h4>
        { list }
        <CommentNew />
      </section>
    );
  }

  export default CommentList;
  ```

#### src/pages/board/CommentListItem.tsx 수정
- props로 전달 받은 댓글 정보 출력

  ```tsx
  import type { Reply } from "@/types";
  import { Link } from "react-router";

  function CommentListItem({ reply }: { reply: Reply }) {
    return (
      <div className="shadow-md rounded-lg p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <img
              className="w-8 mr-2 rounded-full"
              src={reply.user.image  || '/images/favicon.svg'}
              alt={`${reply.user.name} 프로필 이미지`}
            />
            <Link to="" className="text-orange-400">{reply.user.name}</Link>
          </div>
          <time className="text-gray-500" dateTime={reply.updatedAt}>{reply.updatedAt}</time>
        </div>
        <div className="flex justify-between items-start mb-2">
          <p className="whitespace-pre-wrap text-sm flex-1">{reply.content}</p>
          <form action="#" className="inline ml-2">
            <button type="submit" className="bg-red-500 py-1 px-2 text-sm text-white font-semibold ml-2 hover:bg-amber-400 rounded">삭제</button>
          </form>
        </div>
      </div>
    );
  }

  export default CommentListItem;
  ```

* 댓글 목록 조회 테스트
  - http://localhost:5173/info/6

## 2.9 회원 가입 컴포넌트 작성
* 게시물 등록, 수정, 삭제, 댓글 등록, 댓글 삭제는 로그인 한 회원만 사용 가능한 기능

### 2.9.1 입력값 검증 실패 메시지 출력용 컴포넌트 작성
#### src/components/ui/InputError.tsx 작성
```tsx
import type { FieldError } from "react-hook-form";

export default function InputError({ target }: { target: FieldError | undefined }){
  if(!target) return;
  return (
    <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
      { target.message }
    </p>
  );
}
```

### 2.9.2 폼 데이터 관리
#### src/pages/user/Signup.tsx 수정
- react-hook-form 사용

  ```tsx
  import { useForm } from 'react-hook-form';
  import type { UserCreateForm } from "@/types";
  ...
  function Signup() {
    const { register, formState: { errors } } = useForm<UserCreateForm>();
    ...
  }

  export default Signup;
  ```

- react-hook-form의 register 함수로 입력 요소 등록 및 검증 실패 메시지 출력

  ```tsx
  import InputError from "@/components/ui/InputError";
  ...
  <div className="mb-4">
    <label className="block text-gray-700 dark:text-gray-200 mb-2" htmlFor="name">이름</label>
    <input
      type="text"
      id="name"
      autoComplete="name"
      placeholder="이름을 입력하세요"
      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
      { ...register('name', { required: '이름은 필수입니다.' }) }
    />
    <InputError target={ errors.name } />
  </div>
  <div className="mb-4">
    <label className="block text-gray-700 dark:text-gray-200 mb-2" htmlFor="email">이메일</label>
    <input
      type="email"
      id="email"
      autoComplete="username"
      placeholder="이메일을 입력하세요"
      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
      { ...register('email', { required: '이메일은 필수입니다.' }) }
    />
    <InputError target={ errors.email } />
  </div>
  <div className="mb-4">
    <label className="block text-gray-700 dark:text-gray-200 mb-2" htmlFor="password">비밀번호</label>
    <input
      type="password"
      id="password"
      autoComplete="new-password"
      placeholder="비밀번호를 입력하세요"
      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
      { ...register('password', { required: '비밀번호는 필수입니다.' }) }
    />
    <InputError target={ errors.password } />
  </div>

  <div className="mb-4">
    <label className="block text-gray-700 dark:text-gray-200 mb-2" htmlFor="attach">프로필 이미지</label>
    <input
      type="file"
      id="attach"
      accept="image/*"
      placeholder="이미지를 선택하세요"
      className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
      { ...register('attach' )}
    />
  </div>
  ...
  ```

### 2.9.3 회원 가입 기능 추가
#### src/pages/user/Signup.tsx 수정
- react query의 useMutation으로 회원 가입 이벤트 추가

  ```tsx
  import { Link, useNavigate } from "react-router";
  import { useForm } from "react-hook-form";
  import type { ErrorRes, UserCreateRes, UserCreateForm } from "@/types";
  import { createUser } from "@/api/user";
  import InputError from "@/components/ui/InputError";
  import { useMutation } from "@tanstack/react-query";
  import type { AxiosError } from "axios";

  function Signup() {
    const { register, formState: { errors }, handleSubmit, setError } = useForm<UserCreateForm>();
    
    const navigate = useNavigate();
    const { mutate } = useMutation<UserCreateRes, AxiosError<ErrorRes>, FormData>({
      mutationFn: createUser,
      onSuccess: (data) => {
        alert(data.item.name + '님, 회원가입 되었습니다.');
        navigate(`/`);
      },
      onError: (err) => {
        console.log(err);
        const errors = err.response?.data.errors;
        const message = err.response?.data.message;
        if(errors){
          // 서버 검증 에러를 각 필드에 설정        
          Object.keys(errors).forEach((fieldName) => {
            setError(fieldName as keyof UserCreateForm, { 
              type: 'server',
              message: errors[fieldName].msg 
            });
          });
        }else if(message){
          alert(message || '회원가입에 실패했습니다. 잠시 후 다시 시도해주세요.');
        }
      },
    });

    const onSubmit = (data: UserCreateForm) => {
      const formData = new FormData();
      formData.append('type', 'user');
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('password', data.password);
      if(data.attach && data.attach.length > 0) {
        formData.append('attach', data.attach[0]);
      }
      mutate(formData);
    };

    return (
      ...
      <form onSubmit={ handleSubmit(onSubmit) }>
      ...
    );
  }
  export default Signup;
  ```

* 회원가입 기능 테스트
  - http://localhost:5173/user/signup

## 2.10 로그인 컴포넌트 작성
### 2.10.1 폼 데이터 관리
#### src/pages/user/Login.tsx 수정
- react-hook-form 사용

  ```tsx
  import { useForm } from 'react-hook-form';
  import type { LoginForm } from "@/types";
  ...
  function Login() {
    const { register, formState: { errors } } = useForm<LoginForm>();
    ...
  }

  export default Login;
  ```

- react-hook-form의 register 함수로 입력 요소 등록 및 검증 실패 메시지 출력
  ```tsx
  import InputError from "@/components/ui/InputError";
  ...
  <div className="mb-4">
    <label className="block text-gray-700 dark:text-gray-200 mb-2" htmlFor="email">이메일</label>
    <input
      id="email"
      type="email"
      autoComplete="email"
      placeholder="이메일을 입력하세요"
      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
      { ...register('email', { required: '이메일은 필수입니다.' }) }
    />
    <InputError target={ errors.email } />
  </div>
  <div className="mb-4">
    <label className="block text-gray-700 dark:text-gray-200 mb-2" htmlFor="password">비밀번호</label>
    <input
      id="password"
      type="password"
      autoComplete="current-password"
      placeholder="비밀번호를 입력하세요"
      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
      { ...register('password', { required: '비밀번호는 필수입니다.' }) }
    />
    <InputError target={ errors.password } />
    <Link to="#" className="block mt-6 ml-auto text-gray-500 text-sm dark:text-gray-300 hover:underline">비밀번호를 잊으셨나요?</Link>
  </div>
  ...
  ```

### 2.10.2 로그인 기능 추가
#### src/pages/user/Login.tsx 수정
- react query의 useMutation으로 로그인 이벤트 추가

  ```tsx
  import { login } from "@/api/user";
  import InputError from "@/components/ui/InputError";
  import type { ErrorRes, LoginForm, UserCreateRes } from "@/types";
  import { useMutation } from "@tanstack/react-query";
  import type { AxiosError } from "axios";
  import { useForm } from "react-hook-form";
  import { Link, useNavigate } from "react-router";

  function Login() {
    const { register, formState: { errors }, handleSubmit, setError } = useForm<LoginForm>();
    
    const navigate = useNavigate();
    const { mutate } = useMutation<UserCreateRes, AxiosError<ErrorRes>, FormData>({
      mutationFn: login,
      onSuccess: (data) => {
        console.log(data);
        alert(data.item.name + '님, 로그인 되었습니다.');
        // navigate(`/`); // 개발자 도구 Console의 AccessToken 복사 후 주석 해제
      },
      onError: (err) => {
        const errors = err.response?.data.errors;
        const message = err.response?.data.message;
        if(errors){
          // 서버 검증 에러를 각 필드에 설정        
          Object.keys(errors).forEach((fieldName) => {
            setError(fieldName as keyof LoginForm, { 
              type: 'server',
              message: errors[fieldName].msg 
            });
          });
        }else if(message){
          alert(message || '로그인에 실패했습니다. 잠시 후 다시 시도해주세요.');
        }
      },
    });

    const onSubmit = (data: LoginForm) => {
      const formData = new FormData();
      formData.append('email', data.email);
      formData.append('password', data.password);
      mutate(formData);
    };

    return (
      ...
      <form onSubmit={ handleSubmit(onSubmit) }>
      ...
    );
  }

  export default Login;
  ```

* 로그인 기능 테스트
  - http://localhost:5173/user/login
  - 가입한 회원 정보로 로그인 테스트

### 2.10.3 요청 헤더에 Authorization 추가
* 로그인이 필요한 API 요청 시 Authorization 요청 헤더를 통해 API 서버가 로그인 한 사용자의 정보를 확인하므로 로그인 직후에 응답 데이터에 포함된 accessToken을 매 요청에 보내야 함
  - 현재는 하드코딩 하고 추후 글로벌 상태관리 라이브러리에서 관리할 예정

#### src/utils/axiosInstance.ts 수정
* 요청 인터셉터에 Authorization 헤더를 임시로 access token 값으로 하드코딩
* xxx은 로그인 완료 후 받은 응답 데이터의 accessToken 값으로 대체
  - 개발자 도구의 Console에서 확인 가능
  - `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjQsInR5cGUiOiJ1c2VyIiwiaWF0IjoxNzY3NDk4Mjg4LCJleHAiOjE3Njc1ODQ2ODgsImlzcyI6IkAFQkMifQ.bDF5yaAaBLFLYki3io84re7_BlV5VPY9PoxRIYsLDQ4` 와 유사한 문자열

    ```js
    instance.interceptors.request.use((config) => {
      // 로그인 후에 응답받은 Access Token을 Authorization 헤더로 전달
      config.headers.Authorization = `Bearer eyJhbGc...IYsLDQ4`;
      ...
    }, (error) => {
      return Promise.reject(error);
    });
    ```

* src/pages/user/Login.tsx의 `navigate(`/`);` 주석 해제

## 2.11 게시물 등록 컴포넌트 작성
### 2.11.1 글작성 링크 수정
#### src/pages/board/List.tsx 수정
```tsx
<Link to={`/${type}/new`} className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded">글작성</Link>
```

### 2.11.2 폼 데이터 관리
#### src/pages/board/New.tsx 수정
- react-hook-form 사용

  ```tsx
  import { useForm } from 'react-hook-form';
  import type { PostCreateForm } from "@/types";
  ...
  function New() {
    const { register, formState: { errors } } = useForm<PostCreateForm>();
    ...
  }

  export default New;
  ```

- react-hook-form의 register 함수로 입력 요소 등록 및 검증 실패 메시지 출력

  ```tsx
  import InputError from "@/components/ui/InputError";
  ...
  <div className="my-4">
    <label className="block text-lg content-center" htmlFor="title">제목</label>
    <input
      id="title"
      type="text"
      placeholder="제목을 입력하세요." 
      className="w-full py-2 px-4 border rounded-md dark:bg-gray-700 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      { ...register('title', { required: '제목을 입력하세요.' }) }
    />
    <InputError target={ errors.title } />
  </div>
  <div className="my-4">
    <label className="block text-lg content-center" htmlFor="content">내용</label>
    <textarea 
      id="content"
      rows={15}
      placeholder="내용을 입력하세요."
      className="w-full p-4 text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
      { ...register('content', { required: '내용을 입력하세요' }) }
    ></textarea>
    <InputError target={ errors.content } />
  </div>
  ...
  ```

### 2.11.3 게시물 등록 기능 추가
#### src/pages/board/New.tsx 수정
- react query의 useMutation으로 게시물 등록 이벤트 추가

  ```tsx
  import { Link, useNavigate, useParams } from "react-router";
  import { useForm } from "react-hook-form";
  import InputError from "@/components/ui/InputError";
  import type { ErrorRes, PostCreateForm, PostInfoRes, PostType } from "@/types";
  import { useMutation, useQueryClient } from "@tanstack/react-query";
  import { createPost } from "@/api/post";
  import type { AxiosError } from "axios";

  function New() {
    const { register, formState: { errors }, handleSubmit, setError } = useForm<PostCreateForm>();

    const { type = 'info' } = useParams<{ type: PostType }>();
    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const { mutate } = useMutation<PostInfoRes, AxiosError<ErrorRes>, FormData>({
      mutationFn: createPost,
      onSuccess: (newPost) => {
        alert(`${newPost.item._id}번 글이 등록 되었습니다.`);
        queryClient.invalidateQueries({ queryKey: ['posts', type] });
        navigate(`/${type}`);
      },
      onError: (err) => {
        const errors = err.response?.data.errors;
        const message = err.response?.data.message;
        if(errors){
          // 서버 검증 에러를 각 필드에 설정        
          Object.keys(errors).forEach((fieldName) => {
            setError(fieldName as keyof PostCreateForm, { 
              type: 'server',
              message: errors[fieldName].msg 
            });
          });
        }else if(message){
          alert(message || '게시글 등록에 실패했습니다. 잠시 후 다시 시도해주세요.');
        }
      },
    });

    const onSubmit = (data: PostCreateForm) => {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('content', data.content);
      formData.append('type', type);
      mutate(formData);
    };

    return (
      ...
      <form onSubmit={ handleSubmit(onSubmit) }>
      ...
    );
  }

  export default New;
  ```

* 게시물 등록 기능 테스트
  - http://localhost:5173/info/new

## 2.12 게시물 수정 컴포넌트 작성
### 2.12.1 폼 데이터 관리
#### src/pages/board/Edit.tsx 수정
- 게시물 상세 조회 후 react-hook-form 사용

  ```tsx
  import { getPost } from "@/api/post";
  import type { ErrorRes, Post, PostInfoRes, PostUpdateForm } from "@/types";
  import { useSuspenseQuery } from "@tanstack/react-query";
  import type { AxiosError } from "axios";
  import { useForm } from "react-hook-form";
  import { Link, useParams } from "react-router";

  function Edit() {
    const { _id } = useParams();

    const { data: post, isError, error } = useSuspenseQuery<PostInfoRes, AxiosError<ErrorRes>, Post>({
      queryKey: ['posts', _id],
      queryFn: () => getPost(Number(_id)),
      select: (data) => data.item,
      staleTime: 1000*60,
    });

    if(isError) throw error;

    const { register, formState: { errors } } = useForm<PostUpdateForm>({
      defaultValues: {
        title: post.title,
        content: post.content,
      }
    });

    return (
      ...
    );
  }

  export default Edit;
  ```

- react-hook-form의 register 함수로 입력 요소 등록 및 검증 실패 메시지 출력

  ```tsx
  import InputError from "@/components/ui/InputError";
  ...
  <div className="my-4">
    <label className="block text-lg content-center" htmlFor="title">제목</label>
    <input
      id="title"
      type="text"
      placeholder="제목을 입력하세요." 
      className="w-full py-2 px-4 border rounded-md dark:bg-gray-700 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      { ...register('title', { required: '제목은 필수입니다.' }) }
    />
    <InputError target={ errors.title } />
  </div>
  <div className="my-4">
    <label className="block text-lg content-center" htmlFor="content">내용</label>
    <textarea 
      id="content"
      rows={15}
      placeholder="내용을 입력하세요."
      className="w-full p-4 text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
      { ...register('content', { required: '내용은 필수입니다.' }) }
    />
    <InputError target={ errors.content } />
  </div>
  ...
  ```

### 2.12.2 게시물 수정 기능 추가
#### src/pages/board/Edit.tsx 수정
- react query의 useMutation으로 게시물 수정 이벤트 추가

  ```tsx
  import { getPost, updatePost } from "@/api/post";
  import InputError from "@/components/ui/InputError";
  import type { ErrorRes, Post, PostInfoRes, PostUpdateForm } from "@/types";
  import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
  import type { AxiosError } from "axios";
  import { useForm } from "react-hook-form";
  import { Link, useNavigate, useParams } from "react-router";

  function Edit() {
    const { type, _id } = useParams();

    const { data: post, isError, error } = useSuspenseQuery<PostInfoRes, AxiosError<ErrorRes>, Post>({
      queryKey: ['posts', _id],
      queryFn: () => getPost(Number(_id)),
      select: (data) => data.item,
      staleTime: 1000*60,
    });

    if(isError) throw error;

    const { register, formState: { errors }, handleSubmit, setError } = useForm<PostUpdateForm>({
      defaultValues: {
        title: post.title,
        content: post.content,
      }
    });

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate } = useMutation<PostInfoRes, AxiosError<ErrorRes>, FormData>({
      mutationFn: (post) => updatePost(Number(_id), post),
      onSuccess: (updatedPost) => {
        alert(`${updatedPost.item._id}번 게시글이 수정되었습니다.`);
        queryClient.invalidateQueries({ queryKey: ['posts', _id] });
        queryClient.invalidateQueries({ queryKey: ['posts', type] });
        navigate(`/${type}/${_id}`);
      },
      onError: (err) => {
        const errors = err.response?.data.errors;
        const message = err.response?.data.message;
        if(errors){
          // 서버 검증 에러를 각 필드에 설정        
          Object.keys(errors).forEach((fieldName) => {
            setError(fieldName as keyof PostUpdateForm, { 
              type: 'server',
              message: errors[fieldName].msg 
            });
          });
        }else if(message){
          alert(message || '게시글 수정에 실패했습니다. 잠시 후 다시 시도해주세요.');
        }
      },
    });

    const onSubmit = (data: PostUpdateForm) => {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('content', data.content);
      mutate(formData);
    };

    return (
      ...
      <form onSubmit={ handleSubmit(onSubmit) }>
      ...
    );
  }

  export default Edit;
  ```

* 게시물 수정 기능 테스트
  - 로그인 한 사용자가 작성한 게시물에 대해서 수정 기능 테스트

## 2.13 댓글 등록 컴포넌트 작성
### 2.13.1 폼 데이터 관리
#### src/pages/board/CommentNew.tsx 수정
- react-hook-form 사용

  ```tsx
  import { useForm } from 'react-hook-form';
  import type { ReplyCreateForm } from "@/types";
  ...
  function CommentNew() {
    const { register, formState: { errors } } = useForm<ReplyCreateForm>();
    ...
  }

  export default CommentNew;
  ```

- react-hook-form의 register 함수로 입력 요소 등록 및 검증 실패 메시지 출력

  ```tsx
  import InputError from "@/components/ui/InputError";
  ...
  <div className="mb-4">
    <textarea
      rows={3}
      cols={40}
      className="block p-2 w-full text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
      placeholder="내용을 입력하세요."
      { ...register('content', { required: '내용을 입력하세요.' }) }
    />
    <InputError target={ errors.content } />          
  </div>
  ...
  ```

### 2.13.2 댓글 등록 기능 추가
#### src/pages/board/CommentNew.tsx 수정
- react query의 useMutation으로 댓글 등록 이벤트 추가

  ```tsx
  import { createReply } from "@/api/post";
  import InputError from "@/components/ui/InputError";
  import type { ErrorRes, ReplyCreateForm, ReplyInfoRes } from "@/types";
  import { useMutation, useQueryClient } from "@tanstack/react-query";
  import type { AxiosError } from "axios";
  import { useForm } from "react-hook-form";
  import { useParams } from "react-router";

  function CommentNew() {
    const { register, formState: { errors }, handleSubmit, reset } = useForm<ReplyCreateForm>();
    
    const { _id } = useParams();
    const queryClient = useQueryClient();

    const { mutate } = useMutation<ReplyInfoRes, AxiosError<ErrorRes>, FormData>({
      mutationFn: (reply) => createReply(Number(_id), reply),
      onSuccess: (newReply) => {
        alert(`${newReply.item._id}번 댓글이 등록 되었습니다.`);
        queryClient.invalidateQueries({ queryKey: ['posts', _id, 'replies'] });
        reset();
      },
    });

    const onSubmit = (data: ReplyCreateForm) => {
      const formData = new FormData();
      formData.append('content', data.content);
      mutate(formData);
    };

    return (
      ...
      <form onSubmit={ handleSubmit(onSubmit) }>
      ...
    );
  }

  export default CommentNew;
  ```

* 댓글 등록 기능 테스트
  - http://localhost:5173/info/6

## 2.14 댓글 삭제 기능 구현
### 2.14.1 댓글 삭제 기능 추가
#### src/pages/board/CommentListItem.tsx 수정
- react query의 useMutation으로 댓글 삭제 이벤트 추가

  ```tsx
  import { deleteReply } from "@/api/post";
  import type { DeleteRes, ErrorRes, Reply } from "@/types";
  import { useMutation, useQueryClient } from "@tanstack/react-query";
  import type { AxiosError } from "axios";
  import { Link, useParams } from "react-router";

  function CommentListItem({ reply }: { reply: Reply }) {
    const { _id } = useParams();
    const queryClient = useQueryClient();
    const { mutate } = useMutation<DeleteRes, AxiosError<ErrorRes>, void>({
      mutationFn: () => deleteReply(Number(_id), reply._id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['posts', _id, 'replies'] });
      }
    });

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (confirm('삭제하시겠습니까?')) {
        mutate();
      }
    };

    return (
      ...
      <form onSubmit={ onSubmit } className="inline ml-2">
      ...
    );
  }

  export default CommentListItem;
  ```

* 댓글 삭제 기능 테스트
  - 로그인 한 사용자가 작성한 댓글에 대해서 삭제 기능 테스트

## 2.15 게시물 삭제 기능 구현
### 2.15.1 게시물 삭제 기능 추가
#### src/pages/board/Detail.tsx 수정
- react query의 useMutation으로 게시물 삭제 이벤트 추가

  ```tsx
  import { deletePost, getPost } from "@/api/post";
  import CommentList from "@/pages/board/CommentList";
  import type { DeleteRes, ErrorRes, Post, PostInfoRes } from "@/types";
  import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
  import type { AxiosError } from "axios";
  import { Link, useNavigate, useParams } from "react-router";

  function Detail() {

    const { type, _id } = useParams();

    const { data: post, isError, error } = useSuspenseQuery<PostInfoRes, AxiosError<ErrorRes>, Post>({
      queryKey: ['posts', _id],
      queryFn: () => getPost(Number(_id)),
      select: (data) => data.item,
      staleTime: 1000*60,
    });

    if(isError) throw error;

    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { mutate } = useMutation<DeleteRes, AxiosError<ErrorRes>, void>({
      mutationFn: () => deletePost(Number(_id)),
      onSuccess: () => {
        alert('게시글이 삭제 되었습니다.');
        queryClient.invalidateQueries({ queryKey: ['posts', type] });
        navigate(`/${post.type}`);
      }
    });

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (confirm('삭제하시겠습니까?')) {
        mutate();
      }
    };

    return (
      ...
      <form onSubmit={ onSubmit }>
      ...
    );
  }

  export default Detail;
  ```

* 게시물 삭제 기능 테스트
  - 로그인 한 사용자가 작성한 게시글에 대해서 삭제 기능 테스트

## 2.16 Step 02 완료
* 완성된 코드 참고: https://github.com/FEBC-15/react/tree/main/workspace-ins/ch11-skeleton/lion-board-react-02

# 3 Step 03 - 전역 상태 관리
* 로그인과 JWT 토큰 관리
* 테마 적용

## 3.1 준비
### 3.1.1 프로젝트 생성
* workspace/ch11-skeleton 폴더에서 실행

  ```sh
  # lion-board-react-02 폴더를 복사해서 lion-board-react-03 폴더 생성
  cp -r lion-board-react-02 lion-board-react-03
  ```

* lion-board-react-03/src/components/layout/Header.tsx 파일 수정
  - `라이언 보드 v.02` -> `라이언 보드 v.03`

## 3.2 로그인과 JWT 토큰 관리
* 로그인 완료 후에 전달되는 토큰을 전역 상태관리로 저장
* 로그인 여부에 따른 조건부 렌더링
  - 환영 메시지 vs. 로그인 버튼
  - 내가 작성한 게시글만 수정, 삭제 버튼 노출
* Authorization 요청 헤더에 access token 추가

### 3.2.1 Zustand store 설정
* src/zustand/userStore.ts 생성
  ```ts
  import { create, type StateCreator } from "zustand";
  import { persist, createJSONStorage } from 'zustand/middleware';
  import { type User } from '../types/user';

  // 로그인한 사용자 정보를 관리하는 스토어의 상태 인터페이스
  interface UserStoreState {
    user: User | null;
    setUser: (user: User | null) => void;
    resetUser: () => void;
  }

  // 로그인한 사용자 정보를 관리하는 스토어 생성
  // StateCreator: Zustand의 유틸리티 타입으로, set 함수의 타입을 자동으로 추론해줌
  // 복잡한 타입 정의 없이도 set 함수가 올바른 타입으로 인식됨
  const UserStore: StateCreator<UserStoreState> = (set) => ({
    user: null,
    setUser: (user: User | null) => set({ user }),
    resetUser: () => set({ user: null }),
  });

  // 스토리지를 사용하지 않을 경우
  // const useUserStore = create<UserStoreState>(UserStore);

  // 스토리지를 사용할 경우 (sessionStorage에 저장)
  const useUserStore = create<UserStoreState>()(
    persist(UserStore, {
      name: 'userStore',
      storage: createJSONStorage(() => sessionStorage) // 기본은 localStorage
    })
  );

  export default useUserStore;
  ```

### 3.2.2 로그인 완료 후 토큰 저장
* src/pages/user/Login.tsx
  - Zustand store의 setUser 꺼내기
    ```tsx
    import useUserStore from "@/zustand/userStore";
    ...
    function Login() {
      const setUser = useUserStore(store => store.setUser);
      ...
    }
    
    ```

  - 로그인 성공 후 호출되는 onSuccess에서 setUser 호출
    ```tsx
    onSuccess: (data) => {
      const user = data.item;
      setUser({
        _id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
        token: user.token,
      });
      alert(data.item.name + '님, 로그인 되었습니다.');
      navigate(`/`);
    },
    ```

### 3.2.3 axios 요청 헤더에 Authorization 추가
* src/utils/axiosInstance.ts
  - axios 요청 인터셉터에 추가
    ```ts
    import useUserStore from "@/zustand/userStore";
    ...
    instance.interceptors.request.use((config) => {
      const user = useUserStore.getState().user;
      if(user){
        config.headers.Authorization = `Bearer ${ user.token?.accessToken }`;
      }
      ......
    });
    ```

### 3.2.4 로그인 된 사용자만 접근할 수 있는 페이지 설정
#### src/components/ProtectedRoute.tsx 작성
```tsx
import { Navigate, useLocation } from "react-router";
import useUserStore from "@/zustand/userStore";

// 로그인이 필요한 페이지를 보호하는 컴포넌트
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useUserStore();
  const location = useLocation();

  // 로그인하지 않은 경우 로그인 페이지로 리다이렉트
  if (!user) {
    // 현재 경로를 state로 전달하여 로그인 후 돌아올 수 있도록 함
    return <Navigate to="/user/login" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
```

#### src/routes.tsx 수정
* `<New>`, `<Edit>` 컴포넌트에 `<ProtectedRoute>` 적용
  ```tsx
  ...
  { 
    path: ":type/new", 
    element: (
      <ProtectedRoute>
        <New />
      </ProtectedRoute>
    )
  },
  ...
  { 
    path: ":type/:_id/edit", 
    element: (
      <ProtectedRoute>
        <Edit />
      </ProtectedRoute>
    )
  },
  ...
  ```

#### 로그인 후 페이지 이동
* 로그인 후에 이전 페이지로 이동하도록 구현
* src/pages/user/Login.tsx
  ```tsx
  const location = useLocation();
  const { mutate } = useMutation<UserCreateRes, AxiosError<ErrorRes>, FormData>({
    ...
    onSuccess: (data) => {
      ...
      alert(data.item.name + '님, 로그인 되었습니다.');
      navigate(location.state?.from || `/`, { replace: true });
    },
    ...
  });
  ```

### 3.2.5 로그인 상태에 따른 조건부 렌더링
* 로그인된 사용자에게는 사용자 정보를 보여주고 로그인되지 않은 사용자에게는 로그인 버튼과 회원가입 버튼을 보여줌

#### src/components/layout/Header.tsx
- user 꺼내기
  ```ts
  import useUserStore from "@/zustand/userStore";
  ...
  function Header() {
    const { user } = useUserStore();
    ......
  }
  ```

- 조건부 렌더링
  ```tsx
  { user ? (
    <form action="/">
      <p className="flex items-center">
        <img 
          className="w-8 rounded-full mr-2" 
          src={ user.image || '/images/favicon.svg' }
          alt={`${ user.name } 프로필 이미지`} />
        { user.name }님
        <button type="submit" className="bg-gray-900 py-1 px-2 text-sm text-white font-semibold ml-2 hover:bg-amber-400 rounded">로그아웃</button>
      </p>
    </form>
  ) : (
    <div className="flex justify-end">
      <Link to="/user/login" className="bg-orange-500 py-1 px-2 text-sm text-white font-semibold ml-2 hover:bg-amber-400 rounded">로그인</Link>
      <Link to="/user/signup" className="bg-gray-900 py-1 px-2 text-sm text-white font-semibold ml-2 hover:bg-amber-400 rounded">회원가입</Link>
    </div>
  ) }
  ```

- 로그아웃 기능 추가
  ```tsx
  function Header() {
    const { user, resetUser } = useUserStore();
    const handleLogout = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      resetUser();
    };
  }
  ```

- form에 submit 이벤트 추가
  ```tsx
  <form onSubmit={ handleLogout }>
  ```

#### src/pages/board/List.tsx
- 로그인 된 사용자만 게시글 작성이 가능하도록 `글작성` 버튼 조건부 렌더링
  ```tsx
  import useUserStore from "@/zustand/userStore";
  ...
  function List() {
    const { user } = useUserStore();
    ...
  }
  ```

  ```tsx
  { user && 
    <Link to={`/${type}/new`} className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded">글작성</Link>
  }
  ```

#### src/pages/board/Detail.tsx
- 본인의 글에 대해서 수정, 삭제 버튼 노출
  ```tsx
  import useUserStore from "@/zustand/userStore";
  ...
  function Detail() {
    const { user } = useUserStore();
    ......
  }
  ```

  ```tsx
  { user && user?._id === post.user._id && (
    <>
      <Link to={`/${post.type}/${_id}/edit`} className="bg-gray-900 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded">수정</Link>
      <button type="submit" className="bg-red-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded">삭제</button>
    </>
  ) }
  ```

- 테스트
  - 내가 작성한 글 상세조회 화면에서 로그아웃하면 zustand 스토어의 user가 초기화 되고, 스토어를 구독중인 상세보기 화면이 리렌더링 되므로 수정, 삭제 버튼도 동시에 사라짐

#### src/pages/board/CommentListItem.tsx
- 로그인 한 사용자에게만 자신의 댓글 삭제 버튼 추가
  ```tsx
  import useUserStore from "@/zustand/userStore";
  ...
  function CommentListItem() {
    const { user } = useUserStore();
    ......
  }
  ```

  ```tsx
  { user && user?._id === reply.user._id && (
    <form onSubmit={ onSubmit } className="inline ml-2">
      <button type="submit" className="bg-red-500 py-1 px-2 text-sm text-white font-semibold ml-2 hover:bg-amber-400 rounded">삭제</button>
    </form>
  ) }
  ```

### 3.2.6 access token 만료시 처리
* access token이 만료되면 refresh token을 이용해서 access token을 재발급

#### axios 인터셉터 설정
* src/utils/axiosInstance.ts
  ```tsx
  import useUserStore from "@/zustand/userStore";
  import axios from "axios";
  import router from "@/routes";

  // API 서버 주소
  const API_SERVER = 'https://fesp-api.koyeb.app/market';
  // access token 재발급 URL
  const REFRESH_URL = '/auth/refresh';

  // Axios 인스턴스 생성 함수
  export function getAxiosInstance() {
    const instance = axios.create({
      baseURL: API_SERVER,
      timeout: 1000*15,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Client-Id': 'openmarket',
      }
    });

    // 요청 인터셉터 추가
    instance.interceptors.request.use((config) => {
      const { user } = useUserStore.getState();
      if(user && config.url !== REFRESH_URL){
        config.headers.Authorization = `Bearer ${ user.token?.accessToken }`;
      }
      config.params = {
        // delay: 500,
        ...config.params,
      };
      return config;
    }, (error) => {
      return Promise.reject(error);
    });

    // 응답 인터셉터 추가
    instance.interceptors.response.use((response) => {
      return response;
    }, async (error) => {
      console.error('에러 응답 인터셉터 호출', error);

      const { user, setUser } = useUserStore.getState();
      const { config, response } = error;

      if(response?.status === 401){ // 인증 실패
        if(config.url === REFRESH_URL){ // refresh token도 만료된 경우 로그인 페이지로
          navigateLogin();
        }else if(user){ // 로그인 했으나 access token이 만료된 경우 access token과 refresh token 재발급
          // refresh 토큰으로 access token과 refresh token 재발급 요청
          const { data: { accessToken, refreshToken } } = await instance.get(REFRESH_URL, {
            headers: {
              Authorization: `Bearer ${user.token?.refreshToken}`
            }
          });
          setUser({ ...user, token: { accessToken, refreshToken } });
          // 갱신된 accessToken으로 실패했던 요청을 다시 시도
          config.headers.Authorization = `Bearer ${ accessToken }`;        
          return axios(config);
        }else{ // 로그인 안한 경우
          navigateLogin();
        }
      }

      return Promise.reject(error);
    });

    function navigateLogin(){
      const gotoLogin = confirm('로그인 후 이용 가능합니다.\n로그인 페이지로 이동하시겠습니까?');
      if(gotoLogin){
        // state로 로그인 후에 돌아올 페이지 전달
        router.navigate('/users/login', { state: { from: router.state.location.pathname } });
      }
    }

    return instance;
  }
  ```

## 3.3 다크 모드 적용
### 3.3.1 Zustand store 설정
#### src/zustand/themeStore.ts 생성
```ts
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
```

### 3.3.2 ThemeButton 컴포넌트 작성
#### src/components/ui/ThemeButton.tsx 작성
- Header.tsx 에서 `<button>` 코드 복사
- 현재 설정된 모드에 따라 sun, moon 이미지 hidden
- onClick 이벤트 추가
  ```tsx
  import useThemeStore from "@/zustand/themeStore";

  function ThemeButton() {
    const { isDarkMode, toggleTheme } = useThemeStore();

    const sun = isDarkMode ? '' : 'hidden';
    const moon = isDarkMode ? 'hidden' : '';

    return (
      <button
        type="button"
        data-toggle-dark="dark"
        onClick={ toggleTheme }
        className="ml-4 flex items-center w-8 h-8 justify-center text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg toggle-dark-state-example hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 dark:bg-gray-800 focus:outline-none dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        <svg
          data-toggle-icon="moon"
          className={`w-3.5 h-3.5 ${moon}`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 18 20"
        >
          <path d="M17.8 13.75a1 1 0 0 0-.859-.5A7.488 7.488 0 0 1 10.52 2a1 1 0 0 0 0-.969A1.035 1.035 0 0 0 9.687.5h-.113a9.5 9.5 0 1 0 8.222 14.247 1 1 0 0 0 .004-.997Z"></path>
        </svg>
        <svg
          data-toggle-icon="sun"
          className={`w-3.5 h-3.5 ${sun}`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-11a1 1 0 0 0 1-1V1a1 1 0 0 0-2 0v2a1 1 0 0 0 1 1Zm0 12a1 1 0 0 0-1 1v2a1 1 0 1 0 2 0v-2a1 1 0 0 0-1-1ZM4.343 5.757a1 1 0 0 0 1.414-1.414L4.343 2.929a1 1 0 0 0-1.414 1.414l1.414 1.414Zm11.314 8.486a1 1 0 0 0-1.414 1.414l1.414 1.414a1 1 0 0 0 1.414-1.414l-1.414-1.414ZM4 10a1 1 0 0 0-1-1H1a1 1 0 0 0 0 2h2a1 1 0 0 0 1-1Zm15-1h-2a1 1 0 1 0 0 2h2a1 1 0 0 0 0-2ZM4.343 14.243l-1.414 1.414a1 1 0 1 0 1.414 1.414l1.414-1.414a1 1 0 0 0-1.414-1.414ZM14.95 6.05a1 1 0 0 0 .707-.293l1.414-1.414a1 1 0 1 0-1.414-1.414l-1.414 1.414a1 1 0 0 0 .707 1.707Z"></path>
        </svg>
        <span className="sr-only">Toggle dark/light mode</span>
      </button>
    );
  }

  export default ThemeButton;
  ```

#### Header.tsx
- `<ThemeButton>` 적용
  ```tsx
  import ThemeButton from "@/components/ui/ThemeButton";
  ...
  <header>
    <nav>      
      ......
      <div>
        { user ? (
          ......
        ) : (
          ......
        ) }

        <ThemeButton />

      </div>
    </nav>
  </header>
  ```

### 3.3.3 Tailwind CSS에 적용
* 참고: https://tailwindcss.com/docs/dark-mode
* 클래스명에 접두사로 `dark:`를 붙이면 다크 모드에서 적용되는 스타일을 지정할 수 있음
* 예시
  ```tsx
  <header className="px-8 min-w-80 bg-slate-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200 transition-color duration-500 ease-in-out">
  ```

#### Tailwind CSS의 다크 모드 전략

##### media 전략
- 기본값
- CSS 미디어 기능 `prefers-color-scheme`를 이용해서 운영체제 설정을 따름

##### selector 전략
- 운영체제 설정에 의존하지 않고 수동으로 다크 모드 전환
- src/index.css에 추가
  ```ts
  ...
  @custom-variant dark (&:where(.dark, .dark *));
  ```

  - `dark` 클래스가 적용되어 있는 요소와 그 하위 요소에는 일반 클래스 대신 `dark:` 접두사가 붙어있는 클래스가 적용됨
    - `<header>` 예시
      + `bg-slate-100` 대신 `dark:bg-gray-600` 적용
      + `text-gray-800` 대신 `dark:text-gray-200` 적용

### 3.3.4 루트 엘리먼트에 dark 클래스 설정
#### src/App.tsx
```tsx
import useThemeStore from '@/zustand/themeStore';
import { useEffect } from 'react';
...
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
  ......
}
```

## 3.4 Step 03 완료
* 완성된 코드 참고: https://github.com/FEBC-15/react/tree/main/workspace-ins/ch11-skeleton/lion-board-react-03

# 4 Step 04 - 배포 및 최적화
* 배포
* 최적화
  - SEO
  - 사용자 경험(UX) 최적화
    + Lazy loading
    + 로딩중 상태 표시(`<Suspense>` 사용)
    + alert 대신 toast 사용
    + NavLink 사용
    + 에러 처리

## 4.1 준비
### 4.1.1 프로젝트 생성
* workspace/ch11-skeleton 폴더에서 실행

  ```sh
  # lion-board-react-03 폴더를 복사해서 lion-board-react-04 폴더 생성
  cp -r lion-board-react-03 lion-board-react-04
  ```

* lion-board-react-04/src/components/layout/Header.tsx 파일 수정
  - `라이언 보드 v.04` -> `라이언 보드 v.04`

## 4.2 배포 준비

### 4.2.1 배포전 테스트
```sh
npm run build
npm run preview
```

### 4.2.2 .env
* Vite 환경 변수와 모드: <https://ko.vitejs.dev/guide/env-and-mode.html>
* dotenv: DB 접속 정보, API KEY 등의 환경설정 정보를 코드에 직접 작성하지 않고 외부 파일로 만들어서 관리하기 위해 사용하는 nodejs 패키지
  - 참고: <https://github.com/motdotla/dotenv>
* 개발, 테스트, 운영 등의 여러 환경에서 각각 다른 값을 사용해야 하는 경우 각 환경 설정 정보를 가진 파일을 따로 작성해서 적용 가능
* `.env` 파일에 추가한 환경 설정 값은 OS의 환경변수로 추가됨

#### 설치
```sh
npm i dotenv
```
* Vite로 프로젝트를 생성했을 경우 따로 설치할 필요 없음
  - 현재 프로젝트는 Vite 기반이기 때문에 설치할 필요 없음

#### 환경 설정 파일
* 프로젝트 루트에 .env 파일 생성
  - Vite로 포로젝트를 생성했을 경우 환경변수는 반드시 VITE_ 접두사로 시작해야 함
* 예시
  ```
  VITE_API_SERVER=https://fesp-api.koyeb.app/market
  VITE_KAKAO_MAP_API_KEY=acd4396a562ece1a9a522481df8561c5
  VITE_KAKAO_LOGIN_KEY=cbaac2342342342348749845670acbb
  ```

* .env 파일을 수정한 후에는 서버 재시작 필요
* 외부에 노출되면 안되는 중요한 정보를 담고 있을 경우 github의 공개 프로젝트라면 .gitignore에 추가해서 커밋되지 않도록 지정
  ```
  *.env*
  ```

* 이미 .env 파일이 git에서 추적중인 상태라서 추가한 ignore가 적용 안되다면 캐시 삭제
  - 기존의 모든 변경사항은 커밋 후 다음 명령 실행
    ```sh
    git rm -r --cached .
    git add .
    git commit -m "gitignore 다시 적용"
    ```

#### 컴포넌트에서 사용(*.js, *.jsx, *.ts, *.tsx)
* Vite 프로젝트는 import.meta.env 변수를 통해서 사용
* src/utils/axiosInstance.ts 파일 수정
```ts
const API_SERVER = import.meta.env.VITE_API_SERVER;
```

#### HTML에서 사용(*.html)
* %% 사이에 환경변수 지정
* 예시
```html
<script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=%VITE_KAKAO_MAP_API_KEY%"></script>
```

#### 환경별 파일 분리
* Vite로 프로젝트를 생성했을 경우 vite 실행 명령에 따라서 각 환경에 맞는 .env 파일이 추가적으로 적용됨
  - `npm run dev`
    + `.env.development` 설정이 추가 적용
  - `npm run build`
    + `.env.production` 설정이 추가 적용
* 다른 `.env` 파일과 중복된 환경변수가 있을 경우 이전 환경변수 값을 재정의함

##### 모든 환경
* `.env` 파일
  - 모든 환경에서 적용되는 기본 설정 파일

##### 개발 환경
* `.env.development` 파일
  - .env 파일의 환경변수를 재정의
  - npm run dev로 개발 서버 구동시 적용

##### 운영 환경
* `.env.production` 파일
  - .env 파일의 환경변수를 재정의
  - npm run build로 번들링 할때 적용

##### 로컬 환경(개발자 PC)
* 개발서버, 테스트서버, 운영서버에는 만들 필요 없고 개발자 개인 PC에만 만들어서 적용시키는 파일
* 로컬에 DB나 API 서버등을 직접 구축해서 사용할 경우에 필요
* `.env.local`
  - 로컬에 개발, 운영 환경이 구분없이 구축되어 있거나 두 환경에서 공통으로 사용할 환경 변수 정의
  - `.env`, `.env.development`, `.env.production` 파일의 환경변수를 재정의
* `.env.development.local`
  - 로컬에 개발, 운영 환경을 분리해서 구축했을 경우 로컬 개발 환경에서 사용
  - `.env`, `.env.development`, `.env.local` 파일의 환경변수를 재정의
* `.env.production.local`
  - 로컬에 개발, 운영 환경을 분리해서 구축했을 경우 로컬 운영 환경에서 사용
  - `.env`, `.env.production`, `.env.local` 파일의 환경변수를 재정의

#### `.env` 파일 적용 우선순위
* `.env` 파일이 적용되는 순서
* 좌측에서 우측으로 파일이 로딩되며 우측 파일에 좌측 파일과 같은 변수가 있으면 덮어씀

##### `npm run dev`
* `.env` -> `.env.development` -> `.env.local` -> `.env.development.local`

##### `npm run build`
* `.env` -> `.env.production` -> `.env.local` -> `.env.production.local`

## 4.3 배포
* Netlify에 배포
* https://netlify.com

### 4.3.1 netlify 설정 파일 추가
- 프로젝트 루트에 `netlify.toml` 파일 생성(들여쓰기는 반드시 스페이스 2개를 이용)
- fallback url 추가: 클라이언트의 모든 url 요청에 index.html 응답 하도록 설정

  ```yaml
  [[redirects]]
    from = "/*"
    to = "/index.html"
    status = 200
  ```

* `.env` 파일을 `.gitignore`에 추가했다면 git 추적에서 제외되므로 Netlify에 등록한 github 레포지토리에 존재하지 않기 때문에 환경 변수를 수동으로 등록해야 함
  - 배포 설정에서 등록 가능

### 4.3.2 배포
* Netlify 접속
  - https://netlify.com

* 로그인
* Add new Project > Import an existing project > GitHub
* `react` 레포지토리 선택
  - react 레포지토리가 보이지 않는다면 Configure the Netlify app onGitHub 링크를 선택해서 레포지토리 추가
  - Project name: url로 사용될 이름 지정(예시, `lion-board-react`)
  - Base directory: `workspace/ch11-skeleton/lion-board-react-04`
  - Build command: `npm run build`
  - Publish directory: `workspace/ch11-skeleton/lion-board-react-04/dist`
  - Environment variable > Add environment variables > Import environment variables
    + .env 파일 내용 전체를 복사해서 붙여넣기
    + `VITE_API_SERVER=https://fesp-api.koyeb.app/market`
  - Deploy `xxx` 버튼 클릭

## 4.4 최적화

### 4.4.1 SEO(Search Engine Optimization)
#### 메타 데이터 추가
* index.html에 메타 데이터 추가
* SPA는 하나의 html 페이지를 사용하므로 각 페이지별로 메타 데이터가 따로 적용되지 않고 모든 페이지에 일괄 적용됨
  ```html
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/x-icon" href="/images/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>멋쟁이 사자처럼 게시판 - 라이언 보드</title>

    <!-- 기본 meta 태그 -->
    <meta name="description" content="다양한 주제의 커뮤니티와 활발한 소통을 위한 플랫폼입니다. 관심사에 따라 참여하고, 의견을 나누세요." />
    <meta name="keywords" content="커뮤니티, 소통, 포럼, 관심사, 온라인 모임, 커뮤니티 서비스" />
    <meta name="author" content="Front End Boot Camp" />

    <!-- Open Graph meta 태그 (소셜 미디어용) -->
    <meta property="og:title" content="라이언 보드에 오신걸 환영합니다." />
    <meta property="og:description" content="유용한 정보를 나누고 공유하세요." />
    <meta property="og:image" content="/images/front-end.png" />
    <meta property="og:url" content="https://lion-board-react.netlify.app" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="라이언 보드" />
  </head>
  ```

### 4.4.2 사용자 경험(UX) 최적화
#### 레이지 로딩
* 참고: https://github.com/FEBC-15/react/tree/main/workspace-ins/ch05-router#7-레이지-로딩-lazy-loading

* routes.tsx

  - 변경전
    ```tsx
    import ProtectedRoute from "@/components/ProtectedRoute";
    import { createBrowserRouter } from "react-router";

    import Layout from "@/components/layout";
    import Detail from "@/pages/board/Detail";
    import Edit from "@/pages/board/Edit";
    import List from "@/pages/board/List";
    import New from "@/pages/board/New";
    import ErrorPage from "@/pages/ErrorPage";
    import MainPage from "@/pages/index";
    import Login from "@/pages/user/Login";
    import Signup from "@/pages/user/Signup";
    ```

  - 변경후
    ```tsx
    import ProtectedRoute from "@/components/ProtectedRoute";
    import { createBrowserRouter } from "react-router";
    import { lazy } from 'react';

    const Layout = lazy(() => import('@/components/layout'));
    const Detail = lazy(() => import('@/pages/board/Detail'));
    const Edit = lazy(() => import('@/pages/board/Edit'));
    const List = lazy(() => import('@/pages/board/List'));
    const New = lazy(() => import('@/pages/board/New'));
    const ErrorPage = lazy(() => import('@/pages/ErrorPage'));
    const MainPage = lazy(() => import('@/pages/index'));
    const Login = lazy(() => import('@/pages/user/Login'));
    const Signup = lazy(() => import('@/pages/user/Signup'));
    ```

  ```tsx
  ...
  import { lazy } from 'react';

  const Layout = lazy(() => import('@components/layout'));
  const Detail = lazy(() => import('@pages/board/Detail'));
  const Edit = lazy(() => import('@pages/board/Edit'));
  const List = lazy(() => import('@pages/board/List'));
  const New = lazy(() => import('@pages/board/New'));
  const ErrorPage = lazy(() => import('@pages/ErrorPage'));
  const MainPage = lazy(() => import('@pages/index'));
  const Login = lazy(() => import('@pages/user/Login'));
  const Signup = lazy(() => import('@pages/user/Signup'));
  ```

#### 로딩중 상태 표시
##### Spinner 컴포넌트 제작
* components/ui/Spinner.tsx 작성
  ```tsx
  import { HashLoader, ScaleLoader, SkewLoader } from "react-spinners";

  const Spinner = {
    FullScreen(){
      return (
        <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-700 dark:text-gray-200">
          <div className="flex flex-col items-center">
            <h3 className="mb-4 text-lg font-semibold">잠시만 기다려주세요.</h3>
            <HashLoader
              color="#f58714"
              size={60}
            />
          </div>
        </div>
      );
    },
    WithHeader(){
      const screenHeight = window.innerHeight; // 현재 브라우저 창의 높이
      const headerHeight = 68;
      const footerHeight = 68;
      const spinnerHeight = screenHeight - headerHeight - footerHeight; // 스피너 영역의 높이 계산

      return (
        <div className="flex items-center justify-center" style={{ height: spinnerHeight }}>
          <div className="text-center">
            <h3 className="mb-4 text-lg font-semibold">잠시만 기다려주세요.</h3>
            <SkewLoader color="#F97316" />
          </div>
        </div>
      );    
    },
    TargetArea(){
      return (
        <div className="flex justify-center">
          <ScaleLoader color="#F97316"/>
        </div>
      );
    }
  };

  export default Spinner;
  ```

##### Suspense 컴포넌트 사용
* 참고: <https://github.com/FEBC-15/react/tree/main/workspace-ins/ch09-ajax#83-render-as-you-fetch>
* App.tsx
  ```tsx
  ...
  import { Suspense } from "react";
  import Spinner from '@/components/ui/Spinner';
  
  function App() {
    ...    
    return (
      <Suspense fallback={ <Spinner.FullScreen /> }>
        <RouterProvider router={ router } />
      </Suspense>
    );
  }
  ```

#### alert 대신 toast 사용

##### toast 설정
* react-toastify 사용
* App.tsx에 `<ToastContainer>` 추가
  ```tsx
  ...
  import { Slide, ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  ......
  function App() {
    ...    
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
  ```

##### toast 사용 예시
* Detail.tsx
  ```tsx
  import { toast } from 'react-toastify';
  ....
  const { mutate } = useMutation<DeleteRes, AxiosError<ErrorRes>, void>({
    mutationFn: () => deletePost(Number(_id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts', type] });
      toast.success('삭제되었습니다.', {
        onClose: () => navigate(`/${post.type}`)
      });
    }
  });
  ```

#### NavLink 사용
* 참고: <https://github.com/FEBC-15/react/tree/main/workspace-ins/ch05-router#42-navlink>
* Header.tsx의 Link를 NavLink로 교체
  ```tsx
  <NavLink className={ ({ isActive }) => isActive ? 'text-amber-500 font-semibold' : '' } to="/info">정보공유</NavLink>
  <NavLink className={ ({ isActive }) => isActive ? 'text-amber-500 font-semibold' : '' } to="/free">자유게시판</NavLink>
  <NavLink className={ ({ isActive }) => isActive ? 'text-amber-500 font-semibold' : '' } to="/qna">질문게시판</NavLink>
  ```

#### 에러 처리
* 참고: <https://github.com/FEBC-15/react/tree/main/workspace-ins/ch05-router#542-에러-처리-전용-라우트>
* 참고: <https://github.com/FEBC-15/react/tree/main/workspace-ins/ch05-router#61-userouteerror>

* 컴포넌트에서 try~catch로 에러를 따로 처리하지 않을 경우 `<ErrorPage>`를 보여줌

##### ErrorPage.tsx
```tsx
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { isRouteErrorResponse, Link, useRouteError } from "react-router";

function ErrorPage() {
  const err = useRouteError();
  let message = '예상하지 못한 에러가 발생했습니다.';

  if (isRouteErrorResponse(err) && err.status === 404) {
    message = '존재하지 않는 페이지입니다.';
  }
  
  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-700 dark:text-gray-200 transition-color duration-500 ease-in-out">
      <Header />
      <main className="flex-1 py-20 bg-red-100 border border-red-400 text-red-700 p-4 rounded-lg flex flex-col items-center space-y-2">
        <h2 className="text-xl font-semibold mb-2 text-center">🚧 앗, 무언가 잘못됐네요!</h2>
        <h3 className="text-md font-semibold mb-2 text-center">{ message }</h3>
        <Link to="/" className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600">
          ⚙️ 홈으로 이동
        </Link>
      </main>
      <Footer />
    </div>
  );
}

export default ErrorPage;
```

##### 에러 테스트
* http://localhost:5173/a/b/c 접속해서 404 에러 확인

## 4.5 Step 04 완료
* 완성된 코드 참고: https://github.com/FEBC-15/react/tree/main/workspace-ins/ch11-skeleton/lion-board-react-04

* 완성본 배포 주소: <https://lion-board-react.netlify.app>