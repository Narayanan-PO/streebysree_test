'use client';

import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CartDrawer() {
  const { cart, isCartOpen, closeCart, addToCart, decreaseQuantity } = useCart();
  
  // Track which items in the cart are selected for checkout
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);

  // Automatically check new items when they are added to the cart
  useEffect(() => {
    setSelectedItemIds(prev => {
      // Find items in the cart that aren't in our selected list yet
      const newIds = cart.map(item => item.id).filter(id => !prev.includes(id));
      // Add them to the selection
      return [...prev, ...newIds];
    });
  }, [cart.length]); 

  if (!isCartOpen) return null;

  // Toggle checkbox state
  const toggleSelection = (id: string) => {
    setSelectedItemIds(prev => 
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  // Only calculate totals and prepare checkout for SELECTED items
  const selectedItems = cart.filter(item => selectedItemIds.includes(item.id));
  const cartTotal = selectedItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  // --- UPDATED CHECKOUT FUNCTION ---
  const handleCheckout = () => {
    if (selectedItems.length === 0) return;

    let message = "Hello Stree by Sree! ✦%0A%0AI would like to place an order for the following items:%0A%0A";
    
    selectedItems.forEach((item) => {
      message += `✧ ${item.quantity}x ${item.name} - ₹${item.price * item.quantity}%0A`;
    });

    message += `%0A*Total: ₹${cartTotal}*%0A%0APlease let me know the payment details. Thank you!`;

    // Opens WhatsApp in a new tab with the pre-filled message
    window.open(`https://wa.me/918891027146?text=${message}`, "_blank");
  };

  return (
    <>
      {/* Dark Overlay */}
      <div 
        className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      {/* Sliding Drawer */}
      <div className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col border-l border-stone-200 bg-[#FAF8F5] shadow-2xl transition-transform duration-500">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200 bg-white px-6 py-5">
          <h2 className="text-sm font-medium tracking-widest text-stone-900 uppercase">Your Bag</h2>
          <button onClick={closeCart} className="text-stone-400 hover:text-stone-900 transition-colors text-2xl font-light">
            ×
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 py-8">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <span className="text-4xl text-[#8B5A2B] mb-4">✧</span>
              <p className="text-xs tracking-widest text-stone-500 uppercase font-medium">Your bag is empty</p>
              <button onClick={closeCart} className="mt-8 border-b border-stone-900 pb-1 text-xs font-medium tracking-widest text-stone-900 uppercase hover:text-[#8B5A2B] hover:border-[#8B5A2B] transition-colors">
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="space-y-8">
              {cart.map((item) => (
                <li key={item.id} className="flex gap-4 items-center">
                  
                  {/* --- SELECTION CHECKBOX --- */}
                  <input 
                    type="checkbox"
                    checked={selectedItemIds.includes(item.id)}
                    onChange={() => toggleSelection(item.id)}
                    className="h-4 w-4 cursor-pointer accent-[#8B5A2B] flex-shrink-0"
                    aria-label={`Select ${item.name}`}
                  />

                  <Link href={`/product/${item.id}`} onClick={closeCart} className="h-24 w-20 flex-shrink-0 border border-stone-200 bg-white overflow-hidden">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
                  </Link>

                  <div className="flex flex-1 flex-col justify-between h-full py-1">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <Link href={`/product/${item.id}`} onClick={closeCart} className="text-xs font-medium tracking-wider uppercase text-stone-900 hover:text-[#8B5A2B] transition-colors line-clamp-2">
                          {item.name}
                        </Link>
                        <p className="text-sm font-bold text-stone-900">₹{item.price * item.quantity}</p>
                      </div>
                    </div>

                    <div className="flex items-center w-24 justify-between border border-stone-200 bg-white px-2 py-1 mt-2">
                      <button onClick={() => decreaseQuantity(item.id)} className="text-stone-500 hover:text-stone-900 font-medium px-2 transition-colors">−</button>
                      <span className="text-xs font-medium text-stone-900">{item.quantity}</span>
                      <button onClick={() => addToCart(item)} className="text-stone-500 hover:text-stone-900 font-medium px-2 transition-colors">+</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-stone-200 bg-white px-6 py-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <div className="flex justify-between text-sm font-medium text-stone-900 mb-1 uppercase tracking-widest">
              <p>Selected Subtotal</p>
              <p className="font-bold">₹{cartTotal}</p>
            </div>
            
            <p className="text-[10px] text-stone-500 mb-5 uppercase tracking-wider">
              {selectedItems.length} of {cart.length} items selected
            </p>

            {/* --- DYNAMIC CHECKOUT BUTTON --- */}
            <button 
              onClick={handleCheckout}
              disabled={selectedItems.length === 0}
              className={`w-full py-4 text-xs font-medium tracking-[0.2em] uppercase transition-colors shadow-sm ${
                selectedItems.length === 0 
                  ? "bg-stone-200 text-stone-400 cursor-not-allowed" 
                  : "bg-[#25D366] text-white hover:bg-[#128C7E]" // Using WhatsApp Green for highest conversion
              }`}
            >
              {selectedItems.length === 0 ? "Select Items to Buy" : "Order via WhatsApp"}
            </button>
          </div>
        )}
      </div>
    </>
  );
}