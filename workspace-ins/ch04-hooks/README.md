# 4장 리액트 훅
* 코드 실행(GitHub Page): <https://febc-15.github.io/react/workspace-ins/index.html#04>

# 1. 리액트 훅이란?

* 컴포넌트가 렌더링되는 동안에만 사용할 수 있는 특별한 함수
* 2019년 리액트 16.8 버전에 추가됨
* 훅을 사용하면 클래스 컴포넌트에서만 가능했던 상태 관리와 생명 주기 이벤트를 함수형 컴포넌트에서도 사용할 수 있게 됨  
* 이로 인해 함수형 컴포넌트의 활용도가 높아졌으며, 클래스 컴포넌트보다 코드가 간결하고 유지보수가 용이해 함수형 컴포넌트 사용이 일반화됨
* 참고: https://ko.react.dev/reference/react/hooks

## 1.1 useState
* 상태값(컴포넌트에서 관리하는 데이터)을 추가하기 위한 훅

### API
```tsx
const [state, setState] = useState(initialState);
```

#### 매개변수
* `initialState`: 상태값의 초기값(초기 렌더링 후 무시됨)

#### 리턴값
* `state`: 저장된 상태값
* `setState`: 상태값을 변경하는 setter 함수
  - setter를 통해 상태가 변경되면 해당 컴포넌트는 다시 렌더링됨

## 1.2 useEffect
* 컴포넌트 생명주기 이벤트를 등록하기 위한 훅
* 클래스 기반 컴포넌트에서는 아래 메소드를 오버라이드해서 구현
  - `componentDidMount()`: 컴포넌트가 마운트 완료되고 브라우저 DOM 트리에 반영된 후 호출
  - `componentDidUpdate()`: 브라우저 DOM 업데이트 완료 후 호출
  - `componentWillUnmount()`: 컴포넌트가 삭제되기 직전에 호출
  - ...
* useEffect에서 주로 구현하는 기능
  - 컴포넌트의 렌더링 작업 외의 부가적인 작업
    + 타이머 설정
    + 로깅
  - 컴포넌트의 렌더링 이후에 처리할 작업
    + DOM 수동 조작
  - side effect가 발생하는 작업(컴포넌트를 순수 함수로 유지)
    + 데이터 fetching

### API
```tsx
useEffect(setup, dependencies?);
```

#### 매개변수
* `setup`: 컴포넌트가 마운트(1-4), 업데이트(2-5), 제거(3-1) 될 때 호출되는 함수
  - `setup`이 함수를 리턴하면, 리턴한 함수를 `cleanup`이라고 부르며, 컴포넌트가 업데이트되거나 언마운트 될 때 호출됨 (cleanup이 먼저 실행되고 setup이 뒤에 실행됨)
  
* `dependencies` (선택): 의존 객체 배열
  - 컴포넌트가 업데이트될 때 `setup` 함수를 호출할지 말지 여부를 결정하는데 사용
  - 컴포넌트가 마운트될 때는 `dependencies` 여부와 상관없이 `setup`이 호출됨
  - `dependencies`를 생략하면, 컴포넌트가 업데이트될 때 항상 `setup`이 호출됨
  - `dependencies`에 빈 배열을 지정하면, 컴포넌트가 업데이트될 때 호출되지 않음
  - `dependencies`를 지정하면, 컴포넌트가 업데이트 될 때 지정한 값 중 하나라도 수정되었을 경우에만 `setup` 함수가 호출됨

## 1.3 useReducer

* `useState`와 비슷하지만, 상태 관리가 더 복잡한 경우에 사용
* `useState`를 사용할 때 컴포넌트 내부에서 상태 변경 로직을 구현해야 하기 때문에 컴포넌트가 복잡해짐
* 컴포넌트 외부에서 상태 관리를 하고 싶을 때 유용
* 여러 컴포넌트가 유사한 상태 관련 로직을 사용할 경우 기능을 공유할 수 있음
* `state` 값은 불변성이 있어 상태 변경의 내역을 추적할 수 있음
* 리듀서는 순수 함수로 만들어야 함
  - 입력 값이 동일하면 출력 값도 동일
  - 외부 값에 영향을 주거나 받으면 안 됨
