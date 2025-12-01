import Reaction from '../../reaction.js';
import Footer from './components/Footer.js';
import Header from './components/Header.js';
import Todo from './pages/Todo.js';


function App(){
  // 샘플 목록
  const initItemList = [
    { num: 1, title: '자바스크립트 공부', done: true },
    { num: 2, title: 'JS 프로젝트', done: true },
    { num: 3, title: 'React 공부', done: false },
  ];

  // State
  const [ itemList, setItemList ] = Reaction.useState(initItemList);

  // 할일 추가
  function addItem(title){
    console.log('할일 추가');
    // 데이터 갱신, itemList에 item 추가
    // num, title, done 속성을 가진 item 객체 생성
    let lastNum = itemList[itemList.length-1]?.num ?? 0;
    const item = {
      num: lastNum+1,
      title,
      done: false,
    };
    
    // itemList.push(item);
    // setItemList(itemList); // 객체일 경우 주소가 바뀌지 않았기 때문에 상태가 변경된 걸로 인식하지 않음

    const newItemList = [ ...itemList ];
    newItemList.push(item);
    setItemList(newItemList); // 상태 변경
  }

  // 완료/미완료 처리
  function toggleDone(num){
    console.log(num, '완료/미완료');

    // let selectedItem = itemList.find(item => item.num === num);
    // selectedItem.done = !selectedItem.done;
    // setItemList([ ...itemList ]);

    const newItemList = itemList.map(item => item.num === num ? { ...item, done: !item.done } : item);
    setItemList(newItemList);
  }

  // 할일 삭제
  function deleteItem(num){
    console.log(num, '할일 삭제');
    // 데이터 갱신, itemList에서 num에 해당하는 item 삭제
    // 원본 배열에서 작업
    // const index = itemList.findIndex(item => item.num === num);
    // itemList.splice(index, 1);

    const newItemList = itemList.filter(item => item.num !== num);
    setItemList(newItemList);
  }

  return (
    Reaction.createElement('div', { id: 'todo' }, Header, Todo({ itemList, addItem, toggleDone, deleteItem }), Footer)
  );
}

export default App;
