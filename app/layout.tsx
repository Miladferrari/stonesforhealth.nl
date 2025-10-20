import type { Metadata } from "next";
import { Geist, Geist_Mono, EB_Garamond } from "next/font/google";
import "./globals.css";
// Using Store API enhanced CartContext for proper tax and session management

import { CartProvider } from "./contexts/CartContextStoreAPI";
import { ToastProvider } from "./contexts/ToastContext";
import ClientOnly from "./components/ClientOnly";
import LayoutContent from "./components/LayoutContent";
import GoogleAnalytics from "./components/GoogleAnalytics";
import MetaPixel from "./components/MetaPixel";

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

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Stonesforhealth - Natuurlijke Kristallen & Edelstenen",
  description: "Ontdek de helende kracht van natuurlijke kristallen en edelstenen. 100% authentiek, ethisch gewonnen, met liefde geselecteerd.",
  metadataBase: new URL('https://stonesforhealth.nl'),
  openGraph: {
    title: 'Stonesforhealth - Natuurlijke Kristallen & Edelstenen',
    description: 'Ontdek de helende kracht van natuurlijke kristallen',
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
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${ebGaramond.variable} antialiased bg-white`}
        suppressHydrationWarning
      >
        <GoogleAnalytics />
        <MetaPixel />
        <ToastProvider>
          <CartProvider>
            <LayoutContent>
              {children}
            </LayoutContent>
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
