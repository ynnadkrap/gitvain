import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [stats, setStats] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [loading, setLoading] = useState(false);

  useEffect(
    () => {
      setLoading(true);
      fetch(`/stats?date=${date}`)
        .then(res => res.json())
        .then(json => {
          setStats(json);
          setLoading(false);
        });
    },
    [date]
  );

  return (
    <div className="App">
      Find all activity since:
      <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      {loading && <div>Loading...</div>}
      {!loading && (
        <table>
          <thead>
            <tr>
              <th>username</th>
              <th>PRs opened</th>
              <th>commits</th>
              <th>comments</th>
              <th>lines added</th>
              <th>lines deleted</th>
            </tr>
          </thead>
          <tbody>
            {stats.map(stat => (
              <tr key={stat.userId}>
                <td>{stat.username}</td>
                <td>{stat.prs}</td>
                <td>{stat.commits}</td>
                <td>{stat.comments}</td>
                <td>{stat.additions}</td>
                <td>{stat.deletions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default App;
