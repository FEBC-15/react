import Reaction from '../../../reaction.js';

function TodoInput({ addItem }){
  // 추가 버튼 클릭 이벤트 핸들러
  const handleAdd = () => {
    console.log('추가 버튼 클릭');
    // 입력한 제목 꺼내기
    const inputElem = document.querySelector('.todoinput > input');
    if(inputElem.value.trim() !== ''){ // 빈 문자열만 입력한게 아니라면
      addItem(inputElem.value.trim());
      inputElem.value = '';
      inputElem.focus();
    }
  };

  // 엔터 이벤트 핸들러
  const handleAddKeyUp = (event) => {
    console.log('keyup', event);
    if(event.key === 'Enter') handleAdd();
  };

  return (
    Reaction.createElement('div', { class: 'todoinput' },
      Reaction.createElement('input', { type: 'text', autofocus: true, onkeyup: handleAddKeyUp }),
      Reaction.createElement('button', { type: 'button', onclick: handleAdd }, '추가'))
  );
}

export default TodoInput;