import type { Metadata } from 'next';
import { EB_Garamond } from 'next/font/google';
import '../../globals.css';
import CheckoutHeader from '../../components/CheckoutHeader';
import { CartProvider } from '../../contexts/CartContext';

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  variable: '--font-eb-garamond'
});

export const metadata: Metadata = {
  title: 'Veilig Afrekenen - Stonesforhealth',
  description: 'Veilig afrekenen bij Stonesforhealth - Premium kristallen voor jouw welzijn',
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${ebGaramond.variable} min-h-screen bg-[#F5F1E8]`}>
      <CartProvider>
        <CheckoutHeader />
        <main className="flex-grow">
          {children}
        </main>
      </CartProvider>
    </div>
  );
}