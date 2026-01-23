import type { Metadata } from "next";
import { Geist, Geist_Mono, EB_Garamond } from "next/font/google";
import "./globals.css";
// Using Store API enhanced CartContext for proper tax and session management

import { CartProvider } from "./contexts/CartContextStoreAPI";
import { ToastProvider } from "./contexts/ToastContext";
import LayoutContent from "./components/LayoutContent";
import GoogleAnalytics from "./components/GoogleAnalytics";
import MetaPixel from "./components/MetaPixel";
import NewsletterPopupContainer from "./components/NewsletterPopupContainer";
import CookieConsent from "./components/CookieConsent";
import UTMTracker from "./components/UTMTracker";

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
    locale: 'nl_NL',
    siteName: 'Stones for Health',
    images: [
      {
        url: '/logo.png',
        width: 1024,
        height: 1024,
        alt: 'Stones for Health - Edelstenen & Kristallen',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stonesforhealth - Natuurlijke Kristallen & Edelstenen',
    description: 'Ontdek de helende kracht van natuurlijke kristallen en edelstenen',
    images: ['/logo.png'],
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
    <html lang="nl">
      <head>
        <meta name="google-site-verification" content="1gGu2xZkDqKZC-kIMouHLY3JaRSVznzVzzBk2vodwro" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#ffffff" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet" />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "ttu5iu9lg1");
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${ebGaramond.variable} antialiased bg-white`}
        suppressHydrationWarning
      >
        <GoogleAnalytics />
        <MetaPixel />
        <CookieConsent />
        <UTMTracker />
        <ToastProvider>
          <CartProvider>
            <LayoutContent>
              {children}
            </LayoutContent>
            <NewsletterPopupContainer />
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
