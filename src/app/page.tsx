'use client'
import Link from "next/link";

export default function Home() {
  return (
    <div>Holaaç
      <Link href={'/products'}>
        Productos
      </Link>
      </div>
    );
      
}
