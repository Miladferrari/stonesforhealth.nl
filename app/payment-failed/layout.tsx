import { CartProvider } from "../contexts/CartContext";
import { ToastProvider } from "../contexts/ToastContext";

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