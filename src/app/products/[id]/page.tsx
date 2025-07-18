'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useProductById } from '@/app/infrastructure/hooks/UseProductById';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  
  const { product, loading, error, refetch } = useProductById(productId);

  if (loading) {
    return (
      <div>
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

  return (
    <div>
      <div>
        <Link 
          href="/products"
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
            <button>
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}