* 리듀서를 사용하여 애플리케이션 전역 수준의 상태를 관리하는 라이브러리가 `Redux`

### API
```tsx
function reducer(state, action){ ... }
const [state, dispatch] = useReducer(reducer, initialArg, init?);
```

#### 매개변수
* `reducer`: `state`와 `action`을 인자로 받아 새로운 `state`를 반환하는 함수  
  - `state`: 리듀서에 전달되는 상태값  
  - `action`: `dispatch`에 전달한 인자값으로, 수행할 작업의 종류와 필요한 인자값을 포함한 객체
* `initialArg`: 초기 상태로 지정할 값
* `init`(선택): `initialArg`를 인자로 받고, 리턴한 값이 초기 상태로 지정되는 함수

#### 리턴값
* `state`: 상태값이 저장된 getter
* `dispatch`: 상태값을 변경하는 setter 함수. `dispatch`에 전달한 인자값이 `reducer`의 두번째 인자값(`action`)으로 전달됨

### 상태 관리: useState vs. useReducer

#### 코드 크기
* `useReducer`를 사용하면 `reducer` 함수와 `dispatch` 액션을 작성해야 하기 때문에 기본적으로 코드 크기가 `useState`를 사용할 때보다 많아짐
  ```tsx
  const TodoReducer = function(state, action) {
    // 상태 변경 로직
  };
  itemListDispatch({ type: 'TOGGLE', item: { _id }});
  ```

* 여러 이벤트 핸들러가 비슷한 상태 관리 로직을 가지고 있다면 `reducer` 함수에 공통으로 작성해서 코드를 줄일 수 있음
  ```tsx
  const TodoReducer = function(state, action){
    const index = state.findIndex(item => item._id === action.item._id);
    switch(action.type){
      case 'TOGGLE':
        return produce(state, draft => {
          draft[index].done = !draft[index].done;
        });
      default:
      case 'DELETE':
        return produce(state, draft => {
          draft.splice(index, 1);
        });
    }
  };
  ```

#### 가독성
* 상태 변경 로직이 복잡하고 여러 이벤트 핸들러에서 비슷한 로직을 사용해야 한다면, `useState`로 상태를 직접 관리하기보다는 `useReducer`에 상태 변경 로직을 집중시키고 컴포넌트와 분리하면 컴포넌트를 단순화할 수 있음

#### 디버깅
* `useState`는 상태 변경 도중 오류가 발생하면 여러 이벤트 핸들러를 확인해야 하지만, `useReducer`는 상태 변경 로직이 한 곳에 있기 때문에 디버깅이 편함

#### 테스트
* `reducer` 함수는 컴포넌트와 독립적인 순수 함수이기 때문에 따로 테스트가 가능함

#### 타입 안정성
* action의 타입을 명확하게 정의

#### 개인 선호도에 따름

## 1.4 useRef

* 컴포넌트가 다시 렌더링되더라도 기존 상태값을 유지하는 변수를 생성
* 함수 내부에 정의하는 지역 변수는 컴포넌트가 다시 렌더링되면(함수 재호출) 값이 초기화 됨
* `useState`는 값이 변경되면 컴포넌트가 다시 렌더링되지만 `useRef`는 값이 변경되어도 컴포넌트가 다시 렌더링되지 않음
* JSX 태그에 `ref` 속성을 추가하면 브라우저 DOM 엘리먼트에 직접 접근 가능
  - 포커스, 미디어 재생, 애니메이션 실행 등과 같은 작업은 `useRef`를 사용해 브라우저 DOM에 직접 접근하여 제어해야 함

### API
```tsx
const ref = useRef(initialValue);
```

#### 매개변수
* `initialValue`: 초기값

#### 리턴값
* `current`라는 상태값 또는 DOM 요소가 있는 속성 하나가 정의된 객체

### input 요소의 값 지정: useState vs. useRef
#### useState 사용
* value 속성으로 상태값 지정
* 리액트에서 직접 상태관리를 하는 제어 컴포넌트를 구현
* input 값이 변경되는 즉시 리렌더링 되어야 할때
  - 리렌더링이 자주 되므로 오버헤드 발생

