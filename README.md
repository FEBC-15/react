# React 프로그래밍
- 예제 테스트(GitHub Page): <https://febc-15.github.io/react/workspace-ins>

# 1. 목차

## 1장 리액트 빌드업 
- [ch01-buildup](./workspace-ins/ch01-buildup)

## 2장 리액트 시작하기
- [ch02-start](./workspace-ins/ch02-start)

## 3장 클래스 컴포넌트와 컴포넌트의 라이프 사이클
- [ch03-class](./workspace-ins/ch03-class)

## 4장 리액트 훅
- [ch04-hooks](./workspace-ins/ch04-hooks)

## 5장 리액트 라우터
- [ch05-router](./workspace-ins/ch05-router)

## 6장 컨텍스트 API
- [ch06-contextapi](./workspace-ins/ch06-contextapi)

## 7장 전역 상태 관리
- [ch07-globalstate](./workspace-ins/ch07-globalstate)

## 8장 리액트에서 CSS 사용
- [ch08-css](./workspace-ins/ch08-css)

## 9장 HTTP 통신과 Ajax
- [ch09-ajax](./workspace-ins/ch09-ajax)

## 10장 Next.js
- [ch10-nextjs](./workspace-ins/ch10-nextjs)

## 11장 프로젝트 준비
- [ch11-skeleton](./workspace-ins/ch11-skeleton)

## 12장 React App
- [ch12-app](./workspace-ins/ch12-app)

# 2. 수업 진도

<details>
<summary><h2>1주차 - 3일, 2025.11.25(화) ~ 2025.11.28(금)</h2></summary>

<details>
<summary><h3>1일차(2025.11.25 화)</h3></summary>

#### 오전(3시간)

