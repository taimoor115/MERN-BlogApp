import { ReactNode } from "react";

export interface User {
  _id: string;
  username: string;
}

export interface AuthContextProps {
  user: User | [];
  isLoggedIn: boolean;
  isLoading: boolean;
  logout: () => void;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface AuthProviderProps {
  children: ReactNode;
}
