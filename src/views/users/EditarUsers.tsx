import { useState } from "react";

const FormularioEditarUsuario = ({ usuario, onGuardar, onCancelar }) => {
  const [usuarioEditado, setUsuarioEditado] = useState(usuario);
 //corregir
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUsuarioEditado({
      ...usuarioEditado,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleGuardarCambios = () => {
    onGuardar(usuarioEditado);
  };

  return (
    <div className="form-container">
      <h3>Editar Usuario</h3>
      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={usuarioEditado.nombre}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="apellido"
        placeholder="Apellido"
        value={usuarioEditado.apellido}
        onChange={handleInputChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={usuarioEditado.email}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="dni"
        placeholder="DNI"
        value={usuarioEditado.dni}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="edad"
        placeholder="Edad"
        value={usuarioEditado.edad}
        onChange={handleInputChange}
      />
      <label>
        <input
          type="checkbox"
          name="esAdmin"
          checked={usuarioEditado.esAdmin}
          onChange={handleInputChange}
        />
        Es Administrador
      </label>
      <button onClick={handleGuardarCambios}>Guardar</button>
      <button onClick={onCancelar}>Cancelar</button>
    </div>
  );
};

export default FormularioEditarUsuario;
