import ClickMe from "@/ClickMe";
import { Component } from "react";

class App extends Component {
  render() {
    return (
      <div>
        <h1>02 클래스 컴포넌트 - 함수형 컴포넌트와 같이 사용</h1>
        <ClickMe level={2} />
        <ClickMe level={3} />
      </div>
    );
  }
}

export default App;