import React, { useState, useEffect } from "react";
import { FormViaje } from "../components/formViaje/FormViaje.js";
import {
  listarViajes,
  agregarViaje,
  modificarViaje,
  borrarViaje,
} from "../controllers/ViajeABM.js";
import { listarRutas } from "../controllers/RutaABM.js";
import { ViajesDetails } from "./details/ViajesDetails.js";

export const ViajesScreen = () => {
  const [viajes, setViajes] = useState(["cargando"]);
  const [rutas, setRutas] = useState([]);
  const [stateForm, setStateForm] = useState(false);
  const [modificarForm, setModificarForm] = useState({
    visible: false,
    viajeId: "",
  });

  const obtenerViajesYRutas = () => {
    listarViajes().then((res) => setViajes(res));
    listarRutas().then((res) => setRutas(res));
  };

  useEffect(() => {
    obtenerViajesYRutas();
  }, []);

  const showForm = () => setStateForm(!stateForm);
  const eliminar = (id) => {
    if (window.confirm("Esta seguro que desea eliminar este viaje?")) {
      borrarViaje(id);
      obtenerViajesYRutas();
    }
  };
  const showModificarForm = (id = "") => {
    setModificarForm({
      visible: !modificarForm.visible,
      viajeId: id,
    });
  };

  if (viajes[0] === "cargando") {
    return <h1 className="msgCargando">Cargando...</h1>;
  }

  if (viajes.length === 0) {
    return (
      <>
        <h1>No hay viajes cargados</h1>
        <hr/>
        {stateForm === false ? (
          <button onClick={showForm}>Agregar Viaje</button>
        ) : (
          <FormViaje
            action={agregarViaje}
            callback={() => {
              showForm();
              obtenerViajesYRutas();
            }}
            rutas={rutas}
            viajes={viajes}
          />
        )}
      </>
    );
  }

  return (
    <div className="tabla-container">
      <table>
        <thead>
          <tr>
            <th>Lugar Origen</th>
            <th>Lugar Destino</th>
            <th>Hora</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {viajes.map(
            ({ id, ruta, fecha, estado, cantidadAsientos, precio }) => {
              return modificarForm.visible === true &&
                modificarForm.viajeId === id ? (
                <tr>
                  <td></td>
                  <td></td>
                  <td>
                    <ViajesDetails
                      id={id}
                      action={modificarViaje}
                      callback={() => {
                        showModificarForm(id);
                        obtenerViajesYRutas();
                      }}
                      initialState={{
                        ruta,
                        cantidadAsientos,
                        fecha,
                        precio,
                      }}
                      rutas={rutas}
                      viajes={viajes}
                    />
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              ) : (
                <tr>
                  <td>{ruta.origen.nombre}</td>
                  <td>{ruta.destino.nombre}</td>
                  <td>{ruta.horario}</td>
                  <td>{new Date(fecha).toLocaleDateString()}</td>
                  <td>
                    {estado === 0
                      ? "Pendiente"
                      : estado === 1
                      ? "Activo"
                      : "Finalizado"}
                  </td>
                  <td>
                    <button className="btnes" onClick={() => showModificarForm(id)}>
                      Modificar
                    </button>
                    <button className="btnes" onClick={() => eliminar(id)}>Eliminar</button>
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
      <hr />
      {stateForm === false ? (
        <button className="btnes" onClick={showForm}>Agregar Viaje</button>
      ) : (
        <FormViaje
          action={agregarViaje}
          callback={() => {
            showForm();
            obtenerViajesYRutas();
          }}
          rutas={rutas}
          viajes={viajes}
        />
      )}
    </div>
  );
};
