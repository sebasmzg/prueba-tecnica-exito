'use client'

import { useProductSearch } from '@/app/infrastructure/hooks/UseSearchProduct';
import { useProducts } from '@/app/infrastructure/hooks/UseProducts';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import styles from './NavBar.module.scss';
import { useCart } from '@/app/infrastructure/hooks';
import { Button } from '@/components/atoms';

export const Header = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalQuantity } = useCart();
  const { products } = useProducts();
  const { 
    searchTerm, 
    setSearchTerm, 
    filteredProducts, 
    clearSearch, 
  } = useProductSearch(products || []);
  
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchTerm)}`);
      setShowSearchResults(false);
    }
  };

  const handleProductClick = (productId: number) => {
    router.push(`/products/${productId}`);
    setShowSearchResults(false);
    clearSearch();
  };

  const handleSearchFocus = () => {
    if (searchTerm.length > 0) {
      setShowSearchResults(true);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowSearchResults(value.length > 0);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/" className={styles.logoLink}>
            <span className={styles.logoIcon}>🛍️</span>
            <span className={styles.logoText}>PT Exito</span>
          </Link>
        </div>

        <div className={styles.searchSection} ref={searchRef}>
          <form onSubmit={handleSearch} className={styles.searchForm}>
            <div className={styles.searchContainer}>
              <input
                type="text"
                placeholder="Find your product..."
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={handleSearchFocus}
                className={styles.searchInput}
              />
              <Button
                type="submit"
                variant="primary"
                size="small"
                className={styles.searchButton}
              >
                🔍
              </Button>
            </div>

            {showSearchResults && searchTerm.trim() && (
              <div className={styles.searchResults}>
                {filteredProducts.length > 0 ? (
                  <>
                    {filteredProducts.slice(0, 5).map((product) => (
                      <div
                        key={product.id}
                        className={styles.searchResultItem}
                        onClick={() => handleProductClick(product.id)}
                      >
                        <span className={styles.resultTitle}>{product.title}</span>
                        <span className={styles.resultPrice}>${product.price}</span>
                      </div>
                    ))}
                    {filteredProducts.length > 5 && (
                      <div className={styles.searchResultsMore}>
                        Ver {filteredProducts.length - 5} rmore results...
                      </div>
                    )}
                  </>
                ) : (
                  <div className={styles.noResults}>
                    No products finded for &quot;{searchTerm}&qupt;
                  </div>
                )}
              </div>
            )}
          </form>
        </div>

        <nav className={styles.navigation}>
          <div className={styles.navItems}>
            <Link href="/products" className={styles.navLink}>
              Products
            </Link>
          </div>

          <Link href="/cart" className={styles.cartButton}>
            <span className={styles.cartIcon}>🛒</span>
            {totalQuantity > 0 && (
              <span className={styles.cartBadge}>{totalQuantity}</span>
            )}
          </Link>

          <button
            className={styles.mobileMenuButton}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </nav>

        {isMenuOpen && (
          <div className={styles.mobileMenu}>
            <Link 
              href="/products" 
              className={styles.mobileMenuItem}
              onClick={() => setIsMenuOpen(false)}
            >
              Productos
            </Link>
            <Link 
              href="/cart" 
              className={styles.mobileMenuItem}
              onClick={() => setIsMenuOpen(false)}
            >
              Carrito {totalQuantity > 0 && `(${totalQuantity})`}
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};