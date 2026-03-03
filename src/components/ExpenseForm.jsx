import { useState } from "react";

function ExpenseForm({ records, setRecords }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("EXPENSE");

  const addRecord = () => {
    if (!title || !amount) {
      alert("Please enter title & amount");
      return;
    }
    const newRecord = {
      id: Date.now(),
      date: new Date().toLocaleDateString("en-IN", {
        day: "2-digit", month: "short", year: "numeric",
      }),
      title,
      amount: Number(amount),
      type,
    };
    setRecords([newRecord, ...records]);
    setTitle("");
    setAmount("");
  };

  const deleteRecord = (id) => setRecords(records.filter((r) => r.id !== id));

  return (
    <div className="card">
      <h2 className="card-title">
        <span>🌱</span> Add Transaction
      </h2>

      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          placeholder="e.g. Grocery, Salary..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-field"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Amount (₹)</label>
          <input
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label>Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className={`select-field ${type === "EXPENSE" ? "sel-expense" : "sel-profit"}`}
          >
            <option value="EXPENSE">📤 Expense</option>
            <option value="PROFIT">📥 Profit</option>
          </select>
        </div>
      </div>

      <button onClick={addRecord} className="add-btn">+ Add Transaction</button>

      <div className="records-section">
        <h3 className="records-title">Transactions ({records.length})</h3>
        {records.length === 0 ? (
          <div className="empty-state">
            <span>🍃</span>
            <p>No transactions yet.<br />Add one above!</p>
          </div>
        ) : (
          <ul className="records-list">
            {records.map((item) => (
              <li key={item.id} className={`record-item ${item.type === "EXPENSE" ? "rec-expense" : "rec-profit"}`}>
                <span className="rec-icon">{item.type === "EXPENSE" ? "📤" : "📥"}</span>
                <div className="rec-details">
                  <span className="rec-title">{item.title}</span>
                  <span className="rec-date">{item.date}</span>
                </div>
                <span className={`rec-amount ${item.type === "EXPENSE" ? "amt-red" : "amt-green"}`}>
                  {item.type === "EXPENSE" ? "-" : "+"}₹{item.amount.toLocaleString("en-IN")}
                </span>
                <button className="del-btn" onClick={() => deleteRecord(item.id)}>✕</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ExpenseForm;