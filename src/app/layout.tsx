"use client"
// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Provider } from 'react-redux'
import { store } from "@/store/store";
// import SideNavbar from "@/components/sideNavbar";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className
        )}
      >
     
        <Provider store={store}>
        {/* <SideNavbar  /> */}
        {/* main page */}
        <div className="p-4 w-full">
          <Navbar />
          {children}</div>

        </Provider>
      </body>
    </html>
  );
}
