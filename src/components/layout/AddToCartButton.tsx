'use client';

import { useCart } from "@/context/CartContext";

export default function AddToCartButton({ product }: { product: any }) {
  const { cart, addToCart, decreaseQuantity } = useCart();

  const isOutOfStock = product.Stock === 0 || product.stock === 0;
  const imageUrl = product.Image || product.image || product.image_url || "";

  // Check if this specific item is already sitting in our cart
  const cartItem = cart.find((item) => item.id === product.id);

  const handleAdd = () => {
    addToCart({
      id: product.id,
      name: product.Name,
      price: product.Price,
      image: imageUrl,
      quantity: 1,
    });
  };

  // IF IT IS IN THE CART: Show the + / - selector
  if (cartItem) {
    return (
      <div className="flex flex-1 items-center justify-between border border-blue-950 bg-white px-4 py-3">
        <button 
          onClick={() => decreaseQuantity(product.id)}
          className="px-4 py-1 text-lg font-medium text-blue-950 transition-colors hover:text-amber-700"
        >
          -
        </button>
        <span className="text-sm font-medium tracking-widest text-blue-950">
          {cartItem.quantity} IN CART
        </span>
        <button 
          onClick={handleAdd}
          className="px-4 py-1 text-lg font-medium text-blue-950 transition-colors hover:text-amber-700"
        >
          +
        </button>
      </div>
    );
  }

  // IF IT IS NOT IN THE CART: Show the standard Add button
  return (
    <button 
      onClick={handleAdd}
      disabled={isOutOfStock}
      className="flex-1 bg-blue-950 py-4 text-xs font-medium tracking-[0.2em] text-white uppercase transition-colors hover:bg-blue-900 disabled:bg-gray-300 disabled:cursor-not-allowed"
    >
      {isOutOfStock ? "OUT OF STOCK" : "ADD TO CART"}
    </button>
  );
}