import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Local Event Planner & RSVP Tracker",
  description: "Local Event Planner & RSVP Tracker",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-theme-medium antialiased font-body !bg-primary`}>
        <div className="flex h-screen">
          <div className="flex-1 flex flex-col">
            <main className="flex-1 overflow-auto p-7">
              <div className="bg-secondary p-5 rounded-md">{children}</div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
