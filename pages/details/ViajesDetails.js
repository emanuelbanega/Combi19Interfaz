import React, { useState } from "react";
import { useForm } from "../../hooks/useForm.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const ViajesDetails = ({
  id,
  action,
  callback,
  initialState = {
    ruta: {},
    cantidadAsientos: "",
    precio: "",
  },
  rutas,
  viajes = [],
}) => {
  const [formValues, handleInputChange] = useForm({
    ...initialState,
    ruta: initialState.ruta.id,
  });

  const { ruta, cantidadAsientos, precio } = formValues;
  const [fecha, setFecha] = useState(new Date(initialState.fecha));

  const handleInputChangeDate = (unaFecha) => {
    setFecha(unaFecha);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoViaje = {
      ruta,
      cantidadAsientos: Number(cantidadAsientos),
      fecha,
      precio: Number(precio),
    };
    if (validarDatos(nuevoViaje)) {
      const viajeBuscado = viajes.filter(
        (viaje) =>
          viaje.ruta.id === ruta &&
          viaje.cantidadAsientos === cantidadAsientos &&
          new Date(viaje.fecha).toLocaleDateString() === fecha.toLocaleDateString() &&
          viaje.precio === precio
      );
      viajeBuscado[0] != null
        ? alert("Ya se encuentra un viaje con los mismos datos")
        : operacionExitosa(id, nuevoViaje);
    } else alert("Deben estar todos los campos rellenados");
  };

  const operacionExitosa = (id, nuevoViaje) => {
    action(id, nuevoViaje);
    alert("La operación se realizo con éxito");
    callback();
  };

  const validarDatos = ({ ruta, cantidadAsientos, fecha, precio }) => {
    if (
      ruta === "" ||
      cantidadAsientos === "" ||
      fecha === "" ||
      precio === "" ||
      ruta === "Seleccione una ruta"
    ) {
      return false;
    }
    return true;
  };

  return (
    <div className="form-simple">
      <form onSubmit={handleSubmit}>
        <h3>Informacion del viaje</h3>
        <label>Ruta:</label>
        <select name="ruta" value={ruta} onChange={handleInputChange}>
          <option>Seleccione una ruta</option>
          {rutas.map(({ id, origen, destino }) => {
            return (
              <option key={id} value={id}>
                {origen.nombre},{destino.nombre}
              </option>
            );
          })}
        </select>
        <br />
        <label>Cantidad de asientos:</label>
        <input
          type="text"
          name="cantidadAsientos"
          placeholder="Ingrese la cantidad de asientos"
          autoComplete="off"
          value={cantidadAsientos}
          onChange={handleInputChange}
        />
        <br />
        <label>Fecha:</label>
        <DatePicker
          selected={fecha}
          onChange={handleInputChangeDate}
          dateFormat="dd-MM-yyyy"
        />
        <br />
        <label>Precio:</label>
        <input
          type="text"
          name="precio"
          placeholder="Ingrese un precio"
          autoComplete="off"
          value={precio}
          onChange={handleInputChange}
        />
        <br />
        <button type="submit">Guardar</button>
        <button onClick={callback}>Cancelar</button>
      </form>
    </div>
  );
};
