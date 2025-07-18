'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useProductById } from '../../../infrastructure/hooks/UseProductById';
import { useCart } from '../../../infrastructure/hooks';
import { Pages } from '../../../core/application/models/pages.enum';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  
  const { product, loading, error, refetch } = useProductById(productId);
  const { addToCart, isInCart, getItemQuantity, increaseQuantity, decreaseQuantity } = useCart();

  if (loading) {
    return (
      <div>
        <p>Cargando producto...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div>
          <div>
            <p>{error}</p>
            <button
              onClick={refetch}
              >
              Intentar de nuevo
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div>
        <div>
          <p>Producto no encontrado</p>
          <Link 
            href="/products"
          >
            Volver a productos
          </Link>
        </div>
      </div>
    );
  }

  const inCart = isInCart(product.id);
  const quantity = getItemQuantity(product.id);

  return (
    <div>
      <div>
        <Link 
          href={Pages.products}
        >
          ← Volver a productos
        </Link>
      </div>
      
      <div>
        <div>
          <Image 
            width={500} 
            height={500} 
            src={product.image} 
            alt={product.title}
          />
        </div>
        
        <div>
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <p>${product.price}</p>
          
          <div>
            {
              inCart ? (
                <div>
                  <button onClick={()=> decreaseQuantity(product.id)
                  }>-</button>
                  <span>Quatity: {quantity}</span>
                  <button onClick={()=> increaseQuantity(product.id)}>+</button>
                </div>
              ) : (
                <button onClick={()=> addToCart(product)}>Add to Cart</button>
              )
            }
          </div>
          <Link href={Pages.cart} >
          <button>
            Cart
          </button>
        </Link>
        </div>
      </div>
    </div>
  );
}