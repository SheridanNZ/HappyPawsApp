import React, { createContext, useState, useContext, useEffect } from "react";
import { useCookies } from "react-cookie";

export const UserContext = createContext(); // Added export here

export const UserProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [currentUser, setCurrentUser] = useState(cookies.user ? JSON.parse(cookies.user) : null);

  useEffect(() => {
    if (cookies.user) {
      setCurrentUser(JSON.parse(cookies.user));
    }
  }, [cookies.user]);

  const handleLogin = (userData) => {
    setCookie("user", JSON.stringify(userData), { path: "/", maxAge: 86400 });
    setCurrentUser(userData);
  };

  const handleLogout = () => {
    removeCookie("user");
    setCurrentUser(null);
  };

  return (
    <UserContext.Provider value={{ currentUser, handleLogin, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};