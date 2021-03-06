import React from "react";
import { useForm } from "../../hooks/useForm.js";
import { validarRuta } from "./ValidarRuta.js";

export const RutasDetails = ({
  id,
  action,
  callback,
  initialState = {
    origen: {},
    destino: {},
    combi: {},
    horario: "",
    kilometros: "",
  },
  lugares,
  combis,
  rutas,
  viajes
}) => {
  const [formValues, handleInputChange] = useForm({
    ...initialState,
    origen:initialState.origen.id,
    destino:initialState.destino.id,
    combi:initialState.combi.id
  });
  const { origen, destino, combi, horario, kilometros } = formValues;

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevaRuta = {
      origen,
      destino,
      combi,
      horario,
      kilometros,
    };
    if (validarDatos(nuevaRuta)) {
      const rutaBuscada = rutas.filter((ruta) => ruta.origen.id === origen && ruta.destino.id === destino && ruta.combi.id === combi && ruta.horario === horario && ruta.kilometros === kilometros);
      if(rutaBuscada[0] != null){
         alert("Ya se encuentra una ruta con los mismos datos");
      }else{
        if (origen === destino) {
          alert("Origen y destino no pueden ser iguales");
        } else if(validarRuta({ ...initialState, id: id }, viajes)) {
             action(id, nuevaRuta)
             alert("La operación se realizo con éxito");
             callback();
        } else { alert("La ruta se encuentra asignado a un viaje") }
       }
    } else {
      alert("Deben estar todos los campos rellenados");
    }
  };

  const validarDatos = ({ origen, destino, combi, horario, kilometros }) => {
    if (
      origen === "" ||
      destino === "" ||
      combi === "" ||
      horario === "" ||
      kilometros === "" ||
      origen === "Seleccione un origen" ||
      destino === "Seleccione un destino" ||
      combi === "Seleccione una combi"
    ) {
      return false;
    }
    return true;
  };

  return (
    <div className="form-simple">
      <form onSubmit={handleSubmit}>
        <h3>Informacion de la ruta</h3>
        <label>Origen:</label>
        <select name="origen" value={origen} onChange={handleInputChange}>
          <option>Seleccione un origen</option>
          {lugares.map(({ id, nombre, provincia }) => {
            return (
              <option key={id} value={id}>
                {nombre},{provincia}
              </option>
            );
          })}
        </select>
        <br />
        <label>Destino:</label>
        <select name="destino" value={destino} onChange={handleInputChange}>
          <option>Seleccione un destino</option>
          {lugares.map(({ id, nombre, provincia }) => {
            return (
              <option key={id} value={id}>
                {nombre},{provincia}
              </option>
            );
          })}
        </select>
        <br />
        <label>Combi:</label>
        <select name="combi" value={combi} onChange={handleInputChange}>
          <option>Seleccione una combi</option>
          {combis.map(({ id, modelo, patente }) => {
          return (
              <option key={id} value={id}>
                {modelo},{patente}
              </option>
            );
          })}
        </select>
        <br />
        <label>Horario:</label>
        <input
          type="text"
          name="horario"
          placeholder="Ingrese un horario"
          autoComplete="off"
          value={horario}
          onChange={handleInputChange}
        />
        <br />
        <label>Kilometros:</label>
        <input
          type="text"
          name="kilometros"
          placeholder="Ingrese cant de kilometros"
          autoComplete="off"
          value={kilometros}
          onChange={handleInputChange}
        />
        <br />
        <button type="submit">Guardar</button>
        <button onClick={callback}>Cancelar</button>
      </form>
    </div>
  );
};
