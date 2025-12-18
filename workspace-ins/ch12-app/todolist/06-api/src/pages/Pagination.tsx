import { useSearchParams } from 'react-router';

function Pagination() {
  // list?page=2 요청시
  const [ searchParams, setSearchParams ] = useSearchParams();
  const page = Number(searchParams.get('page') || 1);
  
  const handleNextPage = () => {
    // 다음 페이지로 이동
    searchParams.set('page', (page+1).toString());
    setSearchParams(searchParams);
  };
  
  const handlePrevPage = () => {
    // 이전 페이지로 이동
    if (page > 1) {
      searchParams.set('page', (page-1).toString());
      setSearchParams(searchParams);
    }
  };
  
  return (
    <div>
      <button onClick={handlePrevPage}>이전</button>
      <span>{page}</span>
      <button onClick={handleNextPage}>다음</button>
    </div>
  );
}

export default Pagination;