##### 예시
```tsx
function App(){
  const [msg, setMsg] = useState('');
  return (
    <>
      <h1>01 useState - 상태 관리</h1>
      <div>
        <input type="text" value={ msg } onChange={ e => setMsg(e.target.value) } />
        <br/>
        <span>입력 메세지: { msg }</span>
      </div>
    </>
  );
}
```

#### useRef 사용
* defaultValue 속성으로 초기값 지정
* 브라우저에서 입력값을 관리하는 비제어 컴포넌트를 구현
* input 값이 변경 되어도 리렌더링 될 필요가 없을때
  - 리렌더링이 되지 않으므로 성능 최적화

##### 예시
```tsx
function Counter() {
  const step = useRef(1);

  return (
    <div id="counter">
      <input type="number" defaultValue={ step.current } onChange={ e => step.current = Number(e.target.value) } />
      <Button color="red">-</Button>
      <Button>0</Button>
      <Button color="blue">+</Button>
      <span>0</span>
    </div>
  );
}
```

## 1.5 useMemo
* 지정한 함수를 호출하여 반환받은 결과값을 내부에 저장(캐싱)하는 함수

### API
```tsx
const calculateValue = function(){ ... };
const cachedValue = useMemo(calculateValue, dependencies);
```

#### 매개변수
* `calculateValue`: 캐싱할 값을 계산하여 반환하는 순수 함수
* `dependencies`: 의존 객체 배열
  - 계산 결과에 영향을 주는 `calculateValue` 함수의 인자값
  - 이 배열의 값이 하나라도 변경되면 `calculateValue` 함수를 다시 호출하고, 변경되지 않으면 캐시된 값을 반환
  - 빈 배열을 지정하면 의존성이 없으므로 매번 캐시된 값을 반환

#### 리턴값
* `calculateValue` 함수를 호출한 결과값
* 다음 렌더링 중에는 `dependencies`가 변경되지 않으면 캐시된 결과를, 변경되었으면 `calculateValue` 함수를 다시 호출한 결과값

### React.memo

* 컴포넌트를 memoize한 후 리렌더링 될 때 props가 변경되지 않으면 memoize된 컴포넌트를 반환
* 컴포넌트가 리렌더링될 때 props가 변경되지 않으면 최종적으로 브라우저 DOM에 쓰기 작업이 이루어지지 않지만, 가상 DOM 생성과 비교 작업에도 리소스가 사용되므로, memoize된 컴포넌트는 성능 향상에 도움을 줄 수 있음
* 리렌더링 될때 눈에띄게 지연이 발생하는 경우 사용

#### API
```tsx
const MemoizedComponent = React.memo(SomeComponent, arePropsEqual?)
```

##### 매개변수
* `SomeComponent`: memoize할 대상 컴포넌트
* `arePropsEqual`(선택): memoize된 컴포넌트를 반환할지, 컴포넌트를 다시 호출할지를 결정하는 함수
  - 컴포넌트의 이전 props 및 새로운 props를 인자로 받는 함수
  - `true`를 반환하면 memoize된 컴포넌트를 사용하고, `false`를 반환하면 컴포넌트를 다시 호출한 결과값을 사용
  - 생략 시 이전 props와 새로운 props를 얕게 비교하여 같으면 `true`, 다르면 `false`를 반환하는 기본 동작

##### 리턴값
* memoize된 `SomeComponent`

#### React.memo 사용 시점

* 컴포넌트 호출 시 시간이 오래 걸리는 연산 작업이 있는 경우  
  - memoize된 컴포넌트를 재사용하면 컴포넌트 호출 횟수를 줄일 수 있음
* 리렌더링될 때 props가 자주 변경되지 않는 컴포넌트
  - props가 자주 변경되는 컴포넌트에는 props를 비교하는 로직이 불필요하게 동작하므로, 오히려 성능에 좋지 않음

#### 고차 함수 (Higher-Order Function)

##### 정의  
* 함수를 인자로 전달받거나 함수를 반환하는 함수.

##### 예시  
* `Array.prototype.forEach`, `Array.prototype.map`, `Array.prototype.findIndex`, `Array.prototype.filter` 등.  

