import { CartProvider } from "@/context/CartContext";
import AnnouncementBar from "@/components/layout/AnnouncementBar"; // <-- 1. Import the banner
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/CartDrawer";

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col">
        <AnnouncementBar /> {/* <-- 2. Placed above the Header! */}
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer /> 
      </div>
    </CartProvider>
  );
}