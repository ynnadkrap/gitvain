import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [stats, setStats] = useState([]);
  const [error, setError] = useState(null);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [loading, setLoading] = useState(false);

  useEffect(
    () => {
      setError(null);
      setLoading(true);
      fetch(`/stats?date=${date}`)
        .then(res => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error();
          }
        })
        .then(json => {
          setStats(json);
          setLoading(false);
        })
        .catch(err => {
          setLoading(false);
          setError("Error");
        });
    },
    [date]
  );

  return (
    <div className="App">
      Find all activity since:
      <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      {loading && <div>Loading...</div>}
      {!loading &&
        !error && (
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
      {!loading && error && <div>{error}</div>}
    </div>
  );
};

export default App;
