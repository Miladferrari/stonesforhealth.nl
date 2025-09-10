import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./contexts/CartContext";
import { ToastProvider } from "./contexts/ToastContext";
import ClientOnly from "./components/ClientOnly";
import WebVitals from "./components/WebVitals";
import LayoutContent from "./components/LayoutContent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "123noodklaar.nl - Emergency Preparedness Made Simple",
  description: "Expertly curated emergency kits for families, solo travelers, and pets. Stay prepared with high-quality emergency supplies.",
  metadataBase: new URL('https://123noodklaar.nl'),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: '123noodklaar.nl - Emergency Preparedness Made Simple',
    description: 'Expertly curated emergency kits for families',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
        suppressHydrationWarning
      >
        <ToastProvider>
          <CartProvider>
            <ClientOnly>
              <WebVitals />
            </ClientOnly>
            <LayoutContent>
              {children}
            </LayoutContent>
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
