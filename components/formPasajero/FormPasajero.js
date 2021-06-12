import React, { useState } from "react";
import { useForm } from "../../hooks/useForm.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const FormPasajero = ({
  action,
  callback,
  initialState = {
    nombre: "",
    apellido: "",
    dni: "",
    mail: "",
    contraseña: "",
    plan: "",
  },
  pasajeros = [],
  choferes = [],
}) => {
  const [formValues, handleInputChange] = useForm(initialState);
  const [fechaDeNacimiento, setFecha] = useState(new Date());
  const { nombre, apellido, dni, mail, contraseña, plan } = formValues;

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoPasajero = {
      nombre,
      apellido,
      dni: Number(dni),
      mail,
      contraseña,
      fechaDeNacimiento,
      plan:false,
    };

    if (validarDatos(nuevoPasajero)) {
      if (pasajeros[0] != null) {
        let pasajeroBuscado = pasajeros.filter((pasajero) => pasajero.mail === mail);
        let choferBuscado = choferes.filter((chofer) => chofer.mail === mail);
        if (pasajeroBuscado[0] != null || choferBuscado[0] != null) {
          alert("Ya se encuentra registrado un usuario con ese mail");
        } else {
          if (contraseña.length > 5) {
            action(nuevoPasajero);
            alert("La operación se realizo con exito");
            callback();
          } else {
            alert("La contraseña debe tener al menos 6 caracteres");
          }
        }
      } else {
        action(nuevoPasajero);
        alert("La operación se realizo con exito");
        callback();
      }
    } else {
      alert("Deben estar todos los campos rellenados");
    }
  };

  const handleInputChangeDate = (fechaDeNacimiento) => {
    setFecha(fechaDeNacimiento);
  };
  
  const validarDatos = ({ nombre, apellido, dni, mail, contraseña, plan}) => {
    if (nombre === "" || apellido === "" || dni.isNaN || mail === "" || contraseña === "" || plan === "Seleccione el tipo de plan") {
      return false;
    }
    return true;
  };

  return (
    <div className="form-simple">
      <form onSubmit={handleSubmit}>
        <h3>Formulario Nuevo Usuario</h3>
        <input
          type="text"
          name="nombre"
          placeholder="Ingrese su nombre"
          autoComplete="off"
          value={nombre}
          onChange={handleInputChange}
        />
        <br />
        <input
          type="text"
          name="apellido"
          placeholder="Ingrese su apellido"
          autoComplete="off"
          value={apellido}
          onChange={handleInputChange}
        />
        <br />
        <input
          type="text"
          name="dni"
          placeholder="Ingrese su dni"
          autoComplete="off"
          value={dni}
          onChange={handleInputChange}
        />
        <br />
        <input
          type="text"
          name="mail"
          placeholder="Ingrese un correo electronico"
          autoComplete="off"
          value={mail}
          onChange={handleInputChange}
        />
        <br />
        <input
          type="text"
          name="contraseña"
          placeholder="Ingrese una contraseña"
          autoComplete="off"
          value={contraseña}
          onChange={handleInputChange}
        />
        <br />
        <DatePicker
          selected={fechaDeNacimiento}
          onChange={handleInputChangeDate}
          dateFormat="dd-MM-yyyy"
        />
        <br />
        <button type="submit">Guardar</button>
        <button onClick={callback}>Cancelar</button>
      </form>
    </div>
  );
};
