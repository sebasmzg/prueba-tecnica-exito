import { ProductsServices } from "../../infrastructure/services/products.service";
import { IProduct } from "../../core/application/dto";
import Link from "next/link";

interface ProductPageProps {
  params: { id: number };
}

async function getProduct(id: number): Promise<IProduct | null> {
  const productsService = new ProductsServices();
  try {
    return await productsService.getProductById(id);
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.id);

  if (!product) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-red-600">Producto no encontrado</h1>
        <Link href="/" className="text-blue-500 hover:underline mt-4 inline-block">
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">
        ← Volver a productos
      </Link>
      
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
        <p className="text-gray-600 mb-6">{product.description}</p>
        <p className="text-2xl font-bold text-green-600 mb-6">${product.price}</p>
        
        <button className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors">
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}