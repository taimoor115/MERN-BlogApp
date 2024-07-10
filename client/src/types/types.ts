import { ReactNode } from "react";

export interface User {
  _id: string;
  username: string;
  createdAt: string;
  email?: string;
}

export interface AuthContextProps {
  user: User | undefined;
  isLoggedIn: boolean;
  isLoading: boolean;
  logout: () => void;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export interface Blogs {
  _id: string;
  title: string;
  image: string;
  content: string;
  category: string;
  tags: string;
  createdAt: string;
}

export interface ShowBlog {
  _id: string;
  title: string;
  image: string;
  content: string;
  category: string;
  tags: string[];
  likes: number[];
  user: User[];
  publishDate: string;
  comments: string[];
  createdAt: string;
  updatedAt: string;
}
