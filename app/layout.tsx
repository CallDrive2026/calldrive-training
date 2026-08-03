import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/nav";

export const metadata: Metadata = {
  title: "CallDrive — Sales Training App",
  description: "Practice today. Close tomorrow. Inbound call training for sales, reception, and service teams.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-50 text-neutral-900">
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}
