"use client";

import { Inter } from "next/font/google";
import { useState } from "react";
import "../globals.css";
import ThemeContext from "../_contexts/Theme";
import { Navbar } from "../_components/Navbar";
import ArrayInputContext from "../_contexts/ArrayInput";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [theme, setTheme] = useState("light");
  const [arrayInput, setArrayInput] = useState([4, 2, 6, 3, 1, 9]);

  return (
    <html lang="en" className={`${theme === "dark" ? "dark" : ""}`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Learn algorithms by interacting with them!"
        />
        <link rel="manifest" href="/manifest.json" />
        <title>AlgoDoodle</title>
      </head>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <ArrayInputContext.Provider value={{ arrayInput, setArrayInput }}>
          <body
            className={`${inter.className} min-h-screen  overflow-x-hidden transition-all dark:bg-gray-950 dark:text-gray-200`}
          >
            <div className="min-h-screen bg-main-bg dark:bg-main-bg-dark">
              <Navbar />
              {children}
            </div>
          </body>
        </ArrayInputContext.Provider>
      </ThemeContext.Provider>
    </html>
  );
}
