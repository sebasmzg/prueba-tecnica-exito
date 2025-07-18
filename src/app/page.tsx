'use client'
import Link from "next/link";

export default function Home() {
  return (
    <div>Holaa
      <Link href={'/products'}>
        Productos
      </Link>
      </div>
    );
      
}
