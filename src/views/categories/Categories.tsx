import { useEffect, useState } from "react";
import axios from "axios";

interface Categoria {
  id: number;
  nombre: string;
  productos: { id: number; nombre: string; descripcion: string; precio: number }[];
}

const Categories = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get<Categoria[]>("http://localhost:8080/categorias");
        console.log(response.data); // Verifica la estructura de la respuesta
        setCategorias(response.data);
      } catch (error) {
        setError("Error al obtener las categorías");
      } finally {
        setLoading(false);
      }
    };

    fetchCategorias();
  }, []);

  if (loading) return <p className="text-center text-gray-500 mt-5">Cargando categorías...</p>;
  if (error) return <p className="text-center text-red-500 mt-5">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Lista de Categorías</h2>
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-4">
        <ul className="divide-y divide-gray-200">
          {categorias.map((categoria) => (
            <li key={categoria.id} className="p-3 flex flex-col sm:flex-row sm:justify-between">
              <div>
                <strong className="text-gray-800">{categoria.nombre}</strong>
                <p className="text-gray-500 text-sm">Productos:</p>
                <ul className="pl-4">
                  {/* Verificación de productos */}
                  {categoria.productos && Array.isArray(categoria.productos) && categoria.productos.length > 0 ? (
                    categoria.productos.map((producto) => (
                      <li key={producto.id} className="text-gray-600 text-sm">
                        <strong>{producto.nombre}</strong> - {producto.descripcion} - ${producto.precio}
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-600 text-sm">No hay productos disponibles</li>
                  )}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Categories;
