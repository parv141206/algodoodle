"use client";

import { Inter } from "next/font/google";
import { useState } from "react";
import "../globals.css";
import ThemeContext from "../_contexts/Theme";
import { Navbar } from "../_components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [theme, setTheme] = useState("light");

  return (
    <html lang="en" className={`${theme === "dark" ? "dark" : ""}`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Web site created using create-next-app"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <title>AlgoDoodle</title>
      </head>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <body
          className={`${inter.className} transition-all dark:bg-gray-950 dark:text-gray-200`}
        >
          <Navbar />
          {children}
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique,
          ipsa molestias temporibus unde sapiente inventore ducimus nostrum amet
          voluptatibus? Ea saepe labore, illum totam dicta praesentium delectus
          eum aliquam doloremque? Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Placeat vitae a aliquam! Voluptatum, culpa minus
          tempore, tenetur nisi iusto rerum non dolorum eum delectus eaque
          veritatis nesciunt dolorem nemo amet! Lorem ipsum dolor sit amet,
          consectetur adipisicing elit. Architecto cumque aut amet consequuntur
          maxime voluptates beatae inventore nesciunt ipsum explicabo quod
          laboriosam error autem a magnam hic vitae vero voluptatem libero quos
          enim commodi adipisci, soluta molestias! Eius explicabo recusandae
          natus. Magni itaque quia asperiores dicta blanditiis pariatur, quam
          tempore velit quo eos, necessitatibus molestiae fuga. Reiciendis
          fugiat dolores repellat, officia eius omnis eveniet praesentium eaque
          possimus vero perferendis laudantium repudiandae magnam maiores
          sapiente, alias ratione nisi voluptatum rem? Natus rerum asperiores
          repellat, eum quasi tempora quidem iste, iure aliquid optio officiis
          sint necessitatibus fuga perferendis, minus eaque accusamus unde.
        </body>
      </ThemeContext.Provider>
    </html>
  );
}
