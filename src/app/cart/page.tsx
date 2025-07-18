"use client";

import Link from "next/link";
import { useCart } from "../infrastructure/hooks";
import Image from "next/image";
import { Pages } from "../core/application/models/pages.enum";

export default function CartPage() {
  const {
    items,
    total,
    totalQuantity,
    isEmpty,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  if (isEmpty) {
    return (
      <div>
        <h1>Shopping Cart</h1>
        <p>Your cart is empty. 😞</p>
        <Link href={Pages.products}>
          <button>Continue shopping.</button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Shopping cart</h1>
      <p>Total products: {totalQuantity}</p>
      <div>
        {items.map((item) => (
          <div key={item.id}>
            <Image
              src={item.product.image}
              width={80}
              height={80}
              alt={`${item.product.title} image`}
            />
            <div>
              <h3>{item.product.title}</h3>
              <p>${item.product.price}</p>
            </div>
            <div>
              <button onClick={() => decreaseQuantity(item.product.id)}>
                -
              </button>
              <span>Quantity: {item.quantity}</span>
              <button onClick={() => increaseQuantity(item.product.id)}>
                +
              </button>
            </div>
            <div>
              <p>Subtotal: ${item.subtotal.toFixed(2)}</p>
              <button onClick={() => removeFromCart(item.product.id)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div>
        <h2>Total: ${total.toFixed(2)}</h2>
        <Link href={Pages.checkout}>
          <button>Checkout</button>
        </Link>
        <button onClick={clearCart}>Clear cart</button>
        <Link href={Pages.products}>Continue shopping</Link>
      </div>
    </div>
  );
}