* 리액트에서의 활용  
  - 컴포넌트(함수)를 인자로 받아 공통 로직을 추가한 새로운 컴포넌트를 반환.
  - 중복되는 로직을 고차 함수에 정의하여 컴포넌트별로 재사용 가능.
  - `React.memo`가 대표적인 고차 함수.

## 1.6 useCallback

* 컴포넌트 내부에서 정의한 함수를 캐시
* 컴포넌트가 다시 렌더링되더라도 함수가 다시 생성되지 않고 캐시된 함수를 사용
* 부모가 정의한 이벤트 리스너를 자식에게 props로 전달할 때, 부모가 리렌더링되는 경우 자식도 리렌더링되지만, 이때 props가 바뀌지 않으면 자식은 기존 DOM을 재사용하도록 메모이제이션할 수 있음
  - 이벤트 리스너를 컴포넌트 내부에서 정의하면 부모 컴포넌트가 리렌더링될 때 리스너 함수도 새로 생성되므로 자식에 전달하는 props가 바뀌어 메모이제이션이 되지 않고 자식도 리렌더링이 발생
  - `useCallback()`을 사용하면 부모 컴포넌트가 재호출되어도 리스너가 수정되지 않고 유지되므로 자식도 기존 DOM을 재사용하여 성능이 향상됨

### API
```tsx
const cachedFn = useCallback(fn, dependencies);
```

#### 매개변수
* `fn`: 캐싱할 함수
* `dependencies`: 의존 객체 배열
  - 캐싱된 함수에서 컴포넌트의 변수를 사용할 경우 함수 생성 당시의 값을 참조하고 있기 때문에 이 값이 바뀌면 함수도 다시 생성해야 함. 이 값을 의존성으로 지정하면 의존성이 바뀔 때마다 새로운 함수를 생성하여 반환
  - 빈 배열을 지정하면 의존성이 없으므로 매번 캐시된 함수를 반환

#### 리턴값
* 최초에는 `fn` 함수를 반환하고, 다음 렌더링부터는 `dependencies`가 변하지 않았다면 이전에 반환한 캐시된 함수를, `dependencies`가 변했다면 새로 생성된 `fn` 함수를 반환

### useMemo vs. React.memo vs. useCallback
* `useMemo`는 함수를 인자로 전달하고, 전달된 함수의 실행 결과(리턴값)를 memoize 함
* `React.memo`는 컴포넌트를 인자로 전달하고, 전달된 컴포넌트를 memoize 함
* `useCallback`은 함수를 인자로 전달하고, 전달된 함수를 memoize 함
* 차이점: 함수의 리턴 값 vs. 컴포넌트 vs. 함수 자체

## 1.7 Custom Hook
* 개발자가 직접 작성하는 리액트 훅으로, 리액트의 내장 훅(`useState`, `useEffect` 등)을 이용해 특정 로직을 재사용 가능하게 만든 함수
* 여러 컴포넌트에서 공통으로 사용할 수 있는 상태 관리나 사이드 이펙트 로직을 하나의 훅으로 묶을 수 있음
* 리액트의 내장 훅은 일반 함수에서는 사용할 수 없으므로, 내장 훅을 활용하려면 커스텀 훅을 작성해야 함
* 커스텀 훅의 이름은 리액트 훅임을 명시적으로 나타내기 위해 `useXXX` 형태로 작성하는 것이 권장됨
  - 예: `useFetch`, `useLocalStorage` 등

### Custom Hook의 장점

1. 코드 재사용성: 여러 컴포넌트에서 동일한 로직을 재사용할 수 있음
2. 관심사 분리: 비즈니스 로직을 컴포넌트에서 분리하여 컴포넌트를 더 단순하게 만듦
3. 테스트 용이성: 로직을 독립적으로 테스트할 수 있음
4. 유지보수성: 로직이 한 곳에 모여있어 수정이 용이함
5. 추상화: 복잡한 로직을 간단한 인터페이스로 추상화할 수 있음

