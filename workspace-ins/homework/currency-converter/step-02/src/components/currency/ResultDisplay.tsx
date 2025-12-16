/**
 * ResultDisplay 컴포넌트의 Props 인터페이스
 */
interface ResultDisplayProps {
  /** 표시할 변환 결과 문자열 (null일 경우 '???' 표시) */
  result: string | null;
}

/**
 * 환율 변환 결과 표시 컴포넌트
 * 
 * 변환된 환율 결과를 사용자에게 표시합니다.
 * result가 null인 경우 '???'를 표시하여 아직 변환이 수행되지 않았음을 나타냅니다.
 * 
 * @param props - ResultDisplayProps
 * @returns JSX.Element
 */
function ResultDisplay({ result }: ResultDisplayProps) {
  return <div className="result" id="result">결과: {result || '???'}</div>;
}

export default ResultDisplay;
