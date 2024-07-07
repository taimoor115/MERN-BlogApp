import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContextProps, AuthProviderProps, User } from "../../types/types";
import toast from "react-hot-toast";

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | []>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkAuthentication();
  }, [isLoggedIn]);

  const checkAuthentication = async () => {
    setIsLoading(true);
    axios
      .get("http://localhost:3000/me", {
        withCredentials: true,
      })
      .then((res) => {
        setIsLoggedIn(true);
        setUser(res.data);
        setIsLoading(false);
        return;
      })
      .catch((err) => {
        setIsLoggedIn(false);
        setIsLoading(false);
        console.log(err);
      });
  };

  const logout = () => {
    setIsLoading(true);
    axios
      .post("http://localhost:3000/logout", {}, { withCredentials: true })
      .then((res) => {
        setIsLoading(false);
        setIsLoggedIn(false);
        toast.success(res.data.message);
      })
      .catch((err) => {
        setIsLoggedIn(true);
        setIsLoading(false);
        toast.error(err.response.data.error);
        console.log(err);
      });
  };

  const authContextValue: AuthContextProps = {
    isLoggedIn,
    isLoading,
    user,
    setIsLoggedIn,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
