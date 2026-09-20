import type { Metadata } from "next";
import { CartProvider } from "../contexts/CartContextStoreAPI";
import { ToastProvider } from "../contexts/ToastContext";

export const metadata: Metadata = {
  title: "Betaling mislukt | Stones for Health",
  // Transactional page: keep it out of the index
  robots: { index: false, follow: false },
};

export default function PaymentFailedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ToastProvider>
      <CartProvider>
        {/* No header/navbar and no footer - clean focused page */}
        <main className="min-h-screen">
          {children}
        </main>
      </CartProvider>
    </ToastProvider>
  );
}