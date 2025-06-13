import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      const roleClaim = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
      setUserRole(decoded[roleClaim]);
    }
  }, [token]);

  const login = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
    const decoded = jwtDecode(token);
    const roleClaim = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
    setUserRole(decoded[roleClaim]);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUserRole(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated, userRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