## 1.8 훅 사용 시 주의사항
* 클래스 기반 컴포넌트에서는 훅을 사용할 수 없음
  - 훅은 함수형 컴포넌트 전용이며, 상태 관리 및 생명 주기 관련 기능을 함수형 컴포넌트 내에서만 사용할 수 있음
* 훅은 함수 컴포넌트의 최상위에서만 호출해야 함
  - 훅을 반복문, 조건문, 중첩 함수 내에서 호출하면 컴포넌트가 렌더링될 때마다 호출 순서가 달라져서 문제를 일으킬 수 있음
  - 훅의 호출 순서가 바뀌면 리액트는 훅의 상태를 추적할 수 없어서 에러가 발생할 수 있음
* 훅은 항상 동일한 순서로 호출되어야 함
  - 각 렌더링마다 동일한 순서로 훅이 호출되어야 하므로, 조건문이나 반복문 내에서 훅을 호출하는 패턴을 피해야 함

# 2. 리액트 컴파일러
* 참고: https://ko.react.dev/learn/react-compiler

## 2.1 리액트 컴파일러란?

* 리액트 19와 함께 공개된 자동 최적화 도구로, 빌드 시점에 컴포넌트를 분석하여 자동으로 메모이제이션을 적용
* 개발자가 수동으로 `useMemo`, `useCallback`, `React.memo`를 사용하지 않아도 최적화된 코드를 생성

## 2.2 컴파일러 동작 원리
* React Compiler Playground에서 확인
* https://playground.react.dev

## 2.3 설치 및 사용법

### 패키지 설치
```bash
npm install -D babel-plugin-react-compiler@rc
```

### Vite 설정
```js
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          ["babel-plugin-react-compiler", {}]
        ]
      }
    })
  ],
  // ...
});
```

### 리액트 컴파일러를 적용하지 않는 방법
* "use no memo" 지시어 추가
  - "use no memo"는 React 컴파일러에 의해 컴파일되지 않도록 컴포넌트와 Hooks를 선택적으로 제외하는 지시어

## 2.4 사용 시 주의사항

### 리액트의 규칙 준수 필요
* 컴포넌트와 Hook은 순수함수여야 함
* Hook은 최상위에서만 호출
* 조건문, 반복문, 중첩 함수 내에서 Hook 호출 금지
* 렌더링 중 DOM 조작 금지
* 리액트의 규칙 참고: https://ko.react.dev/reference/rules

## 2.5 개발 도구 지원

### React DevTools
* 브라우저 개발자 도구의 Components 탭에서 컴파일러로 최적화된 컴포넌트는 "Memo ✨" 배지로 표시
* 메모이제이션 상태를 시각적으로 확인 가능

# 3. 리액트 19 새로운 훅들

리액트 19에서는 서버 컴포넌트와 폼 처리를 위한 새로운 훅들이 추가됨

## 3.1 use

* Promise와 Context를 조건부로 읽을 수 있는 새로운 API
* 기존 훅과 달리 조건문 안에서도 사용 가능
* Suspense와 연동하여 비동기 데이터 처리를 간소화

### API
```tsx
const value = use(resource);
```

#### 매개변수
* `resource`: Promise 또는 Context 객체
  - Context인 경우: Context의 현재 값을 반환
  - Promise인 경우: Promise가 완료될 때까지 컴포넌트를 일시 중단(suspend)하고, Suspense 경계에서 로딩 UI를 표시

#### 리턴값
* Promise의 결과값 또는 Context의 값


### 사용법
#### use를 사용하여 Context 참조하기
* Context를 use에 전달하면 useContext와 유사하게 Context 값을 읽을 수 있음
* useContext는 컴포넌트나 훅의 탑레벨에서만 사용 가능하지만 use는 조건문, 반복문, 내부 함수 안에서도 사용 가능

#### 예시
* Context를 읽는 경우
```tsx
function Left3({ showCounter = true }) {
  let counterContext = null;
  if(showCounter) {
    // use를 이용하면 조건부로 컨텍스트 구독이 가능하므로 불필요한 리렌더링을 방지할 수 있음
    counterContext = use(CounterContext);
  }
  
  return (
    <div>
      <h3>Left3</h3>
      <span>{ counterContext?.count }</span>
    </div>
  );
}
```

