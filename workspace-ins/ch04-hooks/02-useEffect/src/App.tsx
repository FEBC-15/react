import Header from "@/components/Header";
import Counter from "@/components/Counter";

function App() {
  console.log('App 호출됨');
  return (
    <>
      <Header />
      <Counter>10</Counter>
    </>
  );
}

export default App;