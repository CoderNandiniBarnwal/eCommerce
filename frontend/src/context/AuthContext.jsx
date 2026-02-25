//AuthContext

import { createContext, useContext, useEffect, useState } from "react";

const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setuserName] = useState("");
  const [role, setRole] = useState(() => localStorage.getItem("role") || "");
  const [picture, setPicture] = useState();
  const [status, setStatus] = useState("Verifying...");
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const loginUser = (userData) => {
    console.log(userData);
    setUser(userData.data);
    setRole(userData.data.role);
    localStorage.setItem("user", JSON.stringify(userData.data));
    localStorage.setItem("role", userData.data.role);
    localStorage.setItem("accessToken", userData.accessToken);
  };

  useEffect(() => {
    if (user) {
      setRole(user.role);
      localStorage.setItem("role", user.role);
    }
  }, [user]);

  const logoutUser = () => {
    setUser(null);
    setRole("");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("accessToken");
  };
  return (
    <authContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        userName,
        setuserName,
        role,
        setRole,
        picture,
        setPicture,
        status,
        setStatus,
        isLogoutOpen,
        setIsLogoutOpen,
        user,
        setUser,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
export const useAuthContext = () => useContext(authContext);
