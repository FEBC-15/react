import Footer from '@components/Footer';
import Header from '@components/Header';
import Todo from '@pages/Todo';

function App(){
  console.log('App 렌더링');
  return (
    <div id="todo">
      <Header />
      <Todo />
      <Footer />
    </div>
  );
}

export default App
