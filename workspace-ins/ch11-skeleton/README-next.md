# 11장 게시판 앱 개발(Next.js)
* TypeScript
* Next.js
* create-next-app
* [React 버전 보기](./README-react.md)

## 목차
- [0 개발 준비](#0-개발-준비)
  - [0.1 샘플 코드 테스트](#01-샘플-코드-테스트)
  - [0.2 프로젝트 생성](#02-프로젝트-생성)
  - [0.3 불필요한 파일 정리](#03-불필요한-파일-정리)
  - [0.4 샘플 복사](#04-샘플-복사)
  - [0.5 개발 서버 구동](#05-개발-서버-구동)
- [1 Step 01 - html 파일을 리액트 컴포넌트로 변환](#1-step-01---html-파일을-리액트-컴포넌트로-변환)
  - [1.1 Root Layout, Root Page 개발](#11-root-layout-root-page-개발)
  - [1.2 나머지 Page 컴포넌트 작성](#12-나머지-page-컴포넌트-작성)
  - [1.3 컴포넌트 분리](#13-컴포넌트-분리)
  - [1.4 Step 01 완료](#14-step-01-완료)
- [2 Step 02 - 라우트 정의](#2-step-02---라우트-정의)
  - [2.1 동적 라우트 정의](#21-동적-라우트-정의)
  - [2.2 라우트 그룹 정의](#22-라우트-그룹-정의)
  - [2.3 메타 데이터 추가](#23-메타-데이터-추가)
  - [2.4 라우팅용 특수 파일 작성](#24-라우팅용-특수-파일-작성)
  - [2.5 프로젝트 폴더 전체 구조](#25-프로젝트-폴더-전체-구조)
  - [2.6 Step 02 완료](#26-step-02-완료)
- [3 Step 03 - 주요 기능 구현(API 서버 연동)](#3-step-03---주요-기능-구현api-서버-연동)
  - [3.1 type 정의](#31-type-정의)
  - [3.2 환경 변수 정의](#32-환경-변수-정의)
  - [3.3 API 호출 함수 정의](#33-api-호출-함수-정의)
  - [3.4 서버 액션 정의](#34-서버-액션-정의)
  - [3.5 게시물 목록 화면](#35-게시물-목록-화면)
  - [3.6 게시물 등록 화면](#36-게시물-등록-화면)
  - [3.7 게시물 상세 화면](#37-게시물-상세-화면)
  - [3.8 회원 가입 화면](#38-회원-가입-화면)
  - [3.9 로그인 화면](#39-로그인-화면)
  - [3.10 로그인 상태 유지](#310-로그인-상태-유지)

# 0 개발 준비

## 0.1 샘플 코드 테스트
### 0.1.1 샘플 코드 복사
* 레포지토리 루트 폴더(react)에서 실행
  ```sh
  cp -r sample/11/workspace/ch11-skeleton/lion-board-template workspace/ch11-skeleton/lion-board-template-next
  ```

### 0.1.2 샘플 코드 실행
* 레포지토리 루트 폴더(React)에서 실행
  ```sh
  cd workspace/ch11-skeleton
  npx live-server lion-board-template-next
  ```

### 0.1.3 접속 테스트
* http://127.0.0.1:8080

## 0.2 프로젝트 생성
* 참고: https://github.com/FEBC-15/react/tree/main/workspace-ins/ch10-nextjs#221-create-next-app
* workspace/ch11-skeleton 폴더에서 다음 명령 실행
  ```sh
  npx create-next-app@latest lion-board-next-01

  Need to install the following packages:
  create-next-app@16.1.1
  Ok to proceed? (y) __✅y__

  √ Would you like to use the recommended Next.js defaults? » Yes, use recommended defaults 
  ```

## 0.3 기본으로 생성된 파일 정리
* ch11-skeleton/lion-board-next-01/app 하위 파일 정리
  - favicon.ico 삭제
  - layout.tsx 삭제
  - page.tsx 삭제
  - global.css 파일 내용 수정
  ```css
  @import 'tailwindcss';

  @layer base {
    button {
      cursor: pointer;
    }
  }
  ```
  
* ch11-skeleton/lion-board-next-01/public 하위 파일 전체 삭제

## 0.4 샘플 복사
* workspace/ch11-skeleton에서 실행
  ```sh
  cp -r lion-board-template-next/* lion-board-next-01/app
  mv lion-board-next-01/app/images lion-board-next-01/public
  ```

## 0.5 개발 서버 구동
* workspace/ch11-skeleton/lion-board-next-01에서 실행
  ```sh
  npm run dev
  ```

* 개발 서버 구동 시 다음과 같은 에러가 발생할 경우 프로젝트 루트의 `next.config.ts` 파일 수정
```sh
⚠ Warning: Next.js inferred your workspace root, but it may not be correct.
We detected multiple lockfiles and selected the directory of ...
...
```

* next.config.ts

  ```ts
  import type { NextConfig } from "next";

  const nextConfig: NextConfig = {
    turbopack: {
      root: __dirname,
    },
  };

  export default nextConfig;
  ```

# 1 Step 01 - html 파일을 리액트 컴포넌트로 변환
* HTML 코드를 기반으로 리액트 컴포넌트 생성
* Next.js의 App 라우터 적용
* 작업 폴더: workspace/ch11-skeleton/lion-board-next-01

## 1.1 Root Layout, Root Page 개발
### 1.1.1 Root Layout 컴포넌트 작성
* app/index.html 파일명을 layout.tsx로 수정후 RootLayout 작성
  ```tsx
  import './globals.css';
  import Link from "next/link";
  import Image from "next/image";

  export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="ko">
      ...
      </html>
    );
  }
  ```

* `<script src="https://cdn.tailwindcss.com"></script>` 제거

* JSX 문법에 맞춰서 수정
  - `charset` -> `charSet`
  - `class` -> `className`

* Next.js 컴포넌트로 교체
  - `<a>` -> `<Link>`
  - `<img> ` -> `<Image>`

* 외부 이미지 로딩시 next.config.ts 설정 추가
  ```ts
  import type { NextConfig } from "next";

  const nextConfig: NextConfig = {
    ...
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
          // port: '',
          // pathname: '/market/files/**',
        },
      ],
    },
  };

  export default nextConfig;
  ```

* `<header>` 영역의 타이틀 수정
  - `라이언 보드` -> `라이언 보드 v.01`

* 브라우저 테스트
  - http://localhost:3000

### 1.1.2 Root Page 컴포넌트 작성
* app/page.tsx 생성 후 RootPage 작성
  - layout.tsx의 `<main>` 영역을 잘라서 page.tsx로 이동
  - layout.tsx의 잘라낸 자리에는 `{ children }` 작성

  ```tsx
  import Link from "next/link";

  export default async function RootPage() {
    return (
      <main>
      ...
      </main>
    );
  }
  ```

* 브라우저 테스트
  - http://localhost:3000

## 1.2 나머지 Page 컴포넌트 작성
* 각 폴더의 `index.html`을 `page.tsx`로 수정후 각 페이지별 컴포넌트 작성
  - 기존 html 파일의 `<main>` 부분만 컴포넌트의 리턴값으로 추가
  - JSX 문법에 맞춰서 수정

### 1.2.1 게시글 목록 조회
* 파일명 수정
  - info/index.html -> info/page.tsx

* html 코드의 `<main>` 영역을 잘라서 ListPage의 리턴값으로 사용하고 남은 html 코드는 삭제
  ```tsx
  import Link from "next/link";

  export default async function ListPage() {
    return (
      <main>
      ...
      </main>
    );
  }
  ```

* JSX 문법에 맞춰서 수정
  - `class` -> `className`

* Next.js 컴포넌트로 교체
  - `<a>` -> `<Link>`

* 테스트
  - http://localhost:3000/info

### 1.2.2 게시글 상세 조회
* 파일명 수정
  - info/1/index.html -> info/1/page.tsx

* html 코드의 `<main>` 영역을 잘라서 InfoPage의 리턴값으로 사용하고 남은 html 코드는 삭제
  ```tsx
  import Link from "next/link";
  import Image from "next/image";

  export default async function InfoPage() {
    return (
      <main>
      ...
      </main>
    );
  }
  ```

* JSX 문법에 맞춰서 수정
  - `class` -> `className`
  - `datetime` -> `dateTime`
  - `rows="3"` -> `rows={3}`
  - `cols="40"` -> `cols={40}`

* Next.js 컴포넌트로 교체
  - `<a>` -> `<Link>`
  - `<img>` -> `<Image>`
    + `width="32"` 추가
    * `height="32"` 추가

* 테스트
  - http://localhost:3000/info/1

### 1.2.3 게시글 수정
* 파일명 수정
  - info/1/edit/index.html -> info/1/edit/page.tsx

* html 코드의 `<main>` 영역을 잘라서 EditPage의 리턴값으로 사용하고 남은 html 코드는 삭제
  ```tsx
  import Link from "next/link";

  export default async function EditPage() {
    return (
      <main>
      ...
      </main>
    );
  }
  ```

* JSX 문법에 맞춰서 수정
  - `class` -> `className`
  - `rows="15"` -> `rows={15}`
  - `value="리액트란?"` -> `defaultValue="리액트란?"`
  - `<textarea>React는 ...</textarea>` -> `<textarea defaultValue="React는 ..." />`

* Next.js 컴포넌트로 교체
  - `<a>` -> `<Link>`

* 테스트
  - http://localhost:3000/info/1/edit

### 1.2.4 게시글 작성
* 파일명 수정
  - info/new/index.html -> info/new/page.tsx

* html 코드의 `<main>` 영역을 잘라서 NewPage의 리턴값으로 사용하고 남은 html 코드는 삭제
  ```tsx
  import Link from "next/link";

  export default async function NewPage() {
    return (
      <main>
      ...
      </main>
    );
  }
  ```

* JSX 문법에 맞춰서 수정
  - `class` -> `className`
  - `for` -> `htmlFor`
  - `rows="15"` -> `rows={15}`
  
* Next.js 컴포넌트로 교체
  - `<a>` -> `<Link>`

* 테스트
  - http://localhost:3000/info/new

### 1.2.5 로그인
* 파일명 수정
  - user/login/index.html -> user/login/page.tsx

* html 코드의 `<main>` 영역을 잘라서 LoginPage의 리턴값으로 사용하고 남은 html 코드는 삭제
  ```tsx
  import Link from "next/link";

  export default async function LoginPage() {
    return (
      <main>
      ...
      </main>
    );
  }
  ```

* JSX 문법에 맞춰서 수정
  - `class` -> `className`
  - `for` -> `htmlFor`
  
* Next.js 컴포넌트로 교체
  - `<a>` -> `<Link>`

* 테스트
  - http://localhost:3000/user/login

### 1.2.6 회원가입
* 파일명 수정
  - user/signup/index.html -> user/signup/page.tsx

* html 코드의 `<main>` 영역을 잘라서 SignupPage의 리턴값으로 사용하고 남은 html 코드는 삭제
  ```tsx
  import Link from "next/link";

  export default async function SignupPage() {
    return (
      <main>
      ...
      </main>
    );
  }
  ```

* JSX 문법에 맞춰서 수정
  - `class` -> `className`
  - `for` -> `htmlFor`
  
* Next.js 컴포넌트로 교체
  - `<a>` -> `<Link>`

* 테스트
  - http://localhost:3000/user/signup

## 1.3 컴포넌트 분리
* components/common 폴더 생성

### 1.3.1 헤더 분리
* components/common/Header.tsx 생성
* app/layout.tsx의 `<header>...</header>` 태그 복사해서 추가하고 기존 `<header>...</header>` 영역은 `<Header />` 로 교체

#### Header.tsx
```tsx
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="px-8 min-w-80 bg-slate-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200 transition-color duration-500 ease-in-out">
      ...      
    </header>
  );
}
```

### 1.3.2 푸터 분리
* components/common/Footer.tsx 생성
* app/layout.tsx의 `<footer>...</footer>` 태그 복사해서 추가하고 기존 `<footer>...</footer>` 영역은 `<Footer />` 로 교체

#### Footer.tsx
```tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="p-4 pb-12 w-full border-t border-t-slate-200  dark:border-t-slate-500 dark:bg-gray-600 text-gray-600 dark:text-white transition-color duration-500 ease-in-out">
      <div className="min-w-[320px] flex flex-wrap gap-4 justify-center items-center text-sm text-slate-400">
        <Link href="#" className="hover:font-semibold dark:hover:text-gray-200">약관</Link>
        <Link href="#" className="hover:font-semibold dark:hover:text-gray-200">게시판 정책</Link>
        <Link href="#" className="hover:font-semibold dark:hover:text-gray-200">회사소개</Link>
        <Link href="#" className="hover:font-semibold dark:hover:text-gray-200">광고</Link>
        <Link href="#" className="hover:font-semibold dark:hover:text-gray-200">마이비즈니스</Link>
        <Link href="#" className="hover:font-semibold dark:hover:text-gray-200">제휴 제안</Link>
        <Link href="#" className="hover:font-semibold dark:hover:text-gray-200">이용약관</Link>
        <Link href="#" className="hover:font-semibold dark:hover:text-gray-200">개인정보취급방침</Link>
        <Link href="#" className="hover:font-semibold dark:hover:text-gray-200">청소년보호 정책</Link>
        <Link href="#" className="hover:font-semibold dark:hover:text-gray-200">고객센터</Link>
      </div>
    </footer>
  );
}
```

#### app/layout.tsx
```tsx
import './globals.css';
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      ...
      <body className="font-sans">
        <div id="root">
          <div className="flex flex-col min-h-screen dark:bg-gray-700 dark:text-gray-200 transition-color duration-500 ease-in-out">

            <Header />

            { children }
            
            <Footer />

          </div>
        </div>
      </body>
    </html>
  );
}
```

### 1.3.3 게시물 목록 아이템별 분리
* app/info/ListItem.tsx 생성
* app/info/page.tsx에서 1번 게시글 영역 `<tr>...</tr>` 태그 복사해서 추가하고 기존 `<tr>...</tr>` 영역은 `<ListItem />` 두개로 교체

#### ListItem.tsx
```tsx
import Link from "next/link";

export default function ListItem() {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300 ease-in-out">
      <td className="p-2 text-center">1</td>
      <td className="p-2 truncate indent-4"><Link href="/info/1" className="hover:text-orange-500 hover:underline">React란?</Link></td>
      <td className="p-2 text-center truncate">네오</td>
      <td className="p-2 text-center hidden sm:table-cell">22</td>
      <td className="p-2 text-center hidden sm:table-cell">5</td>
      <td className="p-2 truncate text-center hidden sm:table-cell">2026.01.03 17:59:13</td>
    </tr>
  );
}
```

#### app/info/page.tsx
```tsx
import ListItem from "@/app/info/ListItem";
import Link from "next/link";

export default async function ListPage() {
  return (
    ...
    <tbody>
      <ListItem />
      <ListItem />
    </tbody>
    ...
  );
}
```

### 1.3.4 댓글 목록 아이템별 분리
* app/info/1/CommentItem.tsx 생성
* app/info/1/page.tsx에서 첫번째 댓글 영역 `<div className="shadow-md rounded-lg p-4 mb-4">...</div>` 태그 복사해서 추가하고 기존 `<div>...</div>` 영역 두개는 `<CommentItem />` 두개로 교체

#### CommentItem.tsx
```tsx
import Image from "next/image";
import Link from "next/link";

export default function CommentItem() {
  return (
    <div className="shadow-md rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <Image
            width={32}
            height={32}
            className="w-8 mr-2 rounded-full"
            src="https://res.cloudinary.com/ddedslqvv/image/upload/v1767106161/user-apeach_ol8y1n.png"
            alt="어피치 프로필 이미지"
          />
          <Link href="" className="text-orange-400">어피치</Link>
        </div>
        <time className="text-gray-500" dateTime="2026.01.05 14:11:22">2026.01.05 14:11:22</time>
      </div>
      <div className="flex justify-between items-start mb-2">
        <p className="whitespace-pre-wrap text-sm flex-1">아는 내용이구만...</p>
        <form action="#" className="inline ml-2">
          <button type="submit" className="bg-red-500 py-1 px-2 text-sm text-white font-semibold ml-2 hover:bg-amber-400 rounded">삭제</button>
        </form>
      </div>
    </div>
  );
}
```

### 1.3.5 신규 댓글 분리
* app/info/1/CommentNew.tsx 생성
* app/info/1/page.tsx에서 댓글 작성 영역 `<div className="p-4 border border-gray-200 rounded-lg">...</div>` 태그 복사해서 추가하고 기존 `<div>...</div>` 영역은 `<CommentNew />` 로 교체

#### CommentNew.tsx
```tsx
export default function CommentNew() {
  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <h4 className="mb-4">새로운 댓글을 추가하세요.</h4>
      <form action="#">
        <div className="mb-4">
          <textarea
            rows={3}
            cols={40} 
            className="block p-2 w-full text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="내용을 입력하세요."
            name="comment"></textarea>

          <p className="ml-2 mt-1 text-sm text-red-500">
            내용은 필수입니다.
          </p>
          
        </div>
        <button type="submit" className="bg-orange-500 py-1 px-4 text-sm text-white font-semibold ml-2 hover:bg-amber-400 rounded">댓글 등록</button>
      </form>
    </div>
  );
}
```

#### app/info/1/page.tsx
```tsx
...
import Link from "next/link";
import CommentItem from "@/app/info/1/CommentItem";
import CommentNew from "@/app/info/1/CommentNew";

export default async function InfoPage() {
  return (
    ...
    <section className="mb-8">
      <h4 className="mt-8 mb-4 ml-2">댓글 2개</h4>
      <CommentItem />
      <CommentItem />

      <CommentNew />
    </section>
    ...
  );
}
```

### 1.3.6 댓글 목록 분리
* app/info/1/CommentList.tsx 생성
* app/info/1/page.tsx에서 첫번째 댓글 영역 `<section className="mb-8">...</div>` 태그 복사해서 추가하고 기존 `<section>...</div>` 영역은 `<CommentList />` 로 교체

#### CommentList.tsx
```tsx
import CommentItem from "@/app/info/1/CommentItem";
import CommentNew from "@/app/info/1/CommentNew";

export default function CommentList() {
  return (
    <section className="mb-8">
      <h4 className="mt-8 mb-4 ml-2">댓글 2개</h4>

      <CommentItem />
      <CommentItem />

      <CommentNew />

    </section>
  );
}
```

#### app/info/1/page.tsx
```tsx
import Link from "next/link";
import CommentList from "@/app/info/1/CommentList";

export default async function InfoPage() {
  return (
    <main className="flex-1 container mx-auto mt-4 px-4">
      <section className="mb-8 p-4">
        ...
      </section>
      <CommentList />
    </main>
  );
}
```

## 1.4 Step 01 완료
* 완성된 코드 참고: https://github.com/FEBC-15/react/tree/main/workspace-ins/ch11-skeleton/lion-board-next-01

# 2 Step 02 - 라우트 정의

* workspace/ch11-skeleton 폴더에서 실행

  ```sh
  # lion-board-next-01/.next와 node_modules 폴더 삭제
  rm -rf lion-board-next-01/.next lion-board-next-01/node_modules && echo "삭제 완료"
  # lion-board-next-01 폴더를 복사해서 lion-board-next-02 폴더 생성
  cp -r lion-board-next-01 lion-board-next-02 && echo "복사 완료"
  # 복사한 폴더로 이동
  cd lion-board-next-02
  # 패키지 설치
  npm i
  ```

* lion-board-next-02/components/common/Header.tsx 파일 수정
  - `라이언 보드 v.01` -> `라이언 보드 v.02`

## 2.1 동적 라우트 정의

**목표**: 하드코딩된 `/info` 경로를 동적 라우트로 변경하여 여러 게시판 타입(info, free, qna)을 하나의 라우트로 처리

**주의사항**:
- 폴더명 수정이 되지 않을 경우 개발 서버를 중지한 후 수정
- 테스트시 수정사항이 반영되지 않을 경우 개발 서버 재시작

### 2.1.1 게시물 목록 페이지

**작업 내용**: `app/info` 폴더를 `app/[boardType]`으로 변경하여 동적 라우트로 만들기

**1단계: 폴더명 변경**
* `app/info` 폴더명을 `app/[boardType]`으로 변경

#### 2.1.1.1 게시물 목록 조회 페이지에 게시판 타입별 제목 적용

**작업 내용**: URL의 boardType 파라미터를 받아서 게시판 제목을 동적으로 표시

**1단계: page.tsx 수정**
* `app/[boardType]/page.tsx` 파일 열기
* 파일 상단의 import 문 수정
* 함수 시그니처와 제목 로직 추가

  **변경 전:**
  ```tsx
  import ListItem from "@/app/info/ListItem";
  ...
  export default async function ListPage() {
    return (
      <main>
        <h2>정보 공유</h2>
        ...
        <ListItem />
        <ListItem />
        ...
      </main>
    );
  }
  ```

  **변경 후:**
  ```tsx
  import ListItem from "@/app/[boardType]/ListItem";
  ...
  export default async function ListPage({ params }: { params: Promise<{ boardType: string }> }) {
    const { boardType } = await params;
    
    // 게시판 타입에 따른 제목 설정
    let boardTitle = '';
    switch (boardType) {
      case 'info':
        boardTitle = '정보 공유';
        break;
      case 'free':
        boardTitle = '자유 게시판';
        break;
      case 'qna':
        boardTitle = '질문 게시판';
        break;
    }

    return (
      <main>
        <h2>{boardTitle}</h2>
        ...
        <ListItem boardType={boardType} />
        <ListItem boardType={boardType} />
        ...
      </main>
    );
  }
  ```

**2단계: ListItem.tsx 수정**
* `app/[boardType]/ListItem.tsx` 파일 열기
* props에 boardType 추가
* 링크 수정

  **변경 전:**
  ```tsx
  export default function ListItem() {
    return (
      ...
      <Link href="/info/1">React란?</Link>
      ...
    );
  }
  ```

  **변경 후:**
  ```tsx
  export default function ListItem({ boardType }: { boardType: string }) {
    return (
      ...
      <Link href={`/${boardType}/1`}>React란?</Link>
      ...
    );
  }
  ```

### 2.1.2 게시물 상세 보기 페이지

**작업 내용**: 게시물 상세 페이지를 동적 라우트로 변경하고 import 경로 수정

**1단계: 폴더명 변경 및 삭제**
* `app/[boardType]/1` 폴더명을 `app/[boardType]/[_id]`로 변경
* `app/[boardType]/2` 폴더 삭제 (더 이상 필요 없음)

**2단계: import 경로 수정**
* `app/[boardType]/[_id]/page.tsx` 파일 열기
* 파일 상단의 import 문 수정

  **변경 전:**
  ```tsx
  import CommentList from "@/app/info/1/CommentList";
  ```

  **변경 후:**
  ```tsx
  import CommentList from "@/app/[boardType]/[_id]/CommentList";
  ```

* `app/[boardType]/[_id]/CommentList.tsx` 파일 열기
* 파일 상단의 import 문 수정

  **변경 전:**
  ```tsx
  import CommentItem from "@/app/info/1/CommentItem";
  import CommentNew from "@/app/info/1/CommentNew";
  ```

  **변경 후:**
  ```tsx
  import CommentItem from "@/app/[boardType]/[_id]/CommentItem";
  import CommentNew from "@/app/[boardType]/[_id]/CommentNew";
  ```

### 2.1.3 게시판 링크 수정

**작업 내용**: 모든 페이지에서 하드코딩된 `/info` 경로를 `boardType` 파라미터를 사용한 동적 경로로 변경

* `components/common/Header.tsx` 파일 열기
* 링크 수정

  **변경 전:**
  ```tsx
  <Link href="/info">정보공유</Link>
  <Link href="/info">자유게시판</Link>
  <Link href="/info">질문게시판</Link>
  ```

  **변경 후:**
  ```tsx
  <Link href="/info">정보공유</Link>
  <Link href="/free">자유게시판</Link>
  <Link href="/qna">질문게시판</Link>
  ```

* `app/page.tsx` 파일 열기
* 링크 수정

  **변경 전:**
  ```tsx
  <h3>자유 게시판</h3>
  <Link href="/info">바로가기</Link>
  <h3>질문 게시판</h3>
  <Link href="/info">바로가기</Link>
  ```

  **변경 후:**
  ```tsx
  <h3>자유 게시판</h3>
  <Link href="/free">바로가기</Link>
  <h3>질문 게시판</h3>
  <Link href="/qna">바로가기</Link>

* `app/[boardType]/page.tsx` 파일 열기
* 링크 수정

  **변경 전:**
  ```tsx
  <Link href="/info/new">글작성</Link>
  <Link href="/info?page=1">1</Link>
  <Link href="/info?page=2">2</Link>
  ```

  **변경 후:**
  ```tsx
  <Link href={`/${boardType}/new`}>글작성</Link>
  <Link href={`/${boardType}?page=1`}>1</Link>
  <Link href={`/${boardType}?page=2`}>2</Link>
  ```

* `app/[boardType]/[_id]/page.tsx` 파일 열기
* 함수에 params 추가
* 링크 수정

  **변경 전:**
  ```tsx
  export default async function InfoPage() {
    return (
      <main>
        <form action="/info">
          ...
        </form>
        <Link href="/info">목록</Link>
        <Link href="/info/1/edit">수정</Link>
      </main>
    );
  }
  ```

  **변경 후:**
  ```tsx
  export default async function InfoPage({ params }: { params: Promise<{ boardType: string, _id: string }> }) {
    const { boardType, _id } = await params;
    
    return (
      <main>
        <form action={`/${boardType}`}>
          ...
        </form>
        <Link href={`/${boardType}`}>목록</Link>
        <Link href={`/${boardType}/${_id}/edit`}>수정</Link>
      </main>
    );
  }
  ```

* `app/[boardType]/[_id]/edit/page.tsx` 파일 열기
* 함수에 params 추가
* 링크 수정

  **변경 전:**
  ```tsx
  export default async function EditPage() {
    return (
      <form action="/info/1">
        ...
        <Link href="/info/1">취소</Link>
      </form>
    );
  }
  ```

  **변경 후:**
  ```tsx
  export default async function EditPage({ params }: { params: Promise<{ boardType: string, _id: string }> }) {
    const { boardType, _id } = await params;
    
    return (
      <form action={`/${boardType}/${_id}`}>
        ...
        <Link href={`/${boardType}/${_id}`}>취소</Link>
      </form>
    );
  }
  ```

* `app/[boardType]/new/page.tsx` 파일 열기
* 함수에 params 추가
* 링크 수정

  **변경 전:**
  ```tsx
  export default async function NewPage() {
    return (
      <form action="/info">
        ...
        <Link href="/info">취소</Link>
      </form>
    );
  }
  ```

  **변경 후:**
  ```tsx
  export default async function NewPage({ params }: { params: Promise<{ boardType: string }> }) {
    const { boardType } = await params;
    
    return (
      <form action={`/${boardType}`}>
        ...
        <Link href={`/${boardType}`}>취소</Link>
      </form>
    );
  }
  ```
  
### 2.1.4 테스트

**테스트 목표**: 동적 라우트가 정상 작동하는지 확인

**테스트 방법**:
1. 브라우저에서 자유게시판 접속
2. 페이지 제목이 "자유 게시판"으로 표시되는지 확인
3. 다음 경로들을 순서대로 테스트:

   **테스트 시나리오:**
   - 자유게시판 메인 → 글작성 버튼 클릭 → 등록 버튼 클릭 → 자유게시판으로 돌아오는지 확인
   - 자유게시판 메인 → 글작성 버튼 클릭 → 취소 버튼 클릭 → 자유게시판으로 돌아오는지 확인
   - 자유게시판 메인 → "React란?" 제목 클릭 → 상세 페이지 → 목록 버튼 클릭 → 자유게시판으로 돌아오는지 확인
   - 자유게시판 메인 → "React란?" 제목 클릭 → 상세 페이지 → 삭제 버튼 클릭 → 자유게시판으로 돌아오는지 확인
   - 자유게시판 메인 → "React란?" 제목 클릭 → 상세 페이지 → 수정 버튼 클릭 → 수정 페이지 → 수정 버튼 클릭 → 목록 버튼 클릭 → 자유게시판으로 돌아오는지 확인
   - 자유게시판 메인 → "React란?" 제목 클릭 → 상세 페이지 → 수정 버튼 클릭 → 수정 페이지 → 취소 버튼 클릭 → 목록 버튼 클릭 → 자유게시판으로 돌아오는지 확인

**확인 사항**:
- 모든 경로에서 주소창에 `/free`가 유지되는지 확인
- 페이지 제목이 "자유 게시판"으로 유지되는지 확인
- 정보공유(`/info`), 질문게시판(`/qna`)도 동일하게 작동하는지 확인

## 2.2 라우트 그룹 정의

**목표**: 라우트 그룹을 사용하여 URL에는 영향을 주지 않으면서 폴더 구조를 정리

**라우트 그룹이란?**
- 폴더명을 `(폴더명)` 형태로 만들면 URL에 포함되지 않음
- 예: `app/(user)/login` → URL은 `/login` (폴더명 `(user)`는 URL에 포함 안 됨)

### 2.2.1 로그인과 회원가입 페이지를 라우트 그룹으로 지정

**작업 내용**: `app/user` 폴더를 `app/(user)`로 변경

### 2.2.2 로그인, 회원가입 링크 수정

**작업 내용**: 라우트 그룹으로 변경했으므로 URL 경로가 `/user/login` → `/login`으로 변경됨

**1단계: Header.tsx 수정**
* `components/common/Header.tsx` 파일 열기
* 로그인, 회원가입 링크 수정

  **변경 전:**
  ```tsx
  <Link href="/user/login">로그인</Link>
  <Link href="/user/signup">회원가입</Link>
  ```

  **변경 후:**
  ```tsx
  <Link href="/login">로그인</Link>
  <Link href="/signup">회원가입</Link>
  ```

**2단계: login/page.tsx 수정**
* `app/(user)/login/page.tsx` 파일 열기
* 회원가입 링크 수정

  **변경 전:**
  ```tsx
  <Link href="/user/signup">회원가입</Link>
  ```

  **변경 후:**
  ```tsx
  <Link href="/signup">회원가입</Link>
  ```

**테스트**
* 헤더의 로그인, 회원가입 링크가 정상 작동하는지 확인 

## 2.3 메타 데이터 추가

**목표**: 각 페이지에 적절한 title과 description을 설정하여 SEO 개선 및 브라우저 탭에 제목 표시

### 2.3.1 Root Layout

**작업 내용**: 전체 사이트의 기본 메타데이터 설정

* `app/layout.tsx` 파일 열기
* 파일 상단에 import 추가하고 metadata export 추가

  **추가할 코드:**
  ```tsx
  import { Metadata } from 'next';

  export const metadata: Metadata = {
    // url 관련 metadata 설정시 사용될 기본 경로 지정
    metadataBase: new URL('https://lion-board.vercel.app'),
  };
  ```

### 2.3.2 게시물 목록 조회 페이지

**작업 내용**: 게시판 타입에 따라 동적으로 메타데이터 생성

* `app/[boardType]/page.tsx` 파일 열기
* 파일 상단에 import 추가
* `generateMetadata` 함수 추가

  **추가할 코드:**
  ```tsx
  import { Metadata } from "next";

  export async function generateMetadata({ params }: { params: Promise<{ boardType: string }> }): Promise<Metadata> {
    const { boardType } = await params;
    return {
      title: `${boardType} - 라이언 보드`,
      description: `${boardType} 게시판입니다.`,
      openGraph: {
        title: `${boardType} - 라이언 보드`,
        description: `${boardType} 게시판입니다.`,
        url: `/${boardType}`,
        images: {
          url: '/images/front-end.png'
        }
      }
    };
  }

  export default async function ListPage({ params }: { params: Promise<{ boardType: string }> }) {
    // ... 기존 코드
  }
  ```

### 2.3.3 게시물 상세 조회 페이지

**작업 내용**: 게시물 상세 페이지에 메타데이터 추가

* `app/[boardType]/[_id]/page.tsx` 파일 열기
* 파일 상단에 import 추가
* `generateMetadata` 함수 추가

  **추가할 코드:**
  ```tsx
  import { Metadata } from "next";

  export async function generateMetadata({ params }: { params: Promise<{ boardType: string, _id: string }> }): Promise<Metadata> {
    const { boardType, _id } = await params;
    return {
      title: `${boardType} - React란?`,
      description: `${boardType} - React는 UI를 구성하기 위한 JavaScript 라이브러리로... `,
      openGraph: {
        title: `${boardType} - React란?`,
        description: `${boardType} - React는 UI를 구성하기 위한 JavaScript 라이브러리로... `,
        url: `/${boardType}/${_id}`,
        images: {
          url: '/images/front-end.png'
        }
      }
    };
  }

  export default async function InfoPage({ params }: { params: Promise<{ boardType: string, _id: string }> }) {
    // ... 기존 코드
  }
  ```

### 2.3.4 게시물 등록 페이지

**작업 내용**: 게시물 등록 페이지에 메타데이터 추가

* `app/[boardType]/new/page.tsx` 파일 열기
* 파일 상단에 import 추가
* `generateMetadata` 함수 추가

  **추가할 코드:**
  ```tsx
  import { Metadata } from "next";

  export async function generateMetadata({ params }: { params: Promise<{ boardType: string }> }): Promise<Metadata> {
    const { boardType } = await params;
    return {
      title: `${boardType} - 게시글 등록`,
      description: `${boardType} - 게시글을 등록하세요.`,
      openGraph: {
        title: `${boardType} - 게시글 등록`,
        description: `${boardType} - 게시글을 등록하세요.`,
        url: `/${boardType}/new`,
        images: {
          url: '/images/front-end.png'
        }
      }
    };
  }

  export default async function NewPage({ params }: { params: Promise<{ boardType: string }> }) {
    // ... 기존 코드
  }
  ```

### 2.3.5 게시물 수정 페이지

**작업 내용**: 게시물 수정 페이지에 메타데이터 추가

* `app/[boardType]/[_id]/edit/page.tsx` 파일 열기
* 파일 상단에 import 추가
* `generateMetadata` 함수 추가

  **추가할 코드:**
  ```tsx
  import { Metadata } from "next";

  export async function generateMetadata({ params }: { params: Promise<{ boardType: string, _id: string }> }): Promise<Metadata> {
    const { boardType, _id } = await params;
    return {
      title: `${boardType} - 게시글 수정`,
      description: `${boardType} - 게시글을 수정하세요.`,
      openGraph: {
        title: `${boardType} - 게시글 수정`,
        description: `${boardType} - 게시글을 수정하세요.`,
        url: `/${boardType}/${_id}/edit`,
        images: {
          url: '/images/front-end.png'
        }
      }
    };
  }

  export default async function EditPage({ params }: { params: Promise<{ boardType: string, _id: string }> }) {
    // ... 기존 코드
  }
  ```

### 2.3.6 회원가입 페이지

**작업 내용**: 회원가입 페이지에 메타데이터 추가

* `app/(user)/signup/page.tsx` 파일 열기
* 파일 상단에 import 추가
* `metadata` export 추가

  **추가할 코드:**
  ```tsx
  import { Metadata } from "next";

  export const metadata: Metadata = {
    title: `회원가입 - 라이언 보드`,
    description: `무료 회원 가입후 라이언 보드의 모든 서비스를 이용하세요.`,
    openGraph: {
      title: `회원가입 - 라이언 보드`,
      description: `무료 회원 가입후 라이언 보드의 모든 서비스를 이용하세요.`,
      url: `/signup`,
      images: {
        url: '/images/front-end.png'
      }
    }
  }

  export default function SignupPage() {
    // ... 기존 코드
  }
  ```

### 2.3.7 로그인 페이지

**작업 내용**: 로그인 페이지에 메타데이터 추가 (정적 메타데이터 사용)

* `app/(user)/login/page.tsx` 파일 열기
* 파일 상단에 import 추가
* `metadata` export 추가

  **추가할 코드:**
  ```tsx
  import { Metadata } from "next";

  export const metadata: Metadata = {
    title: '로그인 - 라이언 보드',
    openGraph: {
      title: '로그인 - 라이언 보드',
      description: '로그인 페이지',
      url: '/login'
    }
  };

  export default function LoginPage() {
    // ... 기존 코드
  }
  ```

### 2.3.8 테스트

**테스트 목표**: 각 페이지의 메타데이터가 정상적으로 표시되는지 확인

**테스트 방법**:
1. 각 페이지에 접속하여 브라우저 탭의 title 확인

## 2.4 라우팅용 특수 파일 작성

### 2.4.1 loading
* app/loading.tsx 파일 생성

  ```tsx
  export default function Loading() {
    return (
      <div className="flex flex-1 items-center justify-center h-[300px]">
        <div className="text-center">
          <h3 className="mb-4 text-lg font-semibold">잠시만 기다려주세요.</h3>
          <span>로딩중...</span>
        </div>
      </div>
    );
  }
  ```

### 2.4.2 error

**목표**: 에러 발생 시 사용자에게 친절한 에러 메시지 표시

#### 2.4.2.1 공통 에러 컴포넌트 작성

**작업 내용**: 재사용 가능한 에러 컴포넌트 생성

**1단계: CustomError 컴포넌트 생성**
* `components/common/CustomError.tsx` 파일 생성
* 다음 코드 작성

  ```tsx
  import Link from "next/link";

  export default function CustomError({ message }: { message: string }) {
    return (
      <main className="flex-1 py-20 bg-red-100 border border-red-400 text-red-700 p-4 rounded-lg flex flex-col items-center space-y-2">
        <h2 className="text-xl font-semibold mb-2 text-center">🚧 앗, 무언가 잘못됐네요!</h2>
        <h3 className="text-md font-semibold mb-2 text-center">{message}</h3>
        <Link href="/" className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600">
          ⚙️ 홈으로 이동
        </Link>
      </main>
    );
  }
  ```

#### 2.4.2.2 error 페이지 작성

**작업 내용**: Next.js의 error.tsx 파일 생성

**1단계: 파일 생성/수정**
* `app/error.html` 파일을 `app/error.tsx`로 파일명 변경

**2단계: 코드 작성**
* 기존 코드 모두 삭제한 후 다음 코드 작성

  ```tsx
  'use client';

  import CustomError from "@/components/common/CustomError";

  export default function ErrorPage({ error }: { error: Error }) {
    console.error(error);
    return (
      <CustomError message="예상치 못한 오류가 발생했습니다." />
    );
  }
  ```

**주의**: 
- `'use client'` 지시어 필수 (에러 페이지는 클라이언트 컴포넌트)
- `error` 파라미터는 Next.js가 자동으로 전달

### 2.4.3 not-found

**목표**: 존재하지 않는 페이지 접근 시 404 페이지 표시

**작업 내용**: not-found.tsx 파일 생성

* `app/not-found.tsx` 파일 생성
* 다음 코드 작성

  ```tsx
  import CustomError from "@/components/common/CustomError";

  export default function NotFoundPage() {
    return (
      <CustomError message="존재하지 않는 페이지입니다." />
    );
  }
  ```

**테스트 방법**:
* 브라우저에서 존재하지 않는 경로 접속 (예: `http://localhost:3000/a/b/c`)
* 404 페이지가 표시되는지 확인

## 2.5 프로젝트 폴더 전체 구조

**목표**: Step 02 완료 후 최종 폴더 구조 확인

**폴더 구조 설명**:
- `[boardType]`: 동적 라우트 - `/info`, `/free`, `/qna` 등으로 접근
- `[_id]`: 동적 라우트 - 게시물 ID로 접근
- `(user)`: 라우트 그룹 - URL에는 포함되지 않지만 폴더 구조 정리용

```
lion-board-next-02/
├── app/
│   ├── (user)/                   # 라우트 그룹 (URL에 포함 안 됨)
│   │   ├── login/
│   │   │   └── page.tsx          # /login 경로
│   │   └── signup/
│   │       └── page.tsx          # /signup 경로
│   ├── [boardType]/              # 동적 라우트 (info, free, qna)
│   │   ├── [_id]/                # 동적 라우트 (게시물 ID)
│   │   │   ├── edit/
│   │   │   │   └── page.tsx      # /[boardType]/[_id]/edit 경로
│   │   │   ├── CommentItem.tsx
│   │   │   ├── CommentList.tsx
│   │   │   ├── CommentNew.tsx
│   │   │   └── page.tsx          # /[boardType]/[_id] 경로
│   │   ├── new/
│   │   │   └── page.tsx          # /[boardType]/new 경로
│   │   ├── ListItem.tsx
│   │   └── page.tsx              # /[boardType] 경로
│   ├── error.tsx                 # 에러 페이지
│   ├── globals.css
│   ├── layout.tsx                # Root Layout
│   ├── loading.tsx               # 로딩 페이지
│   ├── not-found.tsx             # 404 페이지
│   └── page.tsx                  # 메인 페이지 (/)
│
└── components/
    └── common/
        ├── CustomError.tsx       # 공통 에러 컴포넌트
        ├── Footer.tsx
        └── Header.tsx
```

**주요 변경 사항**:
- `app/info` → `app/[boardType]` (동적 라우트)
- `app/info/1` → `app/[boardType]/[_id]` (동적 라우트)
- `app/user` → `app/(user)` (라우트 그룹)
- `app/error.html` → `app/error.tsx` (에러 페이지)
- `app/loading.tsx` 추가 (로딩 페이지)
- `app/not-found.tsx` 추가 (404 페이지)
- `components/common/CustomError.tsx` 추가 (공통 에러 컴포넌트)

## 2.6 Step 02 완료
* 완성된 코드 참고: https://github.com/FEBC-15/react/tree/main/workspace-ins/ch11-skeleton/lion-board-next-02

# 3 Step 03 - 주요 기능 구현(API 서버 연동)

**목표**: API 서버와 연동하여 실제 데이터를 가져오고, 게시물 등록/조회, 회원가입/로그인 기능 구현

**준비 작업**:
* workspace/ch11-skeleton 폴더에서 실행

  ```sh
  # lion-board-next-02/.next와 node_modules 폴더 삭제
  rm -rf lion-board-next-02/.next lion-board-next-02/node_modules && echo "삭제 완료"
  # lion-board-next-02 폴더를 복사해서 lion-board-next-03 폴더 생성
  cp -r lion-board-next-02 lion-board-next-03 && echo "복사 완료"
  # 복사한 폴더로 이동
  cd lion-board-next-03
  # 패키지 설치
  npm i
  ```

* lion-board-next-03/components/common/Header.tsx 파일 수정
  - `라이언 보드 v.02` -> `라이언 보드 v.03`

## 3.1 type 정의

**목표**: TypeScript 타입을 정의하여 API 응답 데이터와 폼 데이터의 타입 안정성 확보
### 3.1.1 유저 타입 정의

**작업 내용**: 사용자 관련 타입 정의

**1단계: 파일 생성**
* `lion-board-next-03/types/user.ts` 파일 생성

**2단계: 타입 정의**
* 다음 코드 작성

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

  // 사용자 상태 관리용
  export interface UserState {
    user: User | null;
    setUser: (user: User) => void;
    resetUser: () => void;
  }
  ```

### 3.1.2 게시물 타입 정의

**작업 내용**: 게시물과 댓글 관련 타입 정의

**1단계: 파일 생성**
* `types/post.ts` 파일 생성

**2단계: 타입 정의**
* 다음 코드 작성

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
  export type PostListItem = Pick<Post, '_id' | 'type' | 'title' | 'user' | 'views' | 'createdAt'> & {
    repliesCount: number;
  };

  // 게시글 수정 폼 타입
  export type PostUpdateForm = Pick<Post, 'title' | 'content'>;

  // 게시글 생성 폼 타입
  export type PostCreateForm = PostUpdateForm & {
    type: PostType;
  };
  ```

### 3.1.3 서버 응답 데이터 타입 정의

**작업 내용**: API 서버 응답 데이터 타입 정의

**1단계: 파일 생성**
* `types/api.ts` 파일 생성

**2단계: 타입 정의**
* 다음 코드 작성

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

  // 회원 정보 타입
  export interface UserInfoRes {
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

### 3.1.4 통합 타입 정의

**작업 내용**: 모든 타입을 한 곳에서 export하여 import 경로 단순화

**1단계: 파일 생성**
* `types/index.ts` 파일 생성

**2단계: 타입 통합 export**
* 다음 코드 작성

  ```ts
  export * from './user';
  export * from './post';
  export * from './api';
  ```

**사용 예시**:
* 이제 `import { User, Post } from "@/types"` 형태로 모든 타입을 import 가능

## 3.2 환경 변수 정의

**목표**: API 서버 URL과 클라이언트 ID를 환경 변수로 관리

**작업 내용**: `.env` 파일 생성 및 환경 변수 설정

**1단계: 파일 생성**
* `lion-board-next-03/.env` 파일 생성 (프로젝트 루트에 생성)

**2단계: 환경 변수 설정**
* 다음 내용 작성

  ```
  NEXT_PUBLIC_CLIENT_ID=openmarket
  NEXT_PUBLIC_API_URL=https://fesp-api.koyeb.app/market
  ```

**주의사항**:
- `.env` 파일은 `.gitignore`에 포함되어 있어야 함 (민감한 정보이므로)
- `NEXT_PUBLIC_` 접두사가 붙은 변수만 클라이언트에서 사용 가능
- 환경 변수 변경 후 개발 서버 재시작 필요

## 3.3 API 호출 함수 정의

**목표**: 서버 컴포넌트에서 사용할 API 호출 함수 정의

**작업 내용**: 게시물 목록, 상세, 댓글 조회를 위한 라이브러리 함수 작성

**1단계: 파일 생성**
* `lion-board-next-03/lib/post.ts` 파일 생성

**2단계: API 호출 함수 작성**
* 다음 코드 작성

  ```tsx
  import { ErrorRes, PostInfoRes, PostListRes, ReplyListRes } from "@/types";

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

  /**
  * 게시판 타입에 해당하는 게시글 목록 조회
  * @param {string} boardType - 게시판 타입(예: notice, free 등)
  * @returns {Promise<PostListRes | ErrorRes>} - 게시글 목록 응답 객체
  */
  export async function getPosts(boardType: string): Promise<PostListRes | ErrorRes> {
    try{
      const res = await fetch(`${API_URL}/posts?type=${boardType}`, {
        headers: {
          'Client-Id': CLIENT_ID,
        },
        cache: 'force-cache',
      });
      return res.json();
    }catch(error){ // 네트워크 오류 처리
      console.error(error);
      return { ok: 0, message: '일시적인 네트워크 문제로 게시물 목록 조회에 실패했습니다.' };
    }
  }

  /**
  * 특정 게시글의 상세 정보 조회
  * @param {string} _id - 게시글 ID
  * @returns {Promise<PostInfoRes | ErrorRes>} - 게시글 상세 정보 응답 객체
  */
  export async function getPost(_id: string): Promise<PostInfoRes | ErrorRes> {
    try{
      const res = await fetch(`${API_URL}/posts/${_id}`, {
        headers: {
          'Client-Id': CLIENT_ID,
        },
        cache: 'force-cache',
      });
      return res.json();
    }catch(error){ // 네트워크 오류 처리
      console.error(error);
      return { ok: 0, message: '일시적인 네트워크 문제로 게시물 상세 조회에 실패했습니다.' };
    }
  }

  /**
  * 특정 게시글의 댓글 목록 조회
  * @param {string} _id - 게시글 ID
  * @returns {Promise<ReplyListRes | ErrorRes>} - 댓글 목록 응답 객체
  */
  export async function getReplies(_id: string): Promise<ReplyListRes | ErrorRes> {
    try{
      const res = await fetch(`${API_URL}/posts/${_id}/replies`, {
        headers: {
          'Client-Id': CLIENT_ID,
        },
      });
      return res.json();
    }catch(error){ // 네트워크 오류 처리
      console.error(error);
      return { ok: 0, message: '일시적인 네트워크 문제로 댓글 목록 조회에 실패했습니다.' };
    }
  }
  ```

## 3.4 서버 액션 정의

**목표**: 폼 제출 시 서버에서 실행될 서버 액션 정의

**작업 내용**: 게시물 생성, 댓글 생성 등의 서버 액션 작성

**서버 액션이란?**
- `'use server'` 지시어를 사용하여 서버에서만 실행되는 함수
- 폼 제출 시 클라이언트에서 서버로 직접 호출 가능
- `revalidatePath`로 캐시 갱신, `redirect`로 페이지 이동 가능

**1단계: 파일 생성**
* `lion-board-next-03/actions/post.ts` 파일 생성

**2단계: 서버 액션 함수 작성**
* 다음 코드 작성

  ```tsx
  'use server';

  import { ErrorRes, PostInfoRes, ReplyInfoRes } from "@/types";
  import { revalidatePath } from "next/cache";
  import { redirect } from "next/navigation";

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

  type ActionState = ErrorRes | null;

  /**
  * 게시글 등록
  * @param {ActionState} prevState - 이전 상태(사용하지 않음)
  * @param {FormData} formData - 게시글 정보를 담은 FormData 객체
  * @returns {Promise<ActionState>} - 생성 결과 응답 객체
  * @throws {Error} - 네트워크 오류 발생 시
  * @description
  * 게시글을 생성하고, 성공 시 해당 게시판으로 리다이렉트
  * 실패 시 에러 메시지를 반환
  */
  export async function createPost(prevState: ActionState, formData: FormData): Promise<ActionState> {
    // FormData를 일반 Object로 변환
    const body = Object.fromEntries(formData.entries());

    let res: Response;
    let data: PostInfoRes | ErrorRes;

    try{
      res = await fetch(`${API_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Client-Id': CLIENT_ID,
        },
        body: JSON.stringify(body),
      });

      data = await res.json();
      
    }catch(error){ // 네트워크 오류 처리
      console.error(error);
      return { ok: 0, message: '일시적인 네트워크 문제로 등록에 실패했습니다.' };
    }

    // redirect()는 예외를 throw 해서 처리하는 방식이라서 try 문에서 사용하면 catch로 처리되므로 제대로 동작하지 않음
    // 따라서 try 문 밖에서 사용해야 함
    if (data.ok) {
      revalidatePath(`/${body.type}`); // 게시글 목록 갱신
      redirect(`/${body.type}`); // 게시글 목록 페이지로 리다이렉트
    }else{
      return data; // 에러 응답 객체 반환
    }
  }

  type ReplyActionState = ReplyInfoRes | ErrorRes | null;
  /**
  * 댓글 등록
  * @param {ReplyInfoRes | null} prevState - 이전 상태(사용하지 않음)
  * @param {FormData} formData - 댓글 정보를 담은 FormData 객체
  * @returns {Promise<ReplyInfoRes | ErrorRes>} - 생성 결과 응답 객체
  * @description
  * 댓글을 생성하고, 성공 시 해당 게시글의 댓글 목록을 갱신
  */
  export async function createReply(prevState: ReplyActionState, formData: FormData): Promise<ReplyActionState> {
    const body = Object.fromEntries(formData.entries());

    let res: Response;
    let data: ReplyInfoRes | ErrorRes;

    try{
      res = await fetch(`${API_URL}/posts/${body._id}/replies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Client-Id': CLIENT_ID,
        },
        body: JSON.stringify(body),
      });

      data = await res.json();

    }catch(error){ // 네트워크 오류 처리
      console.error(error);
      return { ok: 0, message: '일시적인 네트워크 문제로 등록에 실패했습니다.' };
    }
    
    if (data.ok) {
      revalidatePath(`/${body.type}/${body._id}/replies`); // 댓글 목록 갱신
    }
    
    return data; // 에러 응답 객체 반환
  }
  ```

## 3.5 게시물 목록 화면

**목표**: API 서버에서 게시물 목록을 가져와 화면에 표시

### 3.5.1 게시물 목록 조회

**작업 내용**: 하드코딩된 게시물 목록을 API에서 가져온 실제 데이터로 교체

#### 1단계: ListItem 컴포넌트 수정

**작업 내용**: props로 post 데이터를 받아서 표시

* `app/[boardType]/ListItem.tsx` 파일 열기
* props에 `post` 추가하고 하드코딩된 값들을 `post` 데이터로 변경

  **변경 전:**
  ```tsx
  export default function ListItem({ boardType }: { boardType: string }) {
    return (
      <tr>
        <td>1</td>
        <td><Link href={`/${boardType}/1`}>React란?</Link></td>
        <td>네오</td>
        <td>22</td>
        <td>5</td>
        <td>2026.01.03 17:59:13</td>
      </tr>
    );
  }
  ```

  **변경 후:**
  ```tsx
  import { PostListItem } from "@/types";

  export default function ListItem({ boardType, post }: { boardType: string, post: PostListItem }) {
    return (
      <tr>
        <td>{post._id}</td>
        <td><Link href={`/${boardType}/${post._id}`}>{post.title}</Link></td>
        <td>{post.user.name}</td>
        <td>{post.views}</td>
        <td>{post.repliesCount}</td>
        <td>{post.createdAt}</td>
      </tr>
    );
  }
  ```

#### 2단계: page.tsx 수정

**작업 내용**: API에서 게시물 목록을 가져와서 표시

* `app/[boardType]/page.tsx` 파일 열기

**API 호출 및 데이터 표시**
* 함수 내부에서 `getPosts` 함수 호출
* 하드코딩된 `<ListItem />` 두 개 삭제
* API 응답 데이터로 목록 렌더링

  **변경 전:**
  ```tsx
  export default async function ListPage({ params }: { params: Promise<{ boardType: string }> }) {
    const { boardType } = await params;
    
    return (
      ...
      <tbody>
        <ListItem boardType={boardType} />
        <ListItem boardType={boardType} />
      </tbody>
      ...
    );
  }
  ```

  **변경 후:**
  ```tsx
  import { getPosts } from "@/lib/post";

  export default async function ListPage({ params }: { params: Promise<{ boardType: string }> }) {
    const { boardType } = await params;
    const res = await getPosts(boardType);
    
    return (
      ...
      <tbody>
        {res.ok ? (
          res.item.map((post) => (
            <ListItem key={post._id} boardType={boardType} post={post} />
          ))
        ) : (
          <tr>
            <td colSpan={6} className="text-center py-8">
              <p className="text-red-500 dark:text-red-400">{res.message}</p>
            </td>
          </tr>
        )}
      </tbody>
      ...
    );
  }
  ```

**테스트**
* 브라우저에서 정보공유(`/info`), 자유게시판(`/free`), 질문게시판(`/qna`) 접속
* 각 게시판에 실제 게시물 목록이 표시되는지 확인

## 3.6 게시물 등록 화면

**목표**: 서버 액션을 사용하여 게시물 등록 기능 구현

### 3.6.1 게시물 등록

**작업 내용**: 폼을 클라이언트 컴포넌트로 분리하고 서버 액션 연동

#### 1단계: 클라이언트 컴포넌트 생성

**작업 내용**: 폼을 별도 컴포넌트로 분리하여 서버 액션 사용

* `app/[boardType]/new/RegistForm.tsx` 파일 생성
* 다음 코드 작성

  ```tsx
  'use client';

  import { createPost } from "@/actions/post";
  import Link from "next/link";
  import { useActionState } from "react";

  export default function RegistForm({ boardType }: { boardType: string }) {
    const [state, formAction, isPending] = useActionState(createPost, null);
    
    return (
      
    );
  }
  ```

#### 2단계: page.tsx 수정

**작업 내용**: 기존 폼을 RegistForm 컴포넌트로 교체

**1단계: 폼 영역 분리**
* `app/[boardType]/new/page.tsx` 파일 열기
* `<form>...</form>` 전체 영역을 잘라내기 (복사해두기)

**2단계: RegistForm 컴포넌트 추가**
* 잘라낸 자리에 `<RegistForm boardType={boardType} />` 추가

  **변경 전:**
  ```tsx
  export default async function NewPage({ params }: { params: Promise<{ boardType: string }> }) {
    ...    
    return (
      ...
      <section className="mb-8 p-4">
        <form action={`/${boardType}`}>
        ...
        </form>
      </section>
      ...
    );
  }
  ```

  **변경 후:**
  ```tsx
  import RegistForm from "@/app/[boardType]/new/RegistForm";

  export default async function NewPage({ params }: { params: Promise<{ boardType: string }> }) {
    ...
    return (
      ...
      <section className="mb-8 p-4">
        <RegistForm boardType={boardType} />
      </section>
      ...
    );
  }
  ```

#### 3단계: RegistForm.tsx 완성

**작업 내용**: 잘라낸 폼 코드를 RegistForm에 추가하고 수정

**1단계: 폼 코드 추가**
* `app/[boardType]/new/RegistForm.tsx` 파일 열기
* 잘라낸 `<form>...</form>` 코드를 RegistForm의 return 문에 추가

  ```tsx
  ...
  return (
    <form action={`/${boardType}`}>
    ...
    </form>
  );
  ...
  ```

**2단계: action 수정**
* `action={`/${boardType}`}` → `action={formAction}`

**3단계: hidden 필드 추가**
* `<form>` 태그 바로 아래에 게시판 타입을 전달하는 hidden 필드 추가

  ```tsx
  <form action={formAction}>
    <input type="hidden" name="type" value={boardType} />
    ...
  </form>
  ```

**4단계: 에러 메시지 표시**
* 하드코딩된 에러 메시지를 서버에서 받은 에러 메시지로 변경

  **변경 전:**
  ```tsx
  <p>제목은 필수입니다.</p>
  <p>내용은 필수입니다.</p>
  ```

  **변경 후:**
  ```tsx
  {state?.ok === 0 && state.errors?.title?.msg}
  {state?.ok === 0 && state.errors?.content?.msg}
  ```

**5단계: 중복 클릭 방지**
* 등록 버튼에 `disabled` 속성 추가

  **변경 전:**
  ```tsx
  <button>등록</button>
  ```

  **변경 후:**
  ```tsx
  <button disabled={isPending}>등록</button>
  ```

**테스트**
* 글작성 페이지 접속
* 게시물 정상 등록 확인
* 빈 제목이나 내용으로 등록 시 에러 메시지가 표시되는지 확인

## 3.7 게시물 상세 화면

**목표**: API 서버에서 게시물 상세 정보와 댓글을 가져와서 표시

### 3.7.1 게시물 상세 조회

**작업 내용**: 하드코딩된 게시물 상세 정보를 API에서 가져온 데이터로 교체

#### 1단계: page.tsx 수정

**작업 내용**: API 호출 및 데이터 표시

* `app/[boardType]/[_id]/page.tsx` 파일 열기

**1단계: API 호출 및 에러 처리**
* 함수 내부에서 `getPost` 함수 호출
* 에러 처리 로직 추가
* 하드코딩 데이터를 조회한 게시물 정보로 수정

  **변경 전:**
  ```tsx
  export default async function InfoPage({ params }: { params: Promise<{ boardType: string, _id: string }> }) {
    const { boardType, _id } = await params;
    
    return (
      ...
      <div>제목: React란?</div>
      <div>작성자 : 네오</div>
      <div>2026.01.03 14:00:00</div>
      <p>React는 UI를 구성하기 ...</p>
      ...
    );
  }
  ```

  **변경 후:**
  ```tsx
  import { getPost } from "@/lib/post";
  ...
  export default async function InfoPage({ params }: { params: Promise<{ boardType: string, _id: string }> }) {
    const { boardType, _id } = await params;
    const res = await getPost(_id);
    
    if (!res.ok) {
      return <div>{res.message}</div>;
    }
    
    const post = res.item;
    
    return (
      ...
      <div>제목: {post.title}</div>
      <div>작성자 : {post.user.name}</div>
      <div>{post.createdAt}</div>
      <p>{post.content}</p>
      ...
    );
  }
  ```

**2단계: CommentList에 _id prop 전달**
* CommentList 컴포넌트에 `_id` prop 전달

  **변경 전:**
  ```tsx
  <CommentList />
  ```

  **변경 후:**
  ```tsx
  <CommentList _id={_id} />
  ```

**테스트**
* 브라우저에서 게시물 상세 페이지 접속
* 게시물 상세 정보가 정상적으로 표시되는지 확인

### 3.7.2 댓글 목록 조회

**작업 내용**: API에서 댓글 목록을 가져와서 표시

#### 1단계: CommentList.tsx 수정

**작업 내용**: 서버 컴포넌트로 변경하여 댓글 목록 조회

* `app/[boardType]/[_id]/CommentList.tsx` 파일 열기
* `async` 함수로 변경하고 `_id` props 추가
* API 호출 및 댓글 목록 표시

  **변경 전:**
  ```tsx
  export default function CommentList() {
    return (
      <section>
        <h4>댓글 2개</h4>
        <CommentItem />
        <CommentItem />
        <CommentNew />
      </section>
    );
  }
  ```

  **변경 후:**
  ```tsx
  import { getReplies } from "@/lib/post";

  export default async function CommentList({ _id }: { _id: string }) {
    const res = await getReplies(_id);
    
    return (
      <section>
        <h4>댓글 {res.ok ? res.item.length : 0}개</h4>
        {res.ok ? (
          res.item.map((reply) => (
            <CommentItem key={reply._id} reply={reply} />
          ))
        ) : (
          <p>{res.message}</p>
        )}
        <CommentNew _id={_id} />
      </section>
    );
  }
  ```

#### 2단계: CommentItem.tsx 수정

**작업 내용**: props로 reply 데이터를 받아서 표시

* `app/[boardType]/[_id]/CommentItem.tsx` 파일 열기
* props에 `reply` 추가하고 하드코딩된 값들을 `reply` 데이터로 변경

  **변경 전:**
  ```tsx
  export default function CommentItem() {
    return (
      ...
      <Image src="..." alt="어피치 프로필 이미지" />
      <Link>어피치</Link>
      <time dateTime="2026.01.05 14:11:22">2026.01.05 14:11:22</time>
      <p>아는 내용이구만...</p>
      ...
    );
  }
  ```

  **변경 후:**
  ```tsx
  import { Reply } from "@/types";

  export default function CommentItem({ reply }: { reply: Reply }) {
    return (
      ...
      <Image src={reply.user.image || '/images/favicon.svg'} alt={reply.user.name || '프로필 이미지'} />
      <Link>{reply.user.name}</Link>
      <time dateTime={reply.createdAt}>{reply.createdAt}</time>
      <p>{reply.content}</p>
      ...
    );
  }
  ```

**테스트**
* 게시물 상세 페이지에 댓글 목록이 표시되는지 확인
* 댓글 개수가 정확히 표시되는지 확인

### 3.7.3 댓글 등록

**작업 내용**: 서버 액션을 사용하여 댓글 등록 기능 구현

#### 1단계: CommentNew.tsx 수정

**작업 내용**: 클라이언트 컴포넌트로 변경하고 서버 액션 연동

* `app/[boardType]/[_id]/CommentNew.tsx` 파일 열기

**1단계: 클라이언트 컴포넌트로 만들기**

* 파일 최상단에 `'use client'` 추가
* 함수 파라미터에 `_id` 추가
* `useActionState` 훅으로 서버 액션 연결

  **변경 전:**
  ```tsx
  export default function CommentNew() {
    return (
      ...
    );
  }
  ```

  **변경 후:**
  ```tsx
  'use client';
  import { createReply } from "@/actions/post";
  import { useActionState } from "react";

  export default function CommentNew({ _id }: { _id: string }) {
    const [state, formAction, isPending] = useActionState(createReply, null);

    return (
      ...
    );
  }
  ```

**2단계: form action 수정**
* `action="#"` → `action={formAction}`

**3단계: hidden 필드 추가**
* `<form>` 태그 바로 아래에 게시물 ID를 전달하는 hidden 필드 추가

  ```tsx
  <form action={formAction}>
    <input type="hidden" name="_id" value={_id} />
    ...
  </form>
  ```

**4단계: 에러 메시지 표시**
* 하드코딩된 에러 메시지를 서버에서 받은 에러 메시지로 변경

**변경 전:**
  ```tsx
  내용은 필수입니다.
  ```

  **변경 후:**
  ```tsx
  {state?.ok === 0 && state.errors?.content?.msg}
  ```

**5단계: 중복 클릭 방지**
* 버튼에 `disabled={isPending}` 추가
* 로딩 상태에 따라 버튼 텍스트 변경

  ```tsx
  <button disabled={isPending} ...>댓글 등록</button>
  ```

**테스트**
* 게시물 상세 페이지에서 댓글 입력 후 등록 버튼 클릭
* 댓글이 목록에 추가되는지 확인
* 빈 내용으로 등록 시 에러 메시지가 표시되는지 확인

## 3.8 회원 가입 화면

**목표**: 회원 가입 기능 구현 (프로필 이미지 업로드 포함)

### 3.8.1 파일 업로드 함수 작성

**작업 내용**: 프로필 이미지 업로드를 위한 함수 작성

**1단계: 파일 생성**
* `lib/file.ts` 파일 생성

**2단계: 파일 업로드 함수 작성**
* 다음 코드 작성

  ```ts
  import { ErrorRes, FileUploadRes } from "@/types";

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

  /**
  * 파일 업로드
  * @param formData - 업로드할 파일이 담긴 FormData 객체
  * @returns 파일 업로드 결과를 반환하는 Promise
  * @description
  * 파일을 서버에 업로드하고, 업로드된 파일 정보를 반환
  * API 참고: https://fesp-api.koyeb.app/market/apidocs/#/%ED%8C%8C%EC%9D%BC/post_files_
  */
  export async function uploadFile(file: File): Promise<FileUploadRes | ErrorRes> {
    // 새로운 FormData 객체 생성 후 파일 추가
    const fileForm = new FormData();
    fileForm.append('attach', file);

    // API 서버에 파일 업로드 요청
    const res = await fetch(`${API_URL}/files`, {
      method: 'POST',
      headers: {
        'Client-Id': CLIENT_ID,
      },
      body: fileForm,
    });
    return res.json();
  }
  ```

### 3.8.2 서버 액션 작성

**작업 내용**: 회원 가입 및 로그인을 위한 서버 액션 작성

**1단계: 파일 생성**
* `actions/user.ts` 파일 생성

**2단계: 서버 액션 함수 작성**
* 회원 가입 기능 추가
* 로그인 기능 추가

  ```ts
  'use server';

  import { ErrorRes, UserInfoRes } from "@/types";
  import { uploadFile } from "@/lib/file";

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

  type UserActionState = UserInfoRes | ErrorRes | null;

  /**
  * 회원가입
  * @param state - 이전 상태(사용하지 않음)
  * @param formData - 회원가입 폼 데이터(FormData 객체)
  * @returns 회원가입 결과 응답 객체
  * @description
  * 첨부파일(프로필 이미지)이 있으면 파일 업로드 후 받은 파일경로를 회원 정보에 추가해서 회원가입 API를 호출
  */
  export async function createUser(state: UserActionState, formData: FormData): Promise<UserActionState> {
    let res: Response;
    let data: UserInfoRes | ErrorRes;

    try{
      // 첨부파일(프로필 이미지) 처리
      const attach = formData.get('attach') as File;
      let image;
      if(attach.size > 0){
        // 파일 업로드 API 호출
        const fileRes = await uploadFile(attach);
        if(fileRes.ok && fileRes.item.length > 0){
          image = fileRes.item[0].path;
        }else{
          return { ok: 0, message: '파일 업로드 실패' };
        }
      }

      // 회원가입 요청 바디 생성
      // API 참고: https://fesp-api.koyeb.app/market/apidocs/#/%ED%9A%8C%EC%9B%90/post_users_
      const body = {
        type: formData.get('type') || 'user',
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        ...(image ? { image } : {}),
      };

      // 회원가입 API 호출
      res = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Client-Id': CLIENT_ID,
        },
        body: JSON.stringify(body),
      });

      data = await res.json();
      
    }catch(error){ // 네트워크 오류 처리
      console.error(error);
      return { ok: 0, message: '일시적인 네트워크 문제가 발생했습니다.' };
    }

    return data;
  }

  /**
  * 로그인
  * @param state - 이전 상태(사용하지 않음)
  * @param formData - 로그인 폼 데이터(FormData 객체)
  * @returns 로그인 결과 응답 객체
  * @description
  * 이메일/비밀번호로 로그인 API 호출
  */
  export async function login(state: UserActionState, formData: FormData): Promise<UserActionState> {
    const body = Object.fromEntries(formData.entries());

    let res: Response;
    let data: UserInfoRes | ErrorRes;

    try{
      // 로그인 API 호출
      res = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Client-Id': CLIENT_ID,
        },
        body: JSON.stringify(body),
      });

      data = await res.json();

    }catch(error){ // 네트워크 오류 처리
      console.error(error);
      return { ok: 0, message: '일시적인 네트워크 문제가 발생했습니다.' };
    }
    
    return data;
  }
  ```

### 3.8.3 서버 액션의 body 사이즈 제약 설정
* Next.js의 서버 액션은 기본 body 사이즈가 1MB로 제한됨
* 파일 첨부시 1MB 이상의 body 데이터가 전달될 수 있으므로 next.config.ts 파일에 body size limit 값 설정

  ```ts
  ...
  images: { ... }
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // 서버액션에 전달하는 바디 크기(기본은 1MB)
    },
  },
  ...
  ```

### 3.8.4 클라이언트 컴포넌트 분리

**작업 내용**: 폼을 클라이언트 컴포넌트로 분리하고 서버 액션 연동

#### 1단계: 클라이언트 컴포넌트 생성

**작업 내용**: 폼을 별도 컴포넌트로 분리하여 서버 액션 사용

* `app/(user)/signup/SignupForm.tsx` 파일 생성
* 다음 코드 작성

  ```tsx
  'use client';

  import { createUser } from "@/actions/user";
  import { useActionState } from "react";

  export default function SignupForm() {
    const [state, formAction, isPending] = useActionState(createUser, null);
    
    return (
      
    );
  }
  ```

#### 2단계: page.tsx 수정

**작업 내용**: 기존 폼을 SignupForm 컴포넌트로 교체

**1단계: 폼 영역 분리**
* `app/(user)/signup/page.tsx` 파일 열기
* `<form>...</form>` 전체 영역을 잘라내기 (복사해두기)

**2단계: SignupForm 컴포넌트 추가**
* 잘라낸 자리에 `<SignupForm />` 추가

  **변경 전:**
  ```tsx
  export default function SignupPage() {
    return (
      ...
      <form action="/">...</form>
      ...
    );
  }
  ```

  **변경 후:**
  ```tsx
  import SignupForm from "@/app/(user)/signup/SignupForm";

  export default function SignupPage() {
    return (
      ...
      <SignupForm />
      ...
    );
  }
  ```

#### 3단계: SignupForm.tsx 완성

**작업 내용**: 잘라낸 폼 코드를 SignupForm에 추가하고 수정

**1단계: 폼 코드 추가**
* `app/(user)/signup/SignupForm.tsx` 파일 열기
* 잘라낸 `<form>...</form>` 코드를 SignupForm의 return 문에 추가

**3단계: action 수정**
* `action="/"` → `action={formAction}`

**4단계: hidden 필드 추가**
* `<form>` 태그 바로 아래에 사용자 타입을 전달하는 hidden 필드 추가
  - type: user일 경우 일반 회원
  - type: seller일 경우 판매 회원

  ```tsx
  <form action={formAction}>
    <input type="hidden" name="type" value="user" />
    ...
  </form>
  ```

**5단계: 에러 메시지 표시**
* 하드코딩된 에러 메시지를 서버에서 받은 에러 메시지로 변경

  **변경 전:**
  ```tsx
  <p>이름은 필수입니다.</p>
  <p>이메일은 필수입니다.</p>
  <p>비밀번호는 필수입니다.</p>
  ```

  **변경 후:**
  ```tsx
  <p>{state?.ok === 0 && state.errors?.name?.msg}</p>
  <p>{state?.ok === 0 && state.errors?.email?.msg}</p>
  <p>{state?.ok === 0 && state.errors?.password?.msg}</p>
  ```

**6단계: 중복 클릭 방지**
* 버튼에 `disabled={isPending}` 추가

  **변경 전:**
  ```tsx
  <button>회원가입</button>
  ```

  **변경 후:**
  ```tsx
  <button disabled={isPending}>회원가입</button>
  ```

**7단계: 회원 가입 결과 처리**
* `useRouter` 훅 사용
* `useEffect`로 회원 가입 성공/실패 처리

  **변경 전:**
  ```tsx
  ...
  export default function SignupForm() {
    const [state, formAction, isPending] = useActionState(createUser, null);
    
    return (
      ...
    )
  }
  ```

  **변경 후:**
  ```tsx
  ...
  import { useRouter } from "next/navigation";
  import { useEffect } from "react";

  export default function SignupForm() {
    const [state, formAction, isPending] = useActionState(createUser, null);
    const router = useRouter();

    useEffect(() => {
      if(state?.ok){
        alert('회원 가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
        router.replace('/login');
      }else if(state?.ok === 0 && !state?.errors){ // 입력값 검증에러가 아닌 경우
        alert(state?.message);
      }
    }, [state, router]);

    return (
      ...
    )
  ```

**테스트**
* 회원 가입 페이지 접속
* 이름, 이메일, 비밀번호 입력 후 회원 가입 버튼 클릭
* 회원 가입 성공 시 로그인 페이지로 이동하는지 확인
* 빈 필드로 등록 시 에러 메시지가 표시되는지 확인

## 3.9 로그인 화면

**목표**: 로그인 기능 구현 및 로그인 후 사용자 정보 저장

### 3.9.1 로그인(이메일)

**작업 내용**: 로그인 폼을 클라이언트 컴포넌트로 분리하고 서버 액션 연동

#### 1단계: 클라이언트 컴포넌트 생성

**작업 내용**: 로그인 폼을 별도 컴포넌트로 분리하여 서버 액션 사용

* `app/(user)/login/LoginForm.tsx` 파일 생성
* 다음 코드 작성

  ```tsx
  'use client';

  import { login } from "@/actions/user";
  import { useActionState } from "react";

  export default function LoginForm() {
    const [userState, formAction, isPending] = useActionState(login, null);
    
    return (
      
    );
  }
  ```

#### 2단계: page.tsx 수정

**작업 내용**: 기존 폼을 LoginForm 컴포넌트로 교체

**1단계: 폼 영역 분리**
* `app/(user)/login/page.tsx` 파일 열기
* `<form>...</form>` 전체 영역을 잘라내기 (복사해두기)

**2단계: LoginForm 컴포넌트 추가**
* 잘라낸 자리에 `<LoginForm />` 추가

  **변경 전:**
  ```tsx
  export default function LoginPage() {
    return (
      ...
      <form action="/">...</form>
      ...
    );
  }
  ```

  **변경 후:**
  ```tsx
  import LoginForm from "@/app/(user)/login/LoginForm";
  ...
  export default function LoginPage() {
    return (
      ...
      <LoginForm />
      ...
    );
  }
  ```

#### 3단계: LoginForm.tsx 완성

**작업 내용**: 잘라낸 폼 코드를 LoginForm에 추가하고 수정

**1단계: 폼 코드 추가**
* `app/(user)/login/LoginForm.tsx` 파일 열기
* 잘라낸 `<form>...</form>` 코드를 LoginForm의 return 문에 추가

**2단계: import 추가**
* `useRouter`, `useSearchParams`, `useEffect` import 추가

  ```tsx
  import { useRouter, useSearchParams } from "next/navigation";
  import { useEffect } from "react";
  ```

**3단계: action 수정**
* `action="/"` → `action={formAction}`

**4단계: 에러 메시지 표시**
* 하드코딩된 에러 메시지를 서버에서 받은 에러 메시지로 변경

  **변경 전:**
  ```tsx
  <p>이메일은 필수입니다.</p>
  <p>비밀번호는 필수입니다.</p>
  ```

  **변경 후:**
  ```tsx
  <p>{userState?.ok === 0 && userState.errors?.email?.msg}</p>
  <p>{userState?.ok === 0 && userState.errors?.password?.msg}</p>
  ```

**5단계: 중복 클릭 방지**
* 버튼에 `disabled={isPending}` 추가

  **변경 전:**
  ```tsx
  <button>로그인</button>
  ```

  **변경 후:**
  ```tsx
  <button disabled={isPending}>로그인</button>
  ```

**6단계: 로그인 결과 처리**
* `useRouter`, `useSearchParams` 훅 사용
* `useEffect`로 로그인 성공 처리
* redirect 파라미터가 있으면 해당 페이지로 이동, 없으면 메인 페이지로 이동

  ```tsx
  const router = useRouter();
  const redirect = useSearchParams().get('redirect');

  useEffect(() => {
    if(userState?.ok){
      alert(`${userState.item.name}님 로그인이 완료되었습니다.`);
      router.replace(redirect || '/'); // 돌아갈 페이지가 있을 경우 이동하고 없으면 메인 페이지로 이동
    }
  }, [userState, router, redirect]);
  ```

**7단계: 로그인 실패 메시지 및 redirect 안내 추가**
* redirect 파라미터가 있을 때 안내 메시지 표시
* 로그인 실패 시 에러 메시지 표시

  ```tsx
  return (
    <>
      {redirect && ( // 특정 페이지에서 끌려 왔을 경우
        <div className="text-center py-4">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            로그인이 필요한 서비스입니다.
          </h3>
        </div>
      )}
      {userState?.ok === 0 && ( // 로그인 실패 메시지 출력
        <div className="text-center py-4">
          <p className="text-red-500 dark:text-red-400">{userState.message}</p>
        </div>
      )}
      <form action={formAction}>
        ...
      </form>
    </>
  );
}
```

**테스트**
* 로그인 페이지 접속
* 이메일과 비밀번호 입력 후 로그인 버튼 클릭
  - u1@market.com / 11111111
  - s1@market.com / 11111111
* 로그인 성공 시 메인 페이지로 이동하는지 확인
* 잘못된 이메일/비밀번호로 로그인 시 에러 메시지가 표시되는지 확인

## 3.10 로그인 상태 유지

**목표**: Zustand를 사용하여 로그인한 사용자 정보를 전역 상태로 관리

### 3.10.1 zustand 설치

**작업 내용**: 상태 관리 라이브러리 설치

* 프로젝트 루트(lion-board-next-03)에서 실행

  ```sh
  npm i zustand
  ```

### 3.10.2 userStore 생성

**작업 내용**: 사용자 정보를 관리하는 Zustand 스토어 생성

**1단계: 파일 생성**
* `lion-board-next-03/zustand/userStore.ts` 파일 생성

**2단계: 스토어 작성**

  ```ts
  import { User } from '@/types';
  import { create, StateCreator } from 'zustand';

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
  const useUserStore = create<UserStoreState>(UserStore);

  export default useUserStore;
  ```

### 3.10.3 로그인 후 userStore에 사용자 정보 저장

**작업 내용**: 로그인 성공 시 userStore에 사용자 정보 저장

#### 1단계: LoginForm.tsx 수정

**작업 내용**: 로그인 성공 시 userStore에 사용자 정보 저장

* `app/(user)/login/LoginForm.tsx` 파일 열기

**1단계: import 추가**
* `useUserStore` import 추가

  ```tsx
  import useUserStore from "@/zustand/userStore";
  ```

**2단계: setUser 함수 가져오기**
* `useUserStore` 훅에서 `setUser` 함수 가져오기

  ```tsx
  export default function LoginForm() {
    const setUser = useUserStore(state => state.setUser);
    ...
  }
  ```

**3단계: 로그인 성공 시 사용자 정보 저장**
* 기존 `useEffect` 내부에 `setUser` 호출 추가
* 로그인 성공 시 서버에서 받은 사용자 정보를 userStore에 저장

  **변경 전:**
  ```tsx
  useEffect(() => {
    if(userState?.ok){
      alert(`${userState.item.name}님 로그인이 완료되었습니다.`);
      router.replace(redirect || '/');
    }
  }, [userState, router, redirect]);
  ```

  **변경 후:**
  ```tsx
  useEffect(() => {
    if(userState?.ok){
      setUser({
        _id: userState.item._id,
        email: userState.item.email,
        name: userState.item.name,
        image: userState.item.image,
        token: {
          accessToken: userState.item.token?.accessToken || '',
          refreshToken: userState.item.token?.refreshToken || '',
        },
      });
      alert(`${userState.item.name}님 로그인이 완료되었습니다.`);
      router.replace(redirect || '/');
    }
  }, [userState, router, redirect, setUser]);
  ```

### 3.10.4 로그인 상태 출력 및 로그아웃 기능 구현

**작업 내용**: Header에 로그인 상태에 따라 다른 UI 표시

#### 1단계: Header.tsx 수정

**작업 내용**: 로그인 상태에 따라 사용자 정보 또는 로그인/회원가입 버튼 표시

* `components/common/Header.tsx` 파일 열기

**1단계: 'use client' 지시어 추가**
* 파일 최상단에 `'use client'` 추가

**2단계: import 추가**
* `useUserStore` import 추가

  ```tsx
  'use client';

  import useUserStore from "@/zustand/userStore";
  ...
  ```

**3단계: userStore 사용**
* `useUserStore` 훅으로 사용자 정보와 로그아웃 함수 가져오기

  ```tsx
  export default function Header() {
    const { user, resetUser } = useUserStore();
    ...
  }
  ```

**4단계: 로그아웃 핸들러 추가**
* 로그아웃 버튼 클릭 시 실행할 함수 작성

  ```tsx
  const handleLogout = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetUser();
    alert('로그아웃 되었습니다.');
  };
  ```

**5단계: 조건부 렌더링**
* 로그인 상태에 따라 다른 UI 표시

  **변경 전:**
  ```tsx
  <form action="/">
    <p>
      <Image
        src="..."
        alt="용쌤 프로필 이미지"
      />
      용쌤님
      <button>로그아웃</button>
    </p>
  </form>

  <div>
    <Link>로그인</Link>
    <Link>회원가입</Link>
  </div>
  ```

  **변경 후:**
  ```tsx
  {user ? (
    <form onSubmit={handleLogout}>
      <p>
        <Image 
          src={user.image || '/images/favicon.svg'}
          alt={`${user.name} 프로필 이미지`}
        />
        {user.name}님
        <button>로그아웃</button>
      </p>
    </form>
  ) : (
    <div>
      <Link>로그인</Link>
      <Link>회원가입</Link>
    </div>
  )}
  ```

**테스트**
* 로그인 후 헤더 영역에 로그인된 사용자 정보가 출력되는지 확인
* 로그아웃 후 헤더 영역에 로그인, 회원가입 버튼이 보이는지 확인
* 로그인 후 새로고침하면 로그아웃 상태로 초기화되는 문제 확인 (다음 단계에서 해결)

### 3.10.5 새로고침 후에 로그인 상태 유지

**작업 내용**: Zustand persist 미들웨어를 사용하여 새로고침 후에도 로그인 상태 유지

#### 1단계: userStore.ts 수정

**작업 내용**: persist 미들웨어를 사용하여 sessionStorage에 상태 저장

* `zustand/userStore.ts` 파일 열기

**1단계: import 추가**
* `persist`, `createJSONStorage` import 추가

  ```ts
  import { persist, createJSONStorage } from 'zustand/middleware';
  ```

**2단계: persist 미들웨어 적용**
* 기존 `create` 호출을 주석 처리하고 persist 미들웨어를 사용하도록 수정

  **변경 전:**
  ```ts
  // 스토리지를 사용하지 않을 경우
  const useUserStore = create<UserStoreState>(UserStore);
  ```

  **변경 후:**
  ```ts
  // 스토리지를 사용하지 않을 경우
  // const useUserStore = create<UserStoreState>(UserStore);

  // 스토리지를 사용할 경우 (sessionStorage에 저장)
  const useUserStore = create<UserStoreState>()(
    persist(UserStore, {
      name: 'user',
      storage: createJSONStorage(() => sessionStorage) // 기본은 localStorage
    })
  );
  ```

**설명**
* Zustand에 저장된 로그인한 사용자 정보는 브라우저의 메모리에만 있으므로 브라우저를 새로고침하면 초기화됨
* 로그인 상태를 계속 유지하기 위해서는 브라우저가 새로고침되어도 사라지지 않는 저장소가 필요한데 대표적인 것이 web storage
* Zustand의 persist 미들웨어를 사용하면 local storage나 session storage에 상태를 동기화시켜주므로 페이지 새로고침이 발생해도 상태가 유지됨
* `sessionStorage`를 사용하면 브라우저 탭을 닫으면 세션이 종료되어 로그인 상태가 초기화됨
* `localStorage`를 사용하면 브라우저 탭을 닫아도 로그인 상태가 유지됨

**테스트**
* 로그인 후 새로고침해도 로그인 상태가 유지되는지 확인
* 브라우저 개발자 도구 Application 탭의 Storage > Session storage > http://localhost:3000에서 user 상태가 저장되어 있는지 확인

## 3.11 Step 03 완료
* 완성된 코드 참고: https://github.com/FEBC-15/react/tree/main/workspace-ins/ch11-skeleton/lion-board-next-03
