import Link from "next/link";
import { ProductsServices } from "../infrastructure/services/products.service";
import { IProduct } from "../core/application/dto";
import Image from "next/image";


async function getProducts(): Promise<IProduct[]> {
  const productsService = new ProductsServices();
  try {
    return await productsService.getAllProducts();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();
    console.log(products);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Productos</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 shadow-md">
            <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
            <div><Image width={200} height={200} src={product.image} alt={`${product.title} image`} /></div>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-xl font-bold mb-4">${product.price}</p>
            
            <Link 
              href={`/products/${product.id}`}
              target="blank"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Ver detalles
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}