#### use를 사용하여 Promise를 처리하기
* Promise를 use에 전달하면, Promise가 resolve될 때 그 결과값을 읽을 수 있음
* Promise가 reject되면 Error Boundary로 오류를 표시하거나, Promise.catch로 대체값을 제공할 수 있음
* Promise가 pending 상태일 때는 Suspense를 이용해 로딩 중 화면을 표시할 수 있음
* 이 패턴은 주로 서버 컴포넌트에서 Promise를 반환하고, 클라이언트 컴포넌트에서 서버 함수의 비동기 결과를 자연스럽게 읽는 용도로 사용함
* 클라이언트 컴포넌트에서 직접 Promise를 만들어 use에 전달하는 것은 일반적으로 권장되지 않으며, 이 경우 기존의 useEffect와 useState 패턴을 사용하는 것이 더 적합함

#### 예시
* Promise를 읽는 경우
```tsx
import { use } from 'react';

function UserProfile({ userPromise }) {
  const user = use(userPromise);
  
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}

function App() {
  const userPromise = fetchUser();
  
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <UserProfile userPromise={userPromise} />
    </Suspense>
  );
}
```

## 3.2 useFormStatus

* 상위 form 요소의 상태 정보를 제공하는 훅
* 폼이 제출 중인지, 어떤 데이터가 제출되었는지 등을 확인
* form의 자식 컴포넌트에서만 사용 가능하며, 부모 폼의 상태에 접근할 때 유용

### API
```tsx
const { pending, data, method, action } = useFormStatus();
```

#### 매개변수
* 매개변수 없음

#### 리턴값
* `pending`: 상위 form이 제출 중인지 여부 (boolean)
* `data`: 제출된 FormData 객체
* `method`: HTTP 메소드 ('GET' 또는 'POST')
* `action`: form의 action 속성에 전달된 함수 참조

### 예시
```tsx
function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button type="submit" disabled={pending}>
      {pending ? '제출 중...' : '제출'}
    </button>
  );
}

function MyForm() {
  async function handleSubmit(formData) {
    // 폼 제출 로직
    await submitData(formData);
  }

  return (
    <form action={ handleSubmit }>
      <input type="text" name="username" />
      <SubmitButton /> {/* 자식 컴포넌트에서 폼 상태 접근 */}
    </form>
  );
}
```

## 3.3 useActionState

* 폼 액션의 상태를 관리하는 훅
* 폼 제출 후 결과와 pending 상태를 쉽게 관리

### API
```tsx
const [state, formAction, isPending] = useActionState(action, initialState, permalink?);
```

#### 매개변수
* `action`: 폼이 제출될 때 호출될 함수. `(previousState, formData) => Promise<newState>` 형태
* `initialState`: 초기 상태값
* `permalink` (선택): SEO를 위한 고유 페이지 URL

#### 리턴값
* `state`: 현재 상태값
* `formAction`: 폼의 action 속성에 전달할 함수
* `isPending`: 액션이 실행 중인지 여부

### 예시
```tsx
// 이전 상태를 받고 새로운 상태를 반환
async function updateName(previousState, formData) {
  try {
    const name = formData.get('name');
    // 서버에 이름 업데이트 요청
    await updateUserName(name);
    return { message: '이름이 성공적으로 업데이트되었습니다.' };
  } catch (error) {
    return { message: '오류가 발생했습니다.' };
  }
}

function UserForm() {
  const [state, formAction, isPending] = useActionState(updateName, { message: '' });

  return (
    <form action={ formAction }>
      <input type="text" name="name" required />
      <button type="submit" disabled={isPending}>
        {isPending ? '저장 중...' : '저장'}
      </button>
      {state.message && <p>{state.message}</p>}
    </form>
  );
}
```

### useFormStatus와 useActionState 차이점

#### useFormStatus
* form의 자식 컴포넌트에서만 사용 가능한 훅
* 폼 제출 상태(pending, data 등)를 읽기만 할 수 있음
* 자식 컴포넌트에서 부모 폼의 제출 상태를 확인할 때 사용
* 폼 제출 결과나 상태 변경은 직접 관리할 수 없음

