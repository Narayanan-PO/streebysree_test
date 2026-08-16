'use client';

import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CartDrawer() {
  const { cart, isCartOpen, closeCart, addToCart, decreaseQuantity } = useCart();

  if (!isCartOpen) return null;

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  // --- NEW CHECKOUT FUNCTION ---
  const handleCheckout = () => {
    if (cart.length === 0) return;

    let message = "Hi StreebySree, I would like to place an order for the following items:%0A%0A";
    
    cart.forEach((item) => {
      message += `${item.quantity}x ${item.name} - ₹${item.price * item.quantity}%0A`;
    });

    message += `%0A*Total: ₹${cartTotal}*%0A%0APlease let me know the next steps!`;

    // Opens WhatsApp in a new tab with the pre-filled message
    window.open(`https://wa.me/918891027146?text=${message}`, "_blank");
  };

  return (
    <>
      <div 
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-stone-200 bg-[#FAFAFA] shadow-2xl transition-transform duration-500">
        
        <div className="flex items-center justify-between border-b border-stone-200 px-6 py-4">
          <h2 className="text-sm font-medium tracking-widest text-blue-950 uppercase">Your Cart</h2>
          <button onClick={closeCart} className="text-gray-400 hover:text-blue-950 text-2xl font-light">
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-8">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="text-sm tracking-widest text-gray-500 uppercase">Your cart is empty</p>
              <button onClick={closeCart} className="mt-8 border-b border-blue-950 pb-1 text-xs font-medium tracking-widest text-blue-950 uppercase hover:text-amber-700">
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="space-y-8">
              {cart.map((item) => (
                <li key={item.id} className="flex gap-4">
                  <Link href={`/product/${item.id}`} onClick={closeCart} className="h-24 w-20 flex-shrink-0 border border-stone-100 bg-white overflow-hidden">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover transition-transform hover:scale-105" />
                  </Link>

                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex justify-between">
                        <Link href={`/product/${item.id}`} onClick={closeCart} className="text-sm font-medium text-blue-950 hover:text-amber-700">
                          {item.name}
                        </Link>
                        <p className="text-sm font-medium text-gray-900">₹{item.price * item.quantity}</p>
                      </div>
                    </div>

                    <div className="flex items-center w-24 justify-between border border-stone-200 bg-white px-2 py-1">
                      <button onClick={() => decreaseQuantity(item.id)} className="text-gray-500 hover:text-amber-700 font-medium px-2">-</button>
                      <span className="text-xs font-medium text-blue-950">{item.quantity}</span>
                      <button onClick={() => addToCart(item)} className="text-gray-500 hover:text-amber-700 font-medium px-2">+</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-stone-200 bg-white px-6 py-6">
            <div className="flex justify-between text-sm font-medium text-blue-950 mb-6 uppercase tracking-wider">
              <p>Subtotal</p>
              <p>₹{cartTotal}</p>
            </div>
            {/* --- UPDATED BUTTON --- */}
            <button 
              onClick={handleCheckout}
              className="w-full bg-blue-950 py-4 text-xs font-medium tracking-[0.2em] text-white uppercase transition-colors hover:bg-blue-900"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}