import { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";

// ✅ Define the AuthContext Type
interface AuthContextType {
  user: any | null;
  register: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  guestLogin: ()=> Promise<void>;
  logout: () => void;
}

// ✅ Provide a default value matching the type
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const navigate = useNavigate();

  // 🔹 Register Function
  const register = async (name: string, email: string, password: string) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/register`, {
        name,
        email,
        password,
      });
      console.log("✅ Registration Successful:", res.data);
      navigate("/login"); // Redirect to login page
    } catch (err:any) {
      console.error("❌ Registration Error:", err.response?.data?.message);
    }
  };

  // 🔹 Login Function
  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email,
        password,
      });
      console.log("✅ Login Successful:", res.data);
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      navigate("/dashboard");
    } catch (err:any) {
      console.error("❌ Login Error:", err.response?.data?.message);
    }
  };

  // 🔹 Guest Login (Limited Access)
  const guestLogin = async () => {
    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/guest-login`);
      console.log("✅ Guest Login Successful:", res.data);
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      navigate("/dashboard");
    } catch (err:any) {
      console.error("❌ Guest Login Error:", err.response?.data?.message);
    }
  };

  // 🔹 Logout Function
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, register, login, guestLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
