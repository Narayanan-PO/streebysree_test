'use client';

import { useCart } from "@/context/CartContext";

export default function AddToCartButton({ product }: { product: any }) {
  const { cart, addToCart, decreaseQuantity } = useCart();

  const isOutOfStock = product.Stock === 0 || product.stock === 0;
  const imageUrl = product.Image || product.image || product.image_url || "";
  const productName = product.Name || product.name || "Product";
  const productPrice = product.Price || product.price || 0;

  const cartItem = cart.find((item) => item.id === product.id);

  const handleAdd = () => {
    addToCart({
      id: product.id,
      name: productName,
      price: productPrice,
      image: imageUrl,
      quantity: 1,
    });
  };

  if (cartItem) {
    return (
      <div style={{ display: 'flex', height: '48px', width: '100%', maxWidth: '300px', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #172554', backgroundColor: '#ffffff', paddingLeft: '16px', paddingRight: '16px' }}>
        <button 
          type="button"
          onClick={() => decreaseQuantity(product.id)}
          style={{ fontSize: '16px', color: '#172554', background: 'none', border: 'none', cursor: 'pointer', padding: '6px' }}
        >
          −
        </button>
        <span style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.2em', color: '#172554', textTransform: 'uppercase' }}>
          {cartItem.quantity} In Cart
        </span>
        <button 
          type="button"
          onClick={handleAdd}
          style={{ fontSize: '16px', color: '#172554', background: 'none', border: 'none', cursor: 'pointer', padding: '6px' }}
        >
          +
        </button>
      </div>
    );
  }

  return (
    <button 
      type="button"
      onClick={handleAdd}
      disabled={isOutOfStock}
      style={{
        display: 'flex',
        height: '48px',
        width: '100%',
        maxWidth: '300px',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: isOutOfStock ? '#d1d5db' : '#172554',
        color: '#ffffff',
        fontSize: '11px',
        fontWeight: 500,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        border: 'none',
        cursor: isOutOfStock ? 'not-allowed' : 'pointer',
        transition: 'background-color 0.3s ease'
      }}
    >
      {isOutOfStock ? "Out of Stock" : "Add to Cart"}
    </button>
  );
}