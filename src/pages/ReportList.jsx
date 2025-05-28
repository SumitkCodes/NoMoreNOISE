import React, { useEffect, useState } from "react";

export default function ReportList({ reports }) {
  const [myReports, setMyReports] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("myReports") || "[]");
    setMyReports(saved);
  }, [reports]);

  if (!reports.length) return <p style={styles.noReports}>No noise reports yet.</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Recent Reports</h2>
      <ul style={styles.list}>
        {reports
          .slice()
          .reverse()
          .map((r) => {
            const isMine = myReports.includes(r._id || r.id);
            return (
              <li
                key={r._id || r.id}
                style={{
                  ...styles.item,
                  backgroundColor: isMine ? "#e0f7fa" : "#fff",
                  borderLeft: isMine ? "6px solid #007bff" : "6px solid transparent",
                }}
                title={isMine ? "Your report" : ""}
              >
                <div>
                  <strong>{r.noiseType.charAt(0).toUpperCase() + r.noiseType.slice(1)}</strong> -{" "}
                  {r.decibels} dB
                </div>
                <div style={styles.location}>
                  Lat: {r.location.latitude.toFixed(4)}, Lon: {r.location.longitude.toFixed(4)}
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 650,
    margin: "0 auto 50px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 12,
    boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
  },
  heading: {
    fontWeight: "700",
    fontSize: 26,
    marginBottom: 20,
    color: "#222",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  item: {
    padding: 15,
    borderRadius: 8,
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    marginBottom: 12,
    transition: "background-color 0.3s ease",
  },
  location: {
    marginTop: 6,
    color: "#555",
    fontSize: 14,
  },
  noReports: {
    textAlign: "center",
    fontSize: 18,
    color: "#666",
    marginTop: 50,
  },
};
