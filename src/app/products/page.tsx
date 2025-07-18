'use client';

import Link from "next/link";
import { IProduct } from "../core/application/dto";
import Image from "next/image";
import { useProducts } from "../infrastructure/hooks/useProducts";

export default function ProductsPage() {
  const { products, loading, error, refetch } = useProducts();

  if (loading) {
    return (
      <div>
        <h1>Productos</h1>
        <div>
          <div></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>Productos</h1>
        <div>
          <div>
            <p>{error}</p>
            <button onClick={refetch}>
              Intentar de nuevo
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div>
        <h1>Productos</h1>
        <div>
          <p>No hay productos disponibles</p>
          <button onClick={refetch}>
            Recargar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h1>Productos</h1>
      </div>

      <div>
        {products.map((product: IProduct) => (
          <div key={product.id}>
            <h2>{product.title}</h2>
            <div>
              <Image
                width={200}
                height={200}
                src={product.image}
                alt={`${product.title} image`}
              />
            </div>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <Link href={`/products/${product.id}`}>
              Ver detalles
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
