import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/common/Header";

export const metadata: Metadata = {
  title: "OlivaPay",
  description: "Simplify Casual Worker Payments and Benefits in Kenya",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <footer className="bg-gray-100">
          <div className="container mx-auto px-4 py-6 text-center">
            <p>&copy; 2024 OlivaPay. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}