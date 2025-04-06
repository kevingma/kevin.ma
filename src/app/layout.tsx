import type { Metadata } from "next";
import { Merriweather } from "next/font/google";
import "./globals.css";

const serif = Merriweather({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Kevin Ma",
  description: "Personal website of Kevin Ma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${serif.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
