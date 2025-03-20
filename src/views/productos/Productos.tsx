import { useEffect, useState } from "react";
import axios from "axios";
import "../../views/productos/Productos.css"; // Importamos el archivo CSS

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
      } catch (error: any) {
        setError(error.message || "Error al obtener los productos");
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  if (loading) return <p className="loading">Cargando productos...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="products-container">
      <h2 className="title">Lista de Productos</h2>
      <div className="btn-container">
      <a href="/home">
      <button className="btn">Ir al inicio</button>
      </a>
      <a href="/users">
      <button className="btn">Ir a Users</button>
      </a>
      <a href="/categories">
      <button className="btn">Ir a categories</button>
      </a>
      </div>
      <div className="product-list">
        <ul>
          {productos.map((producto) => (
            <li key={producto.id} className="product-item">
              <div className="product-info">
                <strong>{producto.nombre}</strong>
                <p>{producto.descripcion}</p>
              </div>
              <span className="product-price">Precio: ${producto.precio}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Products;
