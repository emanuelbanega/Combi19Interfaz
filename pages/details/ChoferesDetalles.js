import React from "react";

export const ChoferesDetalles = ({
  initialState = {
    nombre: "",
    apellido: "",
    mail: "",
    direccion: "",
    numeroDeContacto: "",
  },
  callback
}) => {

  return (
    <div>
      <strong>Nombre:</strong><p>{initialState.nombre}</p><br/>
      <strong>Apellido:</strong><p>{initialState.apellido}</p><br/>
      <strong>Mail:</strong><p>{initialState.mail}</p><br/>
      <strong>Direccion:</strong><p>{initialState.direccion}</p><br/>
      <strong>Numero de contacto:</strong><p>{initialState.numeroDeContacto}</p><br/>
      <button onClick={callback}>Volver</button>
    </div>
  );
};
