import { useEffect, useState } from "react";
import axios from "axios";

interface Product {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
}

const Products = () => {
  const [productos, setProductos] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get<Product[]>("http://localhost:8080/productos");
        setProductos(response.data);
      } catch (error: any) { // Especificamos que el error podría ser cualquier tipo
        setError(error.message || "Error al obtener los productos"); // Muestra un mensaje de error específico si lo tiene
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  if (loading) return <p className="text-center text-gray-500 mt-5">Cargando productos...</p>;
  if (error) return <p className="text-center text-red-500 mt-5">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Lista de Productos</h2>
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-4">
        <ul className="divide-y divide-gray-200">
          {productos.map((producto) => (
            <li key={producto.id} className="p-3 flex flex-col sm:flex-row sm:justify-between">
              <div>
                <strong className="text-gray-800">{producto.nombre}</strong>
                <p className="text-gray-500 text-sm">{producto.descripcion}</p>
              </div>
              <span className="text-gray-600 text-sm">Precio: ${producto.precio}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Products;

