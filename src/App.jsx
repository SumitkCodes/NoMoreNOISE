import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import About from "./pages/About";

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
    localStorage.getItem("adminLoggedIn") === "true"
  );

  useEffect(() => {
    const seenIntro = localStorage.getItem("seenIntro");
    if (seenIntro) setShowIntro(false);
  }, []);

  const closeIntro = () => {
    setShowIntro(false);
    localStorage.setItem("seenIntro", "true");
  };

  const handleAdminLogin = () => {
    setIsAdminLoggedIn(true);
    localStorage.setItem("adminLoggedIn", "true");
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem("adminLoggedIn");
  };

  return (
    <Router>
      <div style={styles.appContainer}>
        <header style={styles.header}>
          <h1 style={styles.title}>NoMoreNoise</h1>
          <nav style={styles.nav}>
            <Link to="/" style={styles.navLink}>
              Home
            </Link>
            <Link to="/about" style={styles.navLink}>
              About
            </Link>
            <Link to="/admin" style={styles.navLink}>
              Admin
            </Link>
          </nav>
        </header>

        <main style={styles.main}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/admin"
              element={<AdminLogin onLogin={handleAdminLogin} />}
            />
            <Route
              path="/admin-dashboard"
              element={
                isAdminLoggedIn ? (
                  <AdminDashboard onLogout={handleAdminLogout} />
                ) : (
                  <p style={{ color: "red" }}>
                    Access Denied. Please log in as Admin.
                  </p>
                )
              }
            />
          </Routes>
        </main>

        <footer style={styles.footer}>
          <p>
            Created by{" "}
            <Link to="/about" style={styles.footerLink}>
              Nandini & Sumit
            </Link>
          </p>
        </footer>

        {showIntro && (
          <div style={styles.introOverlay}>
            <div style={styles.introPopup}>
              <h2>Welcome to NoMoreNoise</h2>
              <p>
                This community-driven app helps you report noise pollution in
                your area easily. Use your microphone to auto-detect noise
                levels in decibels, and your location is captured automatically.
              </p>
              <button style={styles.introButton} onClick={closeIntro}>
                Got it! Let's start
              </button>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

const styles = {
  appContainer: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f5f7fa",
  },
  header: {
    backgroundColor: "#007bff",
    padding: "15px 30px",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    margin: 0,
    fontWeight: "700",
    fontSize: "1.8rem",
  },
  nav: {
    display: "flex",
    gap: 20,
  },
  navLink: {
    color: "white",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "1.1rem",
  },
  main: {
    flex: 1,
    padding: 20,
    maxWidth: 900,
    margin: "auto",
    width: "100%",
  },
  footer: {
    backgroundColor: "#007bff",
    color: "white",
    textAlign: "center",
    padding: 12,
  },
  footerLink: {
    color: "white",
    textDecoration: "underline",
    fontWeight: "600",
  },
  introOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2000,
    padding: 20,
  },
  introPopup: {
    backgroundColor: "white",
    borderRadius: 12,
    maxWidth: 400,
    padding: 30,
    boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
    textAlign: "center",
  },
  introButton: {
    marginTop: 20,
    padding: "10px 18px",
    fontSize: 16,
    borderRadius: 6,
    border: "none",
    backgroundColor: "#007bff",
    color: "white",
    fontWeight: "700",
    cursor: "pointer",
  },
};