import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Nav } from "@/components/nav";
import { RegisterServiceWorker } from "@/components/register-sw";

export const metadata: Metadata = {
  title: "CallDrive — Sales Training App",
  description:
    "Practice today. Close tomorrow. Inbound call training for sales, reception, and service teams.",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/icons/apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "CallDrive",
  },
};

export const viewport: Viewport = {
  themeColor: "#B4443A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-50 text-neutral-900">
        <ClerkProvider>
          <RegisterServiceWorker />
          <Nav />
          <main>{children}</main>
        </ClerkProvider>
      </body>
    </html>
  );
}
