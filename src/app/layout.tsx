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
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>😼</text></svg>"
        />
      </head>
      <body className={`${serif.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
