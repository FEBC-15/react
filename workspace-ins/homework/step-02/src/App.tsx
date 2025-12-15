import './App.css';
import Input from './components/common/Input';
import Button from './components/common/Button';
import CurrencyRow from './components/currency/CurrencyRow';
import ResultDisplay from './components/currency/ResultDisplay';

/**
 * 환율 계산기 메인 컴포넌트
 * 
 * 사용자가 입력한 금액을 선택한 통화로 변환하는 기능을 제공합니다.
 * - 금액 입력
 * - 변환할 통화 선택 (From/To)
 * - 환율 변환 실행
 * - 통화 교차 기능
 * 
 * 외부 API (frankfurter.dev)를 사용하여 실시간 환율 정보를 가져옵니다.
 */
function App() {
  
  return (
    <>
      <div className="card">
        <h2>환율 계산기 - step 02</h2>

        <Input id="amount" label="금액" type="number" step="1" value="100" onChange={() => {}} />

        <CurrencyRow
          from="USD"
          to="KRW"
          onFromChange={() => {}}
          onToChange={() => {}}
        />

        <div className="row" style={{ marginTop: '12px' }}>
          <Button id="convert" onClick={() => {}}>변환</Button>
          <Button id="swap" type="button" onClick={() => {}}>↺ 교차</Button>
        </div>

        <ResultDisplay result="100 USD = 100000 KRW" />
      </div>
    </>
  );
}

export default App;