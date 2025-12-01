import Reaction from '../../../reaction.js';

function Header(){
  return (
    Reaction.createElement('header', null,
      Reaction.createElement('h1', null, 'Todo List - 09 컴포넌트를 모듈로 분리 :)'),
      Reaction.createElement('p', null, '파일 경로: ',
        Reaction.createElement('span', { id: 'filepath' }, `ch${location.href.split('/ch')[1]}index.html`)))
  );
}

export default Header;