#### useActionState
* form 컴포넌트 자체에서 사용하는 훅
* 폼 제출 액션의 결과와 pending 상태를 함께 관리
* formAction에 액션 함수를 전달하여 서버 액션과 쉽게 연동
* isPending 값으로 비동기 처리 상태를 간편하게 확인 가능
* 서버 컴포넌트와 클라이언트 컴포넌트 모두에서 사용할 수 있으며, 폼 제출 후 결과 메시지, 서버 응답 등 액션 중심의 폼 처리에 적합

## 3.4 useOptimistic

* 비동기 요청 중 낙관적 UI 업데이트를 제공하는 훅
* 서버 응답을 기다리지 않고 UI를 먼저 업데이트하여 더 나은 사용자 경험 제공
* 요청이 실패할 경우 자동으로 이전 상태로 롤백

### API
```tsx
const [optimisticState, setOptimisticState] = useOptimistic(state, updateFn);
```

#### 매개변수
* `state`: 실제 상태값
* `updateFn`: 낙관적 업데이트를 위한 함수 `(currentState, optimisticValue) => newState`

#### 리턴값
* `optimisticState`: 낙관적으로 업데이트된 상태값
* `setOptimisticState`: 낙관적 업데이트를 트리거하는 함수

### 예시
```tsx
function TodoList() {
  const axios = useAxiosInstance();
  
  const fetchList = async () => {
    const response = await axios.get('/todolist');
    setData(response.data);
  }

  const [data, setData] = useState<TodoList | null>(null);
  const [optimisticData, setOptimisticData] = useOptimistic(
    data,
    (data, action: {_id: number, newImportant: boolean}) => data ? {
        ...data,
        items: data.items.map(item => 
          item._id !== action._id ? item : { ...item, important: action.newImportant }
        )
      } : data
  );

  // 중요도 버튼 클릭(토글)
  const handleToggleImportant = async (_id: number) => {
    try {
      const currentItem = data?.items.find(item => item._id === _id);
      const newImportant = !currentItem?.important;

      // 즉시 UI 업데이트 (낙관적)
      setOptimisticData({_id, newImportant});

      await axios.patch(`/todolist/${_id}`, { 
        important: newImportant 
      });

      // 성공시 원본 상태 업데이트
      await fetchList();
    } catch(err) {
      console.error(err);
      // 에러 발생 시 자동으로 원본 상태로 롤백됨
    }
  };
  
  return (
    <div>
      {optimisticData?.items.map(item => (
        <div key={item._id}>
          <span>{item.title}</span>
          <button onClick={() => handleToggleImportant(item._id)}>
            {item.important ? '중요' : '일반'}
          </button>
        </div>
      ))}
    </div>
  );
}
```

### 실제 사용 시 주의사항 및 동작 흐름

* 낙관적 업데이트 후 서버 응답 데이터로 원본 상태를 반드시 갱신해야 함
  - 서버 요청 성공 시, 서버에서 받은 최신 데이터로 원본 상태(state)를 업데이트해야 함
  - 그렇지 않으면, useOptimistic이 원본 상태로 리셋되면서 UI가 다시 이전 값으로 돌아감
* 에러가 발생하면 자동으로 롤백됨
  - 서버 요청이 실패하면 원본 상태는 바뀌지 않으므로, 낙관적 UI가 자동으로 원래대로 돌아감
* 낙관적 업데이트는 사용자 경험을 향상시키지만, 서버와의 동기화가 중요함

## 3.5 새로운 훅들의 특징

* 서버 컴포넌트 지원: 리액트 19의 새로운 훅들은 서버 컴포넌트와 함께 작동하도록 설계됨
* 향상된 폼 처리: `useActionState`와 `useFormStatus`는 폼 제출과 상태 관리를 크게 개선
* 더 나은 UX: `useOptimistic`은 즉각적인 피드백으로 사용자 경험을 향상
* 조건부 사용: `use` 훅은 조건문 안에서도 사용할 수 있어 더 유연한 데이터 로딩 가능
* Suspense 통합: `use` 훅은 Suspense와 자연스럽게 연동되어 비동기 데이터 처리를 간소화

