import { useEffect, useState } from "react";
import axios from "axios";

interface Usuario {
  id: number;
  nombre: string;
  email: string;
  dni: string;
}

const Users = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get<Usuario[]>("http://localhost:8080/usuarios");
        setUsuarios(response.data);
      } catch (error) {
        setError("Error al obtener los usuarios");
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  if (loading) return <p className="text-center text-gray-500 mt-5">Cargando usuarios...</p>;
  if (error) return <p className="text-center text-red-500 mt-5">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Lista de Usuarios</h2>
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-4">
        <ul className="divide-y divide-gray-200">
          {usuarios.map((usuario) => (
            <li key={usuario.id} className="p-3 flex flex-col sm:flex-row sm:justify-between">
              <div>
                <strong className="text-gray-800">{usuario.nombre}</strong>
                <p className="text-gray-500 text-sm">{usuario.email}</p>
              </div>
              <span className="text-gray-600 text-sm">DNI: {usuario.dni}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Users;
