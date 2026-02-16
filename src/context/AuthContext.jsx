import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: null,
    username: null,
    userId: null,
  });

  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) setAuth(JSON.parse(storedAuth));
  }, []);

  const login = (data, remember=false) => {
    const authData = {
      token: data.token,
      username: data.username,
      userId: data.userId,
    };
    setAuth(authData);
    localStorage.setItem("auth", JSON.stringify(authData));
    if (remember) localStorage.setItem("rememberUser", data.username);
  };

  const logout = () => {
    setAuth({ token: null, username: null, userId: null });
    localStorage.removeItem("auth");
  };

  const isAuthenticated = !!auth.token;

  return (
    <AuthContext.Provider value={{ ...auth, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
