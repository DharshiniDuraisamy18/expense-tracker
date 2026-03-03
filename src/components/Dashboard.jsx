function Dashboard({ records }) {
  const totalExpense = records.filter(r => r.type === "EXPENSE").reduce((s, r) => s + r.amount, 0);
  const totalProfit  = records.filter(r => r.type === "PROFIT").reduce((s, r) => s + r.amount, 0);
  const net = totalProfit - totalExpense;
  const status = net > 0 ? "PROFIT" : net < 0 ? "LOSS" : "NEUTRAL";
  const total = totalExpense + totalProfit;
  const expPct = total > 0 ? Math.round((totalExpense / total) * 100) : 0;
  const proPct = 100 - expPct;

  return (
    <div className="card dashboard-card">
      <h2 className="card-title"><span>📊</span> Dashboard</h2>

      {records.length === 0 ? (
        <div className="empty-state">
          <span>🌾</span>
          <p>Add transactions to<br />see your report here.</p>
        </div>
      ) : (
        <>
          <div className="stat-block stat-expense">
            <div className="stat-left">
              <p className="stat-label">Total Expense</p>
              <p className="stat-val amt-red">₹{totalExpense.toLocaleString("en-IN")}</p>
            </div>
            <span className="stat-emoji">📤</span>
          </div>

          <div className="stat-block stat-profit">
            <div className="stat-left">
              <p className="stat-label">Total Profit</p>
              <p className="stat-val amt-green">₹{totalProfit.toLocaleString("en-IN")}</p>
            </div>
            <span className="stat-emoji">📥</span>
          </div>

          <div className="progress-wrap">
            <div className="prog-labels">
              <span>📤 Expense {expPct}%</span>
              <span>📥 Profit {proPct}%</span>
            </div>
            <div className="prog-bar">
              <div className="prog-exp" style={{ width: `${expPct}%` }} />
              <div className="prog-pro" style={{ width: `${proPct}%` }} />
            </div>
          </div>

          <div className={`net-banner ${status === "PROFIT" ? "net-profit" : status === "LOSS" ? "net-loss" : "net-neutral"}`}>
            <div>
              <p className="net-label">Net Balance</p>
              <p className="net-val">
                {net < 0 ? "-" : "+"}₹{Math.abs(net).toLocaleString("en-IN")}
              </p>
            </div>
            <div className="net-status">
              <span className="net-emoji">{status === "PROFIT" ? "🌳" : status === "LOSS" ? "🍂" : "🌿"}</span>
              <span className="net-tag">{status}</span>
            </div>
          </div>

          <p className="rec-count">Based on {records.length} transaction{records.length !== 1 ? "s" : ""}</p>
        </>
      )}
    </div>
  );
}

export default Dashboard;