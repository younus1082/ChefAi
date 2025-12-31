import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import { AuthProvider } from "./contexts/AuthContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import NotificationToast from "./components/NotificationToast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ChefAI - Your Smart Cooking Assistant",
  description: "AI-powered recipe generation, inventory management, and cooking assistance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 min-h-screen`}>
        <NotificationProvider>
          <AuthProvider>
            <Navigation />
            <main>
              {children}
            </main>
            <NotificationToast />
          </AuthProvider>
        </NotificationProvider>
      </body>
    </html>
  );
}
