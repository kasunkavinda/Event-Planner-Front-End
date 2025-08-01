import type { Metadata } from "next";
import "../globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Local Event Planner & RSVP Tracker",
  description: "Local Event Planner & RSVP Tracker",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-theme-medium antialiased font-body`}>
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}
