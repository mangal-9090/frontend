import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const ProtectedRoute = () => {
  const auth = useContext(AuthContext);
  const isAuthenticated = localStorage.getItem("token");

  if (!isAuthenticated || !auth?.user) {
    return <Navigate to="/login" replace />;
  }

  // 🔹 Prevent Guest Users from Accessing Certain Pages
  if (auth.user.role === "guest") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
