import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
// import "../../index.css";

const Home = () => {
  const [fechaActual, setFechaActual] = useState("");

  useEffect(() => {
    const fecha = new Date();
    const formatoFecha = fecha.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setFechaActual(formatoFecha);
  }, []);

  return (
    <div>
      {/* Navbar superior */}
      <header className="navbar">
        <span className="nav-left">Agustin Nazer, Coderhouse, Comisión 67995</span>
        <span className="nav-center">Gestión de Stock v1: Java + Spring</span>
        <span className="nav-right">{fechaActual}</span>
      </header>

      {/* Contenido principal */}
      <div className="container">
        <h1 className="title">Tu gestión de stock</h1>
        <nav className="nav">
          <ul>
            <li>
              <Link to="/users">Ver Usuarios</Link>
            </li>
            <li>
              <Link to="/products">Ver Productos</Link>
            </li>
            <li>
              <Link to="/categories">Ver Categorias</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Home;
