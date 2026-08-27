import { Metadata } from "next"; // <-- Added this import
import { CartProvider } from "@/context/CartContext";
import AnnouncementBar from "@/components/layout/AnnouncementBar"; 
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/CartDrawer";

// <-- Added the Metadata block here!
export const metadata: Metadata = {
  title: {
    template: '%s | Stree by Sree',
    default: 'Stree by Sree', 
  },
  description: 'Traditional, lightweight, and anti-tarnish jewellery designed for everyday elegance.',
};

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col">
        <AnnouncementBar /> 
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer /> 
      </div>
    </CartProvider>
  );
}