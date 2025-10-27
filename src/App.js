import React, { useEffect, useState } from "react";
import "./App.css"; // ✅ Import the CSS file

function App() {
  const [rates, setRates] = useState({});
  const [amount, setAmount] = useState(1);
  const [target, setTarget] = useState("inr");
  const [result, setResult] = useState(null);
  const [date, setDate] = useState("");

  useEffect(() => {
    fetch("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json")
      .then(res => res.json())
      .then(data => {
        setRates(data.usd);
        setDate(data.date);
      })
      .catch(() => alert("Failed to load rates"));
  }, []);

  const handleConvert = () => {
    const rate = rates[target];
    if (!rate) return alert("Rate not available");
    setResult(amount * rate);
  };

  return (
    <div className="app">
      <div className="converter-box">
        <h2>USD Currency Converter</h2>

        <div className="input-group">
          <input
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            className="input-field"
          />

          <select
            value={target}
            onChange={e => setTarget(e.target.value)}
            className="select-field"
          >
            {Object.keys(rates).map(code => (
              <option key={code} value={code}>
                {code.toUpperCase()}
              </option>
            ))}
          </select>

          <button onClick={handleConvert} className="convert-btn">
            Convert
          </button>
        </div>

        {result && (
          <div className="result">
            <p>
              {amount} USD = <strong>{result.toFixed(2)} {target.toUpperCase()}</strong>
            </p>
            <small>Date: {date}</small>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
