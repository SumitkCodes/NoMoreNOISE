import React, { useState } from "react";
import AdminLogin from "../components/AdminLogin";
import AdminDashboard from "../components/AdminDashboard";

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return isAuthenticated ? (
    <AdminDashboard />
  ) : (
    <AdminLogin onLogin={setIsAuthenticated} />
  );
};

export default AdminPage;
