import { useEffect, useState } from "react";
import axios from "axios";
import "../../views/categories/Categories.css"; // Importamos el archivo CSS

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
        setCategorias(response.data);
      } catch (error: any) {
        setError(error.message || "Error al obtener las categorías");
      } finally {
        setLoading(false);
      }
    };

    fetchCategorias();
  }, []);

  if (loading) return <p className="loading">Cargando categorías...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="categories-container">
      <h2 className="title">Lista de Categorías</h2>
      <div className="btn-container">
      <a href="/home">
      <button className="btn">Ir al inicio</button>
      </a>
      <a href="/users">
      <button className="btn">Ir a Users</button>
      </a>
      <a href="/products">
      <button className="btn">Ir a products</button>
      </a>
      </div>
      <div className="category-list">
        <ul>
          {categorias.map((categoria) => (
            <li key={categoria.id} className="category-item">
              <div className="category-info">
                <strong>{categoria.nombre}</strong>
                <p>Productos:</p>
                <ul>
                  {categoria.productos && categoria.productos.length > 0 ? (
                    categoria.productos.map((producto) => (
                      <li key={producto.id} className="product-info">
                        <strong>{producto.nombre}</strong> - {producto.descripcion} - ${producto.precio}
                      </li>
                    ))
                  ) : (
                    <li className="product-info">No hay productos disponibles</li>
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
