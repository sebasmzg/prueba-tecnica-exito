'use client'
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/atoms';
import { Pages } from '@/app/core/application/models/pages.enum';
import styles from './HeroSection.module.scss';

export const HeroSection: React.FC = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <h1 className={styles.title}>
              Descubre los
              <span className={styles.highlight}> Mejores Productos</span>
              <br />
              para tu Hogar
            </h1>
            
            <p className={styles.subtitle}>
              Encuentra todo lo que necesitas con la mejor calidad y precios increíbles. 
              Envío gratis en compras mayores a $50.
            </p>
            
            <div className={styles.features}>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>🚚</span>
                <span className={styles.featureText}>Envío gratuito</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>🔄</span>
                <span className={styles.featureText}>Devoluciones fáciles</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>⭐</span>
                <span className={styles.featureText}>Calidad garantizada</span>
              </div>
            </div>
            
            <div className={styles.actions}>
              <Link href={Pages.products} className={styles.primaryLink}>
                <Button variant="primary" size="large" className={styles.primaryButton}>
                  🛍️ Explorar Productos
                </Button>
              </Link>
              
              <Link href="#" className={styles.secondaryLink}>
                <Button variant="secondary" size="large" className={styles.secondaryButton}>
                  🏷️ Ver Ofertas
                </Button>
              </Link>
            </div>
          </div>
          
          <div className={styles.visualContent}>
            <div className={styles.heroImage}>
              <div className={styles.imageContainer}>
                <div className={styles.floatingCard}>
                  <span className={styles.cardIcon}>📦</span>
                  <div className={styles.cardContent}>
                    <span className={styles.cardTitle}>Productos Premium</span>
                    <span className={styles.cardSubtitle}>Calidad garantizada</span>
                  </div>
                </div>
                
                <div className={styles.floatingCard} style={{ animationDelay: '0.5s' }}>
                  <span className={styles.cardIcon}>🚚</span>
                  <div className={styles.cardContent}>
                    <span className={styles.cardTitle}>Envío Rápido</span>
                    <span className={styles.cardSubtitle}>24-48 horas</span>
                  </div>
                </div>
                
                <div className={styles.floatingCard} style={{ animationDelay: '1s' }}>
                  <span className={styles.cardIcon}>💳</span>
                  <div className={styles.cardContent}>
                    <span className={styles.cardTitle}>Pago Seguro</span>
                    <span className={styles.cardSubtitle}>SSL Certificado</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};