"use client";
import { useCart } from "@/app/infrastructure/hooks";
import { CheckoutFormData } from "@/app/lib/validation/form.schema";
import { DynamicForm } from "@/components/organisms";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CheckoutPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { clearCart, items, total } = useCart();
  const router = useRouter();
  const handleCheckout = async (data: CheckoutFormData) => {
    const orderSummary = `
        🛒 CONFIRM YOUR ORDER

👤 Customer: ${data.firstName} ${data.lastName}
📧 Email: ${data.email}
📱 Phone: ${data.phone}

📍 Delivery Address:
${data.address}
${data.city}, ${data.department}
Postal Code: ${data.postalCode}

🛍️ Items (${items.length}):
${items
  .map(
    (item) =>
      `• ${item.product.title} x${item.quantity} - $${(
        item.product.price * item.quantity
      ).toFixed(2)}`
  )
  .join("\n")}

💰 TOTAL: $${total}
💳 Payment: ****${data.cardNumber.slice(-4)}

⚠️ Are you sure you want to complete this purchase?`;

    const confirmed = confirm(orderSummary);

    if (!confirmed) {
      console.log("❌ Purchase cancelled by user");
      return; // Salir si el usuario cancela
    }

    setLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      alert(`Payment sucessful ✅🤑
        Thank you ${data.firstName} ${data.lastName}!
            Your order has been processed.

            📧 Confirmation will be sent to: ${data.email}
            📱 Phone: ${data.phone}
            📍 Delivery to: ${data.address}, ${data.city}, ${data.department}
            💳 Card ending in: ****${data.cardNumber.slice(-4)}

            Order details will be sent to your email shortly.`);
      clearCart();
    } catch (err: unknown) {
      setError("Payment failed. Please try again.");
      console.error("Checkout error: ", err);
    } finally {
      setLoading(false);

      setTimeout(() => {
        router.push("/products");
      }, 1000);
    }
  };

  if (items.length === 0) {
    return (
      <div>
        <h1>🛒 Your cart is empty</h1>
        <p>Add some products before checkout</p>
        <button onClick={() => router.push("/products")}>Go to Products</button>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h1>🛒 Secure Checkout</h1>
        <p>Complete your purchase securely</p>
        <div>
          <h3>🛍️ Order Summary</h3>
          {items.map((item, index) => (
            <div key={index}>
              <ul>
                <li>
                  <span>
                    {item.product.title} x{item.quantity}
                  </span>
                  <span>
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </li>
              </ul>
            </div>
          ))}
          <hr />
          <div>
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <DynamicForm
        title="Checkout"
        type="checkout"
        onSubmit={handleCheckout}
        isLoading={loading}
        globalError={error}
      />
    </div>
  );
}
