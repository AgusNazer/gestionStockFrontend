import { useEffect, useState } from "react";
import axios from "axios";
import "../../views/users/Users.css"; // Importamos el archivo CSS

interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  dni: string;
}

const Users = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [mostrarFormulario, setMostrarFormulario] = useState<boolean>(false); // Agregar el estado para mostrar el formulario
  const [mostrarFormularioEdicion, setMostrarFormularioEdicion] = useState<boolean>(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<Usuario | null>(null);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: '',
    apellido: '',
    email: '',
    dni: '',
    edad: 0,
    esAdmin: false,
  });

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get<Usuario[]>("http://localhost:8080/usuarios");
        setUsuarios(response.data);
      } catch (error: any) {
        setError(error.message || "Error al obtener los usuarios");
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNuevoUsuario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCrearUsuario = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8080/usuarios/multiples',
        [nuevoUsuario]
      );
      setUsuarios((prevUsuarios) => [...prevUsuarios, ...response.data]);
      alert('Usuario creado exitosamente');
    } catch (error) {
      setError('Error al crear usuario');
    }
  };

  //editar usuarios
  const handleEditarUsuario = (usuario: Usuario) => {
    setUsuarioSeleccionado(usuario);
    setMostrarFormularioEdicion(true);
  };

  const handleGuardarCambios = async () => {
    if (!usuarioSeleccionado || !usuarioSeleccionado.id) {
      console.log(usuarioSeleccionado);  // Esto debería mostrar el objeto seleccionado
      alert("Usuario no válido");
      return;
    }
  
     // Crear un nuevo objeto sin el id
  const { id, ...usuarioParaActualizar } = usuarioSeleccionado;

  try {
    const response = await axios.put(
      `http://localhost:8080/usuarios/${id}`, // El id va en la URL
      usuarioParaActualizar // Solo envía los campos que quieres actualizar
    );
    
    setUsuarios((prevUsuarios) =>
      prevUsuarios.map((u) => (u.id === id ? response.data : u))
    );
    alert("Usuario actualizado correctamente");
    setMostrarFormularioEdicion(false);
  } catch (error) {
    console.error(error);
    alert("Error al actualizar usuario");
  }
};
  
  

  if (loading) return <p className="loading">Cargando usuarios...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="users-container">
      <h2 className="title">Lista de Usuarios</h2>

      {/* Botones de navegación */}
      <div className="btn-container">
        <a href="/home">
          <button className="btn">Ir al inicio</button>
        </a>
        <a href="/products">
          <button className="btn">Ir a productos</button>
        </a>
        <a href="/categories">
          <button className="btn">Ir a categorías</button>
        </a>
      </div>

      {/* Botón para crear un nuevo usuario */}
      <button className="btn-crear-user" onClick={() => setMostrarFormulario(true)}>
        Crear usuario
      </button>

      {/* Formulario para crear usuario */}
      {mostrarFormulario && (
        <div className="form-container">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={nuevoUsuario.nombre}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={nuevoUsuario.apellido}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={nuevoUsuario.email}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="dni"
            placeholder="DNI"
            value={nuevoUsuario.dni}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="edad"
            placeholder="Edad"
            value={nuevoUsuario.edad}
            onChange={handleInputChange}
          />
          <input
            type="checkbox"
            name="esAdmin"
            checked={nuevoUsuario.esAdmin}
            onChange={() => setNuevoUsuario({ ...nuevoUsuario, esAdmin: !nuevoUsuario.esAdmin })}
          />
          <button onClick={handleCrearUsuario}>Crear</button>
          <button onClick={() => setMostrarFormulario(false)}>Cancelar</button>
        </div>
      )}

      {/* Formulario para editar usuario */}
      {mostrarFormularioEdicion && usuarioSeleccionado && (
        <div className="form-container">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={usuarioSeleccionado.nombre}
            onChange={(e) =>
              setUsuarioSeleccionado({ ...usuarioSeleccionado, nombre: e.target.value })
            }
          />
          <input
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={usuarioSeleccionado.apellido}
            onChange={(e) =>
              setUsuarioSeleccionado({ ...usuarioSeleccionado, apellido: e.target.value })
            }
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={usuarioSeleccionado.email}
            onChange={(e) =>
              setUsuarioSeleccionado({ ...usuarioSeleccionado, email: e.target.value })
            }
          />
          <input
            type="number"
            name="dni"
            placeholder="DNI"
            value={usuarioSeleccionado.dni}
            onChange={(e) =>
              setUsuarioSeleccionado({ ...usuarioSeleccionado, dni: e.target.value })
            }
          />
          <input
            type="number"
            name="edad"
            placeholder="Edad"
            value={usuarioSeleccionado.edad}
            onChange={(e) =>
              setUsuarioSeleccionado({ ...usuarioSeleccionado, edad: +e.target.value })
            }
          />
          <input
            type="checkbox"
            name="esAdmin"
            checked={usuarioSeleccionado.esAdmin}
            onChange={() =>
              setUsuarioSeleccionado({ ...usuarioSeleccionado, esAdmin: !usuarioSeleccionado.esAdmin })
            }
          />
          <button onClick={handleGuardarCambios}>Guardar Cambios</button>
          <button onClick={() => setMostrarFormularioEdicion(false)}>Cancelar</button>
        </div>
      )}

      {/* Listado de usuarios */}
      <div className="user-list">
        <ul>
          {usuarios.map((usuario) => (
            <li key={usuario.id} className="user-item">
              <div className="user-info">
                <strong>{usuario.nombre}</strong>
                <strong>{usuario.apellido}</strong>
                <p>{usuario.email}</p>
                <button onClick={() => handleEditarUsuario(usuario)}>Editar</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Users;
