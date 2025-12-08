import { Component } from "react";

// 클래스 컴포넌트를 만드는 방법
// 1. Component를 상속 받는다.
class ClickMe extends Component {
  // 2. render() 메서드를 작성한다.
  render() {
    return (
      <div>
        클릭 횟수 X 1: 0
        <button>클릭</button>
      </div>
    );
  }
}

export default ClickMe;