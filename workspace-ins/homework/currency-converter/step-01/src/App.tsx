import './App.css';

function App() {
  return (
    <div className="card">
    <h2>환율 계산기</h2>

    <label htmlFor="amount">금액</label>
    <input id="amount" type="number" step="1" />

    <div className="row">
      <div>
        <label htmlFor="from">From</label>
        <select id="from">
          <option value="KRW">KRW</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="JPY">JPY</option>
        </select>
      </div>
      <div>
        <label htmlFor="to">To</label>
        <select id="to">
          <option value="USD">USD</option>
          <option value="KRW">KRW</option>
          <option value="EUR">EUR</option>
          <option value="JPY">JPY</option>
        </select>
      </div>
    </div>

    <div className="row" style={{marginTop: '12px'}}>
      <button id="convert">변환</button>
      <button id="swap" type="button">↺ 교차</button>
    </div>

    <div className="result" id="result">결과: ???</div>
  </div>
  );
}

export default App;