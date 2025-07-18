'use client'
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/atoms';
import { Pages } from '@/app/core/application/models/pages.enum';
import styles from './EmptyCart.module.scss';

export const EmptyCart: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.icon}>🛒</div>
        <h2 className={styles.title}>Tu carrito está vacío</h2>
        <p className={styles.description}>
          No tienes productos en tu carrito. ¡Explora nuestra tienda y encuentra algo increíble!
        </p>
        <Link href={Pages.products} className={styles.shopLink}>
          <Button variant="primary" size="large">
            Continuar Comprando
          </Button>
        </Link>
      </div>
    </div>
  );
};