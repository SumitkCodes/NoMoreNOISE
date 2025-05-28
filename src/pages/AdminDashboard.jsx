import React from "react";
import { useNavigate } from "react-router-dom";
// Fix here: import from Data.js instead of Reports.js
import reports from "../Data/Reports.js";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    navigate("/admin");
  };

  return (
    <div style={styles.container}>
      <h2>Admin Dashboard</h2>
      <button onClick={handleLogout} style={styles.logoutButton}>
        Logout
      </button>

      <h3>Submitted Reports ({reports.length})</h3>
      <ul style={styles.reportList}>
        {reports.map((report) => (
          <li key={report.id} style={styles.card}>
            <p><strong>Location:</strong> {report.location}</p>
            <p><strong>Decibel:</strong> {report.decibel} dB</p>
            <p><strong>Description:</strong> {report.description}</p>
            <p><small>{report.timestamp}</small></p>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    padding: 20,
    maxWidth: 900,
    margin: "auto",
  },
  logoutButton: {
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: 4,
    fontWeight: "bold",
    cursor: "pointer",
    float: "right",
    marginBottom: 20,
  },
  reportList: {
    listStyleType: "none",
    padding: 0,
  },
  card: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#f8f9fa",
    border: "1px solid #ccc",
    borderRadius: 8,
  },
};