'use client';

import Link from "next/link";
import { IProduct } from "../core/application/dto";
import Image from "next/image";
import { useCart, useProducts } from "../infrastructure/hooks";
import { Pages } from "../core/application/models/pages.enum";

export default function ProductsPage() {
  const { products, loading, error, refetch } = useProducts();
  const {addToCart, isInCart, getItemQuantity, increaseQuantity, decreaseQuantity} = useCart();
  const handleAddToCart = (product: IProduct) => {
    addToCart(product);
  }

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
      <nav style={{ marginTop: '20px' }}>
        <Link href={Pages.cart} >
          <button>
            Cart
          </button>
        </Link>
      </nav>

      <div>
        {products.map((product: IProduct)=> {
          const inCart = isInCart(product.id);
          const quantity = getItemQuantity(product.id);
          return (
            <div key={product.id}>
              <h2>{product.title}</h2>
              <div>
                <Image width={200} height={200} src={product.image} alt={`${product.title} image`}/>
              </div>
              <p>{product.description}</p>
              <p>{product.price}</p>
              <div>
                {inCart ? (
                  <div>
                    <button onClick={()=>decreaseQuantity(product.id)}>-</button>
                    <span>Quantity: {quantity}</span>
                    <button onClick={()=> increaseQuantity(product.id)}>+</button>
                  </div>
                ) : (
                  <button onClick={()=> handleAddToCart(product)}>
                    Add to cart
                  </button>
                )}
              </div>
              <Link href={`/products/${product.id}`}>
                <button style={{ marginTop: '10px', padding: '8px 16px' }}>
                  Ver detalles
                </button>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  );
}