- React 레포지토리 README: <https://github.com/FEBC-15/react>
  - [개발 환경 구축](./README.md#3-개발-환경-구축)

- 🔊 [1장 리액트 빌드업](./workspace-ins/ch01-buildup)
  - 🔊 [1. 웹 개발의 변천사](./workspace-ins/ch01-buildup#1-웹-개발의-변천사)

- 01 전통적인 방식의 Todo List 테스트(서버에서 완성된 HTML 응답) 
  - 💻 [01 Todo List](https://fesp-api.koyeb.app/todolist)

- 02 SPA(Single Page Application)
  - Todo List 작성(HTML + vanillaJS)
    - 💻 [01 목록 조회](./workspace-ins/ch01-buildup/todolist/01/index.html)
      + workspace/ch01-buildup/todolist/sample 폴더 복사해서 01 폴더 생성

#### 오후(3시간)
  - 💻 [02 등록](./workspace-ins/ch01-buildup/todolist/02/index.html)
    + workspace/ch01-buildup/todolist/01 폴더 복사해서 02 폴더 생성
  - 💻 [03 수정](./workspace-ins/ch01-buildup/todolist/03/index.html)
    + workspace/ch01-buildup/todolist/02 폴더 복사해서 03 폴더 생성
  - 💻 [04 삭제, 완성](./workspace-ins/ch01-buildup/todolist/04/index.html)
    + workspace/ch01-buildup/todolist/03 폴더 복사해서 04 폴더 생성
  - 💻 [05 데이터를 기반으로 화면 리렌더링](./workspace-ins/ch01-buildup/todolist/05/index.html)
    + workspace/ch01-buildup/todolist/04 폴더 복사해서 05 폴더 생성

</details>

<details>
<summary><h3>2일차(2025.11.26 수)</h3></summary>

#### 오전(3시간)
  - 🔊 [2. 리액트 개발에 자주 사용하는 자바스크립트 문법](./workspace-ins/ch01-buildup#2-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EA%B0%9C%EB%B0%9C%EC%97%90-%EC%9E%90%EC%A3%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EB%8A%94-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EB%AC%B8%EB%B2%95)
    + 각자 공부

  * Counter(라이브리리 개발) 작성
    - 💻 [01 HTML + JS](./workspace-ins/ch01-buildup/counter/01/index.html)
      + workspace/ch01-buildup/counter/sample 폴더 복사해서 01 폴더 생성
    - 💻 [02 HTML 대신 JS로 UI 구성](./workspace-ins/ch01-buildup/counter/02/index.html)
      + workspace/ch01-buildup/counter/01 폴더 복사해서 02 폴더 생성

#### 오후(4시간)
* 02 SPA(Single Page Application)
  * Counter(라이브리리 개발) 작성
    - 💻 [03 createElement() 함수 만들기](./workspace-ins/ch01-buildup/counter/03/index.html)
      + workspace/ch01-buildup/counter/02 폴더 복사해서 03 폴더 생성
    - 💻 [04 createElement() 함수 하나로 통합](./workspace-ins/ch01-buildup/counter/04/index.html)
      + workspace/ch01-buildup/counter/03 폴더 복사해서 04 폴더 생성
    - 💻 [05 createRoot(), render() 함수 만들기](./workspace-ins/ch01-buildup/counter/05/index.html)
      + workspace/ch01-buildup/counter/04 폴더 복사해서 05 폴더 생성
    - 💻 [06 UI 구성 요소별 각각의 함수로 분리(컴포넌트로 만들기)](./workspace-ins/ch01-buildup/counter/06/index.html)
      + workspace/ch01-buildup/counter/05 폴더 복사해서 06 폴더 생성
    - 💻 [07 상태(데이터) 변경시 자동으로 UI 리렌더링](./workspace-ins/ch01-buildup/counter/07/index.html)
      + workspace/ch01-buildup/counter/06 폴더 복사해서 07 폴더 생성

</details>

<details>
<summary><h3>3일차(2025.11.28 금)</h3></summary>

#### 오전(3시간)
* 02 SPA(Single Page Application)
  * Todo List 작성(vanillaJS + Lib)
    - 💻 [06 Reaction.createElement() 사용해서 UI 구성](./workspace-ins/ch01-buildup/todolist/06/index.html)
      + workspace/ch01-buildup/todolist/sample 폴더 복사해서 06 폴더 생성
      + workspace/ch01-buildup/counter/07/reaction.js를 workspace/ch01-buildup/todolist 폴더에 복사
    - 💻 [07 UI 구성 요소별 각각의 함수로 분리(컴포넌트로 만들기)](./workspace-ins/ch01-buildup/todolist/07/index.html)
      + workspace/ch01-buildup/todolist/06 폴더 복사해서 07 폴더 생성

#### 오후(3시간)
* 02 SPA(Single Page Application)
  * Todo List 작성(vanillaJS + Lib)
    - 💻 [08 상태(데이터) 변경시 화면 리렌더링](./workspace-ins/ch01-buildup/todolist/08/index.html)
      + workspace/ch01-buildup/todolist/07 폴더 복사해서 08 폴더 생성
* 03 React
  - 💻 [01 Counter - React로 구현(React.createElement)](./workspace-ins/ch01-buildup/react/01/index.html)
    + workspace/ch01-buildup/react/sample/counter 폴더 복사해서 workspace/ch01-buildup/react/01 폴더 생성
  - 💻 [02 Counter - React로 구현(JSX)](./workspace-ins/ch01-buildup/react/02/index.html)
    + workspace/ch01-buildup/react/01 폴더 복사해서 workspace/ch01-buildup/react/02 폴더 생성

#### 과제
```
## 주말 과제입니다.
### 03 Todo List - React로 UI 구성(JSX)
- workspace/ch01-buildup/react/sample/todolist 폴더 복사해서 03 폴더 생성
- App 함수 만들어서 JSX로 화면 출력
  - 닫는 태그 필수: `<input> -> <input />`
  - 속성명은 카멜케이스로 작성: `autofocus -> autoFocus`
  - class는 JS의 키워드이므로 사용 못함: `class -> className`

### 04 Todo List - React 컴포넌트 분리
- workspace/ch01-buildup/react/03 폴더 복사해서 04 폴더 생성
- workspace/ch01-buildup/todolist/07 예제 참고해서 컴포넌트 분리
  - Header
  - Footer
  - Todo
  - TodoInput
  - TodoList
  - TodoItem
  - App

### 05 Todo List - React 기능 추가
- workspace/ch01-buildup/react/04 폴더 복사해서 05 폴더 생성
- workspace/ch01-buildup/todolist/07 예제 참고해서 기능 구현
```

</details>
</details>

<details>
<summary><h2>2주차 - 5일, 2025.12.01(월) ~ 2025.12.05(금)</h2></summary>

<details>
<summary><h3>4일차(2025.12.01 월)</h3></summary>

#### 오전(3시간)
* 03 React
  - 💻 [03 Todo List - React로 UI 구성(JSX)](./workspace-ins/ch01-buildup/react/03/index.html)
    + workspace/ch01-buildup/react/sample/todolist 폴더 복사해서 workspace/ch01-buildup/react/03 폴더 생성
  - 💻 [04 Todo List - React 컴포넌트 분리](./workspace-ins/ch01-buildup/react/04/index.html)
    + workspace/ch01-buildup/react/03 폴더 복사해서 workspace/ch01-buildup/react/04 폴더 생성
  - 💻 [05 Todo List - React 기능 추가](./workspace-ins/ch01-buildup/react/05/index.html)
    + workspace/ch01-buildup/react/04 폴더 복사해서 workspace/ch01-buildup/react/05 폴더 생성

#### 오후(3시간)
* 02 SPA(Single Page Application)
  * Counter(라이브리리 개발) 작성
    - 💻 [08 컴포넌트를 모듈로 분리](./workspace-ins/ch01-buildup/counter/08/index.html)
      + workspace/ch01-buildup/counter/07 폴더 복사해서 08 폴더 생성
  * Todo List 작성(vanillaJS + Lib)
    - 💻 [09 컴포넌트를 모듈로 분리](./workspace-ins/ch01-buildup/todolist/09/index.html)
      + workspace/ch01-buildup/todolist/08 폴더 복사해서 09 폴더 생성
* 03 React
  - 💻 [06 Todo List - React 컴포넌트를 모듈로 분리](./workspace-ins/ch01-buildup/react/06)
    + workspace/ch01-buildup/react 폴더에서 다음 명령 실행
    ```bash
    npm create vite@latest 06
    ```

    ```bash
    Need to install the following packages:
    create-vite@8.0.2
    Ok to proceed? (y) y

    Select a framework:
    │  ○ Vanilla
    │  ○ Vue
    │  ● React
    │  ○ Preact
    │  ...
    │
    ◆  Select a variant:
    │  ● TypeScript
    │  ○ TypeScript + React Compiler
    │  ○ TypeScript + SWC
    │  ○ JavaScript
    │  ...
    │
    ◆  Use rolldown-vite (Experimental)?:
    │  ○ Yes
    │  ● No
    │
    ◆  Install with npm and start now?
    │  ● Yes / ○ No
    │
    ◇  Scaffolding project in C:/febc15/...06/...
    │
    ◇  Installing dependencies with npm...

    added 177 packages, and audited 178 packages in 14s

    45 packages are looking for funding
      run `npm fund` for details

    found 0 vulnerabilities
    │
    ◇  Starting dev server...

    > 06@0.0.0 dev
    > vite

      VITE v7.1.12  ready in 820 ms

      ➜  Local:   http://localhost:5173/
      ➜  Network: use --host to expose
      ➜  press h + enter to show help
    ```

</details>

<details>
<summary><h3>5일차(2025.12.02 화)</h3></summary>

#### 오전(3시간)
* 🔊 [2장 React 시작하기](./workspace-ins/ch02-start)
  - 🔊 [1. React란?](./workspace-ins/ch02-start#1-react란)
  * Hello React
    - 💻 [01 Hello HTML](./workspace-ins/ch02-start/hello/01.html)
    - 💻 [02 Hello DOM](./workspace-ins/ch02-start/hello/02.html)
    - 💻 [03 Hello React](./workspace-ins/ch02-start/hello/03.html)
    - 💻 [04 Hello JSX with babel](./workspace-ins/ch02-start/hello/04.html)
  * Simple Todo List
    - 💻 [05 Simple Todo List - HTML](./workspace-ins/ch02-start/todo/05.html)
    - 💻 [06 Simple Todo List - React](./workspace-ins/ch02-start/todo/06.html)
    - 💻 [07 Simple Todo List - React Component](./workspace-ins/ch02-start/todo/07.html)
    - 💻 [08 Simple Todo List - React Props](./workspace-ins/ch02-start/todo/08.html)

#### 오후(3시간)
* 🔊 [2. React 개발 환경 구축](./workspace-ins/ch02-start#2-react-개발-환경-구축)
* 🔊 [3. React 애플리케이션 배포](./workspace-ins/ch02-start#3-react-애플리케이션-배포)
  - 💻 [09 Vite로 개발 환경 구축 및 빌드, 배포](./workspace-ins/ch02-start/vite/09)
    + workspace/ch02-start/vite 폴더에서 다음 명령 실행
    ```sh
    npm create vite@latest 09 -- --template react-ts
    ```

* 🔊 [4. JSX](./workspace-ins/ch02-start#4-jsx)
* 🔊 [5. 속성 (Props)](./workspace-ins/ch02-start#5-속성-props)

  * 2-3 Props
    - 💻 [10 Button 컴포넌트에 Props 전달](./workspace-ins/ch02-start/props/10)
      + workspace/ch02-start/props 폴더에서 다음 명령 실행
      ```sh
      npm create vite@latest 10 -- --template react-ts
      ```
      + workspace/ch01-buildup/react/02/index.html에서 컴포넌트 복사

</details>

<details>
<summary><h3>6일차(2025.12.03 수)</h3></summary>

#### 오전(3시간)
* 🔊 [5. 속성 (Props)](./workspace-ins/ch02-start#5-속성-props)
  * 2-3 Props
    - 💻 [10 Button 컴포넌트에 Props 전달](./workspace-ins/ch02-start/props/10)
      + workspace/ch02-start/props 폴더에서 다음 명령 실행
      ```sh
      npm create vite@latest 10 -- --template react-ts
      ```
      + workspace/ch01-buildup/react/02/index.html에서 컴포넌트 복사

* 🔊 [6. 상태 (State)](./workspace-ins/ch02-start#6-상태-state)
  - 🔊 [6.1 React.useState()](./workspace-ins/ch02-start#61-reactusestate)

#### 오후(3시간)
* 2-4 State
  - 💻 [11 state 대신 컴포넌트 외부의 변수 사용시 문제점](./workspace-ins/ch02-start/state/11)
    + workspace/ch02-start/state 폴더에서 vite 프로젝트 생성(11)
    + workspace/ch02-start/state/11.html 참고해서 컴포넌트 생성
* 🔊 [6.2 상태 사용시 유의사항](./workspace-ins/ch02-start#62-상태-사용시-유의사항)
  - 💻 [12 이벤트 핸들러에서 state 값을 여러번 변경했을 때 문제점](./workspace-ins/ch02-start/state/12)
    + workspace/ch02-start/state 폴더에서 vite 프로젝트 생성(12)
    + workspace/ch02-start/state/12.html 참고해서 컴포넌트 생성
  - 💻 [13 상태관리 대상이 객체일 경우 주의 사항](./workspace-ins/ch02-start/state/13)
    + workspace/ch02-start/state 폴더에서 vite 프로젝트 생성(13)
    + workspace/ch02-start/state/13.html 참고해서 컴포넌트 생성

</details>

<details>
<summary><h3>7일차(2025.12.04 목)</h3></summary>

#### 오전(3시간)
* 🔊 [6.3 상태의 불변성 (immutability)](./workspace-ins/ch02-start#63-상태의-불변성-immutability)
  - 💻 [14 상태관리 대상이 복합 객체일 경우 불변성 (feat. immer)](./workspace-ins/ch02-start/state/14)
    + workspace/ch02-start/state 폴더에서 vite 프로젝트 생성(14)
    + workspace/ch02-start/state/sample/14.html 참고해서 컴포넌트 생성

#### 오후(3시간)
    + workspace 폴더에서 immer 라이브러리 설치
      - `npm i immer`

</details>

<details>
<summary><h3>8일차(2025.12.05 금)</h3></summary>

#### 오전(3시간)
* 💻 workspace/vite-template 프로젝트 생성
  - `npm create vite@latest vite-template -- --template react-ts`
  - package.json 파일을 workspace 폴더 하위로 복사
  - workspace 폴더에서 `npm i` 실행해서 패키지 설치
  - [vite.config.js 파일 수정](./workspace-ins/ch02-start#viteconfigjs)
  - eslist.config.js 파일 수정
    ```bash
    languageOptions: {
      ...,
      // eslint가 node_modules를 기준으로 프로젝트 루트를 인식하므로
      // 프로젝트에서 자체 node_modules를 사용하지 않고 상위의 node_modules를 사용하도록 설정하면
      // 하위의 여러 프로젝트에서 tsconfig 파일을 여러개 검색하면서 오류가 발생하므로 명시적으로 프로젝트 루트를 인식하도록 설정
      parserOptions: {
        tsconfigRootDir: import.meta.dirname, // 현재 파일이 있는 디렉토리의 절대 경로
      },
    },
    ```
  - 불필요한 파일 삭제

* 🔊 [7. 유효성 검증](./workspace-ins/ch02-start#7-유효성-검증)
  - 💻 [15 회원가입 입력값 상태 관리](./workspace-ins/ch02-start/state/15)
    + workspace/vite-template 폴더 복사해서 15 폴더 생성
    + workspace/ch02-start/state/sample/15.html 참고해서 컴포넌트 생성

#### 오후(3시간)
  - 💻 [16 회원가입 입력값 검증 (feat. react-hook-form)](./workspace-ins/ch02-start/state/16)
    + workspace/ch02-start/state/15 폴더 복사해서 16 폴더 생성
    + workspace 폴더에서 react-hook-form 라이브러리 설치
      - `npm i react-hook-form`
      
#### 과제
```
## 주말 과제: 환율 변환기 앱 개발
- vite 프로젝트 생성
  - vite-template 폴더 복사해서 workspace/homework 폴더에 복사한 후 currency-converter로 폴더명 변경(workspace/homework/currency-converter)
- https://github.com/FEBC-15/react/blob/main/sample/homework/currency-converter/index.html 파일 참고해서 App.tsx에 화면 구현
- 가능하다면 실제 기능 구현에 도전!!!
```

</details>

</details>

<details>
<summary><h2>3주차 - 5일, 2025.12.08(월) ~ 2025.12.12(금)</h2></summary>

<details>
<summary><h3>9일차(2025.12.08 월)</h3></summary>

#### 오전(3시간)
* 🔊 [3장 클래스 컴포넌트와 컴포넌트의 라이프 사이클](./workspace-ins/ch03-class)
  - 💻 [01 클래스 컴포넌트](./workspace-ins/ch03-class/01-classbase)
    + workspace/vite-template 폴더 복사해서 workspace/ch03-class/01-classbase 폴더 생성
    + workspace/ch03-class/01-classbase.html 참고해서 컴포넌트 생성
  - 💻 [02 클래스 컴포넌트 - 함수형 컴포넌트와 같이 사용](./workspace-ins/ch03-class/02-functionbase)
    + workspace/ch03-class/01-classbase 폴더 복사해서 workspace/ch03-class/02-functionbase 폴더 생성
    + workspace/ch03-class/02-functionbase.html 참고해서 컴포넌트 생성

#### 오후(3시간)
  - 💻 [03 클래스 컴포넌트 - 컴포넌트의 라이프 사이클](./workspace-ins/ch03-class/03-lifecycle)
    + workspace/ch03-class/01-classbase 폴더 복사해서 workspace/ch03-class/03-lifecycle 폴더 생성
    + workspace/ch03-class/03-lifecycle.html 참고해서 컴포넌트 생성

</details>

<details>
<summary><h3>10일차(2025.12.09 화)</h3></summary>

#### 오전(3시간)
* 🔊 [4장 리액트 훅](./workspace-ins/ch04-hooks#4장-리액트-훅)
  - 🔊 [useState](./workspace-ins/ch04-hooks#usestate)
    + 💻 [01 useState - 상태 관리](./workspace-ins/ch04-hooks/01-useState)
      + workspace/vite-template 폴더 복사해서 workspace/ch04-hooks/01-useState 폴더 생성
      + workspace/ch04-hooks/01-useState.html 참고해서 컴포넌트 생성

#### 오후(3시간)
- 🔊 [useEffect](./workspace-ins/ch04-hooks#useeffect)
  + 💻 [02 useEffect - side effect 관리](./workspace-ins/ch04-hooks/02-useEffect)
    + workspace/ch04-hooks/01-useState 폴더 복사해서 workspace/ch04-hooks/02-useEffect 폴더 생성

</details>

<details>
<summary><h3>11일차(2025.12.10 수)</h3></summary>

#### 오전(3시간)


#### 오후(3시간)


</details>

<details>
<summary><h3>12일차(2025.12.11 목)</h3></summary>

#### 오전(3시간)


#### 오후(3시간)


</details>

<details>
<summary><h3>13일차(2025.12.12 금)</h3></summary>

#### 오전(3시간)


#### 오후(3시간)


</details>

</details>

<details>
<summary><h2>4주차 - 4일, 2025.12.16(화) ~ 2025.12.19(금)</h2></summary>

<details>
<summary><h3>14일차(2025.12.16 화)</h3></summary>

#### 오전(3시간)


#### 오후(3시간)


</details>

<details>
<summary><h3>15일차(2025.12.17 수)</h3></summary>

#### 오전(3시간)


#### 오후(3시간)


</details>

<details>
<summary><h3>16일차(2025.12.18 목)</h3></summary>

#### 오전(3시간)


#### 오후(3시간)


</details>

<details>
<summary><h3>17일차(2025.12.19 금)</h3></summary>

#### 오전(3시간)


#### 오후(3시간)


</details>

</details>

<details>
<summary><h2>5주차 - 3일, 2025.12.22(월) ~ 2025.12.24(수)</h2></summary>

<details>
<summary><h3>18일차(2025.12.22 월)</h3></summary>

#### 오전(3시간)


#### 오후(3시간)


</details>

<details>
<summary><h3>19일차(2025.12.23 화)</h3></summary>

#### 오전(3시간)


#### 오후(3시간)


</details>

<details>
<summary><h3>20일차(2025.12.24 수)</h3></summary>

#### 오전(3시간)


#### 오후(3시간)


</details>

</details>

<details>
<summary><h2>6주차 - 3일, 2025.12.29(월) ~ 2025.12.31(수)</h2></summary>

<details>
<summary><h3>21일차(2025.12.29 월)</h3></summary>

#### 오전(3시간)


#### 오후(3시간)


</details>

<details>
<summary><h3>22일차(2025.12.30 화)</h3></summary>

#### 오전(3시간)


#### 오후(3시간)


</details>

<details>
<summary><h3>23일차(2025.12.31 수)</h3></summary>

#### 오전(3시간)


#### 오후(3시간)


</details>
</details>

<details>
<summary><h2>7주차 - 5일, 2026.01.05(월) ~ 2026.01.09(금)</h2></summary>

<details>
<summary><h3>24일차(2026.01.05 월)</h3></summary>

#### 오전(3시간)


#### 오후(3시간)


</details>

<details>
<summary><h3>25일차(2026.01.06 화)</h3></summary>

#### 오전(3시간)


#### 오후(3시간)


</details>

<details>
<summary><h3>26일차(2026.01.07 수)</h3></summary>

#### 오전(3시간)


#### 오후(3시간)


</details>

<details>
<summary><h3>27일차(2026.01.08 목)</h3></summary>

#### 오전(3시간)


#### 오후(3시간)


</details>

<details>
<summary><h3>28일차(2026.01.09 금)</h3></summary>

#### 오전(3시간)


#### 오후(3시간)


</details>

</details>

<details>
<summary><h2>8주차 - 1일, 2026.01.12(월)</h2></summary>

<details>
<summary><h3>29일차(2026.01.12 월)</h3></summary>

#### 오전(3시간)


#### 오후(3시간)


</details>
</details>

# 3. 개발 환경 구축

## 3.1 프로그램 설치
* 본인의 OS에 맞는 버전 다운로드 후 설치
  - Nodejs 설치 <https://nodejs.org/en/download/>
  - Visual Studio Code 설치 <https://code.visualstudio.com/download>
  - Git 설치 <https://git-scm.com/downloads>
  - API 클라이언트 설치
    - Postman <https://www.postman.com/downloads>
    - Bruno <https://www.usebruno.com/downloads>

## 3.2 실습 준비
### 3.2.1 Github 레포지토리 복사
1. 리액트 실습 Github 레포지토리
    * `https://github.com/FEBC-15/react`
    
2. 터미널 프로그램 실행 후 개발 수업에 사용할 폴더 생성 후 이동
    * 예시
    ```bash
    mkdir febc15
    cd febc15
    ```

3. 실습 레포지토리를 로컬에 clone
    ```bash
    git clone https://github.com/FEBC-15/react.git
    ```

### 3.2.2 실습 레포지토리의 변경사항 동기화
* github 레포지토리의 변경사항을 가져올 때
    ```sh
    git pull origin main
    ```

* 충돌 발생시 임시로 필요한 코드만 복사
    - 현재 폴더 하위에 sample/02 폴더만 복사하는 예시
    ```sh
    npx degit https://github.com/FEBC-15/react/sample/02 sample/02 
    ```

### 3.2.3 Visual Studio Code 설정
1. VSCode 실행
2. 프로젝트 선택
    - File > Open Folder... > febc15/react 선택
3. File > Preferences > Settings > User: 이곳에서 설정한 항목은 모든 프로젝트에 공통 적용
    - "Editor: Font Size": 각자 맞춰서 조절
    - "Files: Auto Save": onFocusChange
    - "Editor: Tab Size": 2
    - "Editor: Detect Indentation": 체크 해제
    - Search settings 에서 `default profile` 검색
      + Terminal > Intergrated > Default Profile: Windows(MAC 사용자는 Osx) 값을 `Git Bash`로 수정
      + Terminal 우측 상단의 휴지통 아이콘 눌러서 닫은 후 View > Terminal 선택해서 bash로 열리는지 확인

4. File > Preferences > Settings > Workspace: 이곳에서 설정한 항목은 현재 프로젝트에만 적용(User 설정을 덮어씌움)
    - Search settings 에서 `Files: Readonly Include` 검색
      + Add Pattern > `workspace-ins/**` 입력한 후 OK 선택
      + Add Pattern > `sample/**` 입력한 후 OK 선택

### 3.2.4 React 개발용 웹브라우저 플러그인

#### React Developer Tools
* 리액트 컴포넌트 트리를 확인하고 컴포넌트 내부 데이터를 한눈에 볼 수 있어서 디버깅에 도움
* Chrome: 크롬 웹스토어에서 React developer tools로 검색 후 설치
  - <https://chromewebstore.google.com/search/react%20developer%20tools>
* 설치하면 크롬 개발자 도구에 Components 탭이 추가됨



## 3.3 실습 테스트
### 3.3.1. sample 폴더 복사
- 작업 디렉토리 생성
  ```bash
  mkdir workspace
  ```

- sample/01/workspace 폴더 내용을 작업 디렉토리에 복사
  ```bash
  cp -r sample/01/workspace/* ./workspace/
  ```

- 완성된 강사의 코드는 [workspace-ins](<https://github.com/FEBC-15/react/tree/main/workspace-ins>) 폴더에서 확인

### 3.3.2 웹 서버 구동
1. VSCode의 터미널로 이동
    * VSCode 하단의 TERMINAL이 보이지 않으면 View > Terminal

2. Live Server 구동
    * 프로젝트 루트에서 실행
    ```bash
    npx live-server workspace
    ```
    + ```Need to install the following packages: live-server@x.x.x Ok to proceed? (y)``` 메세지가 나올 경우 엔터 눌러서 설치

### 3.3.3 테스트
* 웹 브라우저로 접속
  - <http://127.0.0.1:8080>
  - <http://localhost:8080>

* 각 예제 클릭해서 테스트
  - .js: Javascript 문법 관련 실습은 브라우저 개발자 도구 > 콘솔 탭에서 결과 확인
  - .html: DOM, Ajax 관련 실습은 새로운 화면으로 이동 후 테스트
  - Vite로 생성한 프로젝트는 안내 화면을 참고해서 Node.js 환경에서 테스트

# 4. 팁
## 4.1 VSCode에서 소스코드 비교
* 비교할 두개의 파일을 VSCode에서 오픈(예시, student.js, ins.js)
* student.js 파일이 활성화 되어있는 상태에서
* View > Command Palette (단축키 F1) > File: Compare Active File With... 선택
* 비교할 대상 파일 선택(ins.js)
* student.js <-> ins.js 파일의 차이점 쉽게 확인 가능

# 5. 참고 사이트

## 초보자를 위한 리액트
* <https://react.vlpt.us>

## 온라인 코드 편집기(HTML, CSS, JS)
* CodePen: <https://codepen.io>

## 웹 기반 React 개발
* Codesandbox: <https://codesandbox.io>
* Stackblitz: <https://stackblitz.com>

## 바벨 REPL
* <https://babeljs.io/repl>

## React 공식 문서
* <https://ko.react.dev>

## JSX 변환기 (HTML을 JSX로 변환)
* <https://transform.tools/html-to-jsx>

## 객체 불변성 라이브러리 immer
* <https://immerjs.github.io/immer>

## props의 타입 검증을 위한 PropTypes
* <https://www.npmjs.com/package/prop-types>

## Form 입력값 검증을 위한 react-hook-form
* <https://react-hook-form.com>

## 정규표현식 테스트
* <https://regexr.com>

## Recoil
* <https://recoiljs.org/ko>

## Zustand
* <https://zustand.docs.pmnd.rs>

## Redux (한국어)
* <https://ko.redux.js.org>

## React Redux
* <https://react-redux.js.org>

## Redux Toolkit
* <https://redux-toolkit.js.org>

## API Client
### Postman
* 홈페이지: <https://www.postman.com>
* 다운로드: <https://www.postman.com/downloads>
* 문서: <https://learning.postman.com/docs>

### Bruno
* 홈페이지: <https://www.usebruno.com>
* 다운로드: <https://www.usebruno.com/downloads>
* 문서: <https://docs.usebruno.com/introduction>

