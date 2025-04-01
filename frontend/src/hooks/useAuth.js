import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export const useAuth = () => {
  const { currentUser, handleLogin, handleLogout } = useContext(UserContext);

  const login = (userData) => {
    handleLogin(userData); // Now uses correct login function
  };

  const logout = () => {
    handleLogout(); // Now uses correct logout function
  };

  return {
    currentUser,
    login,
    logout,
  };
};
