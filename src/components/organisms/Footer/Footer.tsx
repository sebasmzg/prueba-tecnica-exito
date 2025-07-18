'use client'
import React from 'react';
import { Pages } from '@/app/core/application/models/pages.enum';
import styles from './Footer.module.scss';
import { SocialIcon } from '@/components/atoms';
import { FooterSection } from '@/components/molecule';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const companyLinks = [
    { label: 'Acerca de nosotros', href: '/about' },
    { label: 'Nuestra historia', href: '/history' },
    { label: 'Carreras', href: '/careers' },
    { label: 'Prensa', href: '/press' },
    { label: 'Blog', href: '/blog' }
  ];

  const customerServiceLinks = [
    { label: 'Centro de ayuda', href: '/help' },
    { label: 'Contacto', href: '/contact' },
    { label: 'Envíos y devoluciones', href: '/shipping' },
    { label: 'Guía de tallas', href: '/size-guide' },
    { label: 'FAQs', href: '/faq' }
  ];

  const legalLinks = [
    { label: 'Términos y condiciones', href: '/terms' },
    { label: 'Política de privacidad', href: '/privacy' },
    { label: 'Política de cookies', href: '/cookies' },
    { label: 'Derechos del consumidor', href: '/consumer-rights' }
  ];

  const shopLinks = [
    { label: 'Todos los productos', href: Pages.products },
    { label: 'Ofertas especiales', href: '/offers' },
    { label: 'Nuevos productos', href: '/new-arrivals' },
    { label: 'Más vendidos', href: '/bestsellers' },
    { label: 'Liquidación', href: '/clearance' }
  ];

  const socialLinks = [
    { href: 'https://facebook.com', icon: '📘', label: 'Facebook' },
    { href: 'https://instagram.com', icon: '📷', label: 'Instagram' },
    { href: 'https://twitter.com', icon: '🐦', label: 'Twitter' },
    { href: 'https://youtube.com', icon: '📺', label: 'YouTube' },
    { href: 'https://linkedin.com', icon: '💼', label: 'LinkedIn' }
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Main Footer Content */}
        <div className={styles.mainContent}>
          {/* Brand Section */}
          <div className={styles.brandSection}>
            <div className={styles.logo}>
              <h3 className={styles.brandName}>PT Éxito</h3>
              <p className={styles.tagline}>Tu destino para las mejores compras</p>
            </div>
            
            <p className={styles.description}>
              Ofrecemos productos de alta calidad con la mejor experiencia de compra online. 
              Descubre nuestras ofertas exclusivas y disfruta de envíos rápidos y seguros.
            </p>
            
            {/* Social Media */}
            <div className={styles.socialMedia}>
              <h4 className={styles.socialTitle}>Síguenos</h4>
              <div className={styles.socialIcons}>
                {socialLinks.map((social, index) => (
                  <SocialIcon
                    key={index}
                    href={social.href}
                    icon={social.icon}
                    label={social.label}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Links Sections */}
          <div className={styles.linksGrid}>
            <FooterSection title="Tienda" links={shopLinks} />
            <FooterSection title="Empresa" links={companyLinks} />
            <FooterSection title="Atención al Cliente" links={customerServiceLinks} />
            <FooterSection title="Legal" links={legalLinks} />
          </div>

          {/* Newsletter Section */}
          <div className={styles.newsletterSection}>
            
            {/* Contact Info */}
            <div className={styles.contactInfo}>
              <h4 className={styles.contactTitle}>Contacto</h4>
              <div className={styles.contactDetails}>
                <div className={styles.contactItem}>
                  <span className={styles.contactIcon}>📞</span>
                  <span>+57 (604) 123-4567</span>
                </div>
                <div className={styles.contactItem}>
                  <span className={styles.contactIcon}>📧</span>
                  <span>support@sebastian.com</span>
                </div>
                <div className={styles.contactItem}>
                  <span className={styles.contactIcon}>📍</span>
                  <span>123 centro St, Medellin, Antioquia</span>
                </div>
                <div className={styles.contactItem}>
                  <span className={styles.contactIcon}>🕒</span>
                  <span>Lun-Vie: 9AM-6PM, Sáb: 10AM-4PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className={styles.footerBottom}>
          <div className={styles.bottomContent}>
            <p className={styles.copyright}>
              © {currentYear} Jorge Sebastian Muñoz. Todos los derechos reservados.
            </p>
            
            <div className={styles.paymentMethods}>
              <span className={styles.paymentText}>Métodos de pago:</span>
              <div className={styles.paymentIcons}>
                <span className={styles.paymentIcon} title="Visa">💳</span>
                <span className={styles.paymentIcon} title="Mastercard">💳</span>
                <span className={styles.paymentIcon} title="PayPal">🅿️</span>
                <span className={styles.paymentIcon} title="Apple Pay">🍎</span>
                <span className={styles.paymentIcon} title="Google Pay">🅶</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};