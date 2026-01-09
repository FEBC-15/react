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

## 0.3 불필요한 파일 정리
* ch11-skeleton/lion-board-next-01/app 하위 파일 정리
  - favicon.ico 삭제
  - layout.tsx 삭제
  - page.tsx 삭제
  - global.css 파일 내용을 `@import "tailwindcss";` 구문만 남기고 제거
  
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
