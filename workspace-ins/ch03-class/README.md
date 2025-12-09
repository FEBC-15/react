# 3장 클래스 컴포넌트와 컴포넌트의 라이프 사이클
* 코드 실행(GitHub Page): <https://febc-15.github.io/react/workspace-ins/index.html#03>

# 1. 클래스 컴포넌트란?

* React에서 컴포넌트를 정의하는 방법 중 하나
* ES6 클래스 문법을 사용하여 컴포넌트를 정의
* `Component` 클래스를 상속받아 구현
* 2019년(React 16.8) 함수형 컴포넌트에 Hooks이 도입되기 전까지 React에서 컴포넌트를 정의하는 주요 방법이었음
* 현재는 함수형 컴포넌트와 Hooks를 사용하는 것이 권장되지만, 기존 코드베이스나 특정 상황에서 여전히 사용됨

## 1.1 클래스 컴포넌트의 기본 구조

```jsx
import { Component } from "react";

class ClickMe extends Component {
  render() {
    return (
      <div>
        0 X 1: 0
        <button>클릭</button>
      </div>
    )
  }
}

export default ClickMe;
```

```jsx
import ClickMe from "@/ClickMe";

function App(){
  return (
    <div>
      <h1>01 클래스 컴포넌트</h1>
      <ClickMe />
    </div>
  );
}

export default App;
```

### 주요 특징
* `Component` 클래스를 상속받아야 함
* 반드시 `render()` 메서드를 구현해야 하며, 이 메서드가 JSX를 반환하도록 작성
* `render()` 메서드는 순수 함수여야 함 (부수 효과(side effect)가 없어야 함)

## 1.2 Props 사용하기

* 부모 컴포넌트로부터 전달받은 데이터는 `this.props`를 통해 접근
* props는 Readonly 유틸리티 타입으로 정의되어 있으므로 자식 컴포넌트에서 props의 속성값을 직접 수정하는 건 안됨
  - `단방향 데이터 흐름`이라는 리액트의 핵심 철학을 지키기 위한 규칙
  - 데이터는 부모 -> 자식으로만 흐르고, 자식에서 props 데이터의 변경이 필요하면 부모에게 요청하거나 state로 관리해야 함

### TypeScript에서 Props 타입 지정하기

* TypeScript를 사용할 경우, `Component`에 제네릭 타입 파라미터로 props의 타입을 지정할 수 있음
* `Component<PropsType>` 형태로 사용
* 첫 번째 제네릭 파라미터인 `PropsType`은 `this.props`의 타입 체크에 사용됨

```tsx
import { Component } from "react";

// Props 타입 정의
interface ClickMeProps {
  level: number;
}

class ClickMe extends Component<ClickMeProps> {
  render() {
    return (
      <div>
        0 X { this.props.level }: 0
        <button>클릭</button>
      </div>
    )
  }
}

export default ClickMe;
```

```tsx
import ClickMe from "@/ClickMe";

function App(){
  return (
    <div>
      <h1>01 클래스 컴포넌트</h1>
      <ClickMe level={2} />
      <ClickMe level={5} />
    </div>
  );
}

export default App;
```

## 1.3 State 사용하기

* 컴포넌트 내부에서 관리하는 상태는 `this.state`를 통해 접근
* 상태를 변경할 때는 `this.setState()` 메서드를 사용해야 함
* 상태는 state 변수 하나만 사용 가능해서 여러개의 상태를 관리하려면 객체로 지정
* 함수형 컴포넌트에서는 state 변수를 여러개 사용 가능(useState 훅)

### TypeScript에서 State 타입 지정하기

* TypeScript를 사용할 경우, `Component`에 제네릭 타입 파라미터로 props와 state의 타입을 지정할 수 있음
* `Component<PropsType, StateType>` 형태로 사용
* 두 번째 제네릭 파라미터인 `StateType`은 `this.state`와 `setState()`의 타입 체크에 사용됨

```jsx
import { Component } from "react";

interface ClickMeProps {
  level: number;
}

interface ClickMeState {
  count: number;
}

class ClickMe extends Component<ClickMeProps, ClickMeState> {

  // state의 초기값 지정
  state = { count: 0 };

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  }
  
  render() {
    const result = this.props.level * this.state.count;
    return (
      <div>
        { this.state.count } X { this.props.level }: { result }
        <button onClick={this.increment}>클릭</button>
      </div>
    )
  }
}

export default ClickMe;
```

## 1.4 함수형 컴포넌트와의 차이점

| 특징 | 클래스 컴포넌트 | 함수형 컴포넌트 |
|------|----------------|----------------|
| 문법 | ES6 클래스 | 함수 |
| props 접근 | `this.props` | 함수 매개변수 |
| 상태 관리 | `this.state`, `this.setState()` | `useState()` Hook |
| 코드양 | 상대적으로 많음 | 상대적으로 적음 |
| 생명주기 | 생명주기 메서드 사용 | `useEffect()` Hook |
| 성능 | 최적화 필요 시 `PureComponent` 사용 | `React.memo()` 사용 |

