import { createContext, Dispatch, SetStateAction } from "react";

interface ThemeContextType {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export default ThemeContext;
