"use client";
import { useCart } from "@/app/infrastructure/hooks";
import { CheckoutFormData } from "@/app/lib/validation/form.schema";
import { Button, LoadingState } from "@/components/atoms";
import {
  CheckoutSteps,
  CheckoutSummary,
  EmptyCart,
} from "@/components/molecule";
import { DynamicForm } from "@/components/organisms";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from './page.module.scss';
import { Pages } from "@/app/core/application/models/pages.enum";

export default function CheckoutPage() {
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentStep] = useState(0);
  const [summaryCollapsed, setSummaryCollapsed] = useState(false);
  const { items, total, totalQuantity, isEmpty, clearCart } = useCart();

  const steps = [
    {
      id: "info",
      title: "Información Personal",
      isCompleted: currentStep > 0,
      isActive: currentStep === 0,
    },
    {
      id: "shipping",
      title: "Dirección de Envío",
      isCompleted: currentStep > 1,
      isActive: currentStep === 1,
    },
    {
      id: "payment",
      title: "Método de Pago",
      isCompleted: currentStep > 2,
      isActive: currentStep === 2,
    },
    {
      id: "review",
      title: "Confirmar Pedido",
      isCompleted: false,
      isActive: currentStep === 3,
    },
  ];

  const handleCheckout = async (data: CheckoutFormData) => {
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

  if (loading) {
    return (
      <div className={styles.container}>
        <LoadingState message="Cargando checkout..." />
      </div>
    );
  }

  if(error){
    return (
      <div>
        Ooops I did it again :()
      </div>
    )
  }

  if (isEmpty) {
    return (
      <div className={styles.container}>
        <EmptyCart />
      </div>
    );
  }

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
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>Checkout</h1>
          <div className={styles.headerActions}>
            <Link href={Pages.cart} className={styles.backLink}>
              <Button variant="secondary" size="small">
                ← Volver al carrito
              </Button>
            </Link>
            <span className={styles.itemCount}>
              {totalQuantity} producto{totalQuantity !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        <CheckoutSteps steps={steps} />

        <div className={styles.checkoutContent}>
          <div className={styles.formSection}>
            <DynamicForm
              type="checkout"
              title="Información de Compra"
              onSubmit={handleCheckout}
              isLoading={loading}
              globalError={error}
            />
          </div>
          <div className={styles.summarySection}>
            <CheckoutSummary
              items={items}
              subtotal={total}
              isCollapsed={summaryCollapsed}
              onToggleCollapse={() => setSummaryCollapsed(!summaryCollapsed)}
            />

            <div className={styles.securityNotice}>
              <div className={styles.securityIcon}>🔒</div>
              <div className={styles.securityText}>
                <h4>Compra Segura</h4>
                <p>
                  Tus datos están protegidos con encriptación
                </p>
              </div>
            </div>

            <div className={styles.supportInfo}>
              <h4>¿Necesitas ayuda?</h4>
              <p>Contáctanos:</p>
              <ul>
                <li>📞 +57 (555) 123-4567</li>
                <li>📧 support@ptexito.com</li>
                <li>💬 Chat en vivo disponible 24/7</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
