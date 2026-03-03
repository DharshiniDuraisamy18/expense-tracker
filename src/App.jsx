import { useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import Dashboard from "./components/Dashboard";
import "./App.css";

function App() {
  const [records, setRecords] = useState([]);

  return (
    <div className="app-wrapper">
      <header className="app-header">
        <div className="header-logo">🌿</div>
        <div>
          <h1>ExpenseIQ</h1>
          <p className="tagline">Your calm finance companion</p>
        </div>
      </header>

      <div className="main-grid">
        <ExpenseForm records={records} setRecords={setRecords} />
        <Dashboard records={records} />
      </div>

      <footer className="app-footer">© 2025 ExpenseIQ · Stay calm, stay on track</footer>
    </div>
  );
}

export default App;