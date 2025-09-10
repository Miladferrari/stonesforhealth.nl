'use client';

import { usePathname } from "next/navigation";
import Footer from "./Footer";
import SlideInCart from "./SlideInCart";
import ClientOnly from "./ClientOnly";
import StickyHeader from "./StickyHeader";

export default function LayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Pages that should NOT have navbar and footer
  const hideLayoutPages = ['/thank-you', '/payment-failed'];
  const shouldHideLayout = hideLayoutPages.some(page => pathname.startsWith(page));

  if (shouldHideLayout) {
    // For thank-you and payment-failed pages, only show the content
    return <>{children}</>;
  }

  // For all other pages, show navbar and footer
  return (
    <>
      <ClientOnly>
        <StickyHeader />
      </ClientOnly>
      {children}
      <Footer />
      <ClientOnly>
        <SlideInCart />
      </ClientOnly>
    </>
  );
}