# 2. 컴포넌트 생명 주기

<img src="https://github.com/FEBC-15/react/blob/main/images/lifecycle.png" width="800">

## 1 mounting
* 컴포넌트가 처음으로 DOM에 추가되고 렌더링 되는 단계
* 상태(state)와 속성(props)이 초기화 됨

### 1-1 constructor()
* 컴포넌트 생성시 호출
* super(props)를 호출하지 않으면 this를 사용하지 못하므로 this.state, this.props 사용 불가
* props를 기반으로 상태를 초기화하는 코드 작성
* props를 기반으로 상태를 초기화할 필요가 없으면 생성자를 작성할 필요 없음
  ```js
  constructor(props){
    super(props);
    this.state = { count: props.level };
  }
  ```

### 1-2 static getDerivedStateFromProps(props, state)
* 부모 컴포넌트로부터 전달받은 props를 기반으로 상태를 업데이트 하고 싶을 때 사용
* props나 state 값에 의해서 업데이트되는 새로운 state를 리턴하도록 작성
* 일반적으로 props가 state에 영향을 주는 경우가 많지 않기 때문에 사용할 일은 거의 없음

### 1-3 render()
* JSX를 이용해서 UI를 리턴

### 1-4 componentDidMount() (함수형 컴포넌트에서는 useEffect로 사용 가능)
* 컴포넌트 마운트가 완료되고 브라우저 DOM 트리에 반영되어 화면에 렌더링 된 후 호출됨

## 2 updating
* 마운트 된 컴포넌트의 상태(state)나 속성(props)이 변경되어 리렌더링 되는 단계

### 2-1 static getDerivedStateFromProps(props, state)
* 1-2와 동일

### 2-2 shouldComponentUpdate(nextProps, nextState)
* 렌더링을 계속할지 말지 여부를 결정
* true를 리턴하면 이어서 render 가 호출되고, false를 리턴하면 render를 호출하지 않음
* 생략할 경우 항상 true를 반환
* 인자로 전달되는 nextProps, nextState와 이전값 this.props, this.state를 비교해서 렌더링 여부를 결정할 수 있음
* Component 대신 PureComponent를 상속 받을 경우 이 메서드가 이전과 현재의 props, state를 Object.is() 함수를 사용해 얕은 비교를 하며 바뀌지 않았다면 렌더링 하지 않도록 이미 구현되어 있음

### 2-3 render()
* 1-3과 동일

### 2-4 getSnapshotBeforeUpdate(prevProps, prevState)
* render() 메서드가 호출되어 가상 DOM으로 쓰기 완료되고 브라우저 DOM에 업데이트 되기 전에 호출
* 이 메서드의 리턴값이 2.5 componentDidUpdate()의 세번째 인자로 전달됨

### 2-5 componentDidUpdate(prevProps, prevState, snapshot) (함수형 컴포넌트에서는 useEffect로 사용 가능)
* 브라우저 DOM 업데이트 완료 후
* 현재 속성 this.props, this.state와 이전 값 prevProps, prevState가 다르다면 외부 API 호출 등의 작업 수행
* 2-4 에서 리턴한 값이 세번째 인자 snapshot으로 전달되므로 보통 2-4와 같이 사용됨

## 3 unmounting
* 컴포넌트가 DOM에서 제거되는 단계

### 3-1 componentWillUnmount() (함수형 컴포넌트에서는 useEffect로 사용 가능)
* 컴포넌트가 애플리케이션의 컴포넌트 트리에서 삭제되기 직전에 실행
* 주로 1-4 componentDidMount()와 세트로 사용
  - 웹소켓을 사용할 경우 1-4에서 연결하고 이곳에서 연결 해제
  - 1-4에서 setTimeout()을 호출했다면 이곳에서 clearTimeout()으로 해제

## 라이프 사이클 메소드가 두번씩 호출되는 이유
* Vite로 프로젝트 생성 시 만들어지는 main.jsx의 `<StrictMode>`에 의해서 strict 모드로 동작하며 개발 모드에서만 동작
* `<StrictMode>`를 사용할 경우 라이프사이클 메소드 내에서 발생할 수 있는 상태 관련 버그를 체크 할 수 있도록 의도적으로 두번씩 렌더링함
  - 순수 함수 여부 확인을 위해 컴포넌트를 추가 렌더링
  - 클린업 누락 여부를 체크하기 위해 Effect 추가 실행
  - 더이상 사용되지 않는 API를 사용할 경우 경고 표시
* 리액트의 모든 컴포넌트는 순수 함수임을 가정하기 때문에 동일한 입력에 대해(props, state, context) 동일한 출력(JSX)을 반환해야 함

* <https://ko.react.dev/reference/react/StrictMode>
