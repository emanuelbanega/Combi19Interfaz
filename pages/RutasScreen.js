import React, { useState, useEffect } from "react";
import { FormRuta } from "../components/formRuta/FormRuta.js";
import { listarCombis } from "../controllers/CombiABM.js";
import { listarLugares } from "../controllers/LugarABM.js";
import {
  agregarRuta,
  modificarRuta,
  borrarRuta,
  listarRutas,
} from "../controllers/RutaABM";
import { listarViajes } from "../controllers/ViajeABM.js";
import { RutasDetails } from "./details/RutasDetails";

export const RutasScreen = () => {
  const [rutas, setRutas] = useState(["cargando"]);
  const [lugares, setLugares] = useState([]);
  const [viajes, setViajes] = useState([]);
  const [combis, setCombis] = useState([]);
  const [state, setState] = useState(false);
  const [state2, setState2] = useState(false);
  const [state3, setState3] = useState({ visible: false, rutaId: "" });

  useEffect(() => {
    listarRutas().then((res) => setRutas(res));
  }, [state, state2, state3]);

  useEffect(() => {
    listarLugares().then((res) => setLugares(res));
  }, []);

  useEffect(() => {
    listarCombis().then((res) => setCombis(res));
  }, []);
  
  useEffect(() => {
    listarViajes().then((res) => setViajes(res));
  }, []);

  const refrescar = () => setState(!state);
  const showForm = () => setState2(!state2);
  const showDetails = (id) =>
    setState3({ visible: !state3.visible, rutaId: id });

  if (rutas[0] === "cargando") {
    return <h1 className="msgCargando">Cargando...</h1>;
  }

  if (rutas.length === 0) {
    return (
      <div>
        <h1>No hay rutas cargadas</h1>
        <hr />
        {state2 ? (
          <FormRuta
            action={agregarRuta}
            callback={showForm}
            lugares={lugares}
            combis={combis}
          />
        ) : (
          <button onClick={showForm}>Agregar Ruta</button>
        )}
      </div>
    );
  }

  return (
    <div className="tabla-container">
      <table>
        <thead>
          <tr>
            <th>Origen</th>
            <th>Destino</th>
            <th>Combi</th>
            <th>Horario</th>
            <th>Kilometros</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rutas.map(({ id, origen, destino, combi, horario, kilometros }) => {
            return state3.visible && state3.rutaId === id ? (
              <tr key={id}>
                <td></td>
                <td>
                  <RutasDetails
                    id={id}
                    action={modificarRuta}
                    callback={showDetails}
                    initialState={{
                      origen,
                      destino,
                      combi,
                      horario,
                      kilometros,
                    }}
                    lugares={lugares}
                    combis={combis}
                    rutas={rutas}
                    viajes={viajes}
                  />
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            ) : (
              <tr key={id}>
                <td>
                  {origen.nombre} {origen.provincia}
                </td>
                <td>
                  {destino.nombre} {destino.provincia}
                </td>
                <td>{combi.patente}</td>
                <td>{horario}</td>
                <td>{kilometros}</td>
                <td>
                  <button className="btnes" onClick={() => showDetails(id)}>
                    Modificar
                  </button>
                  <button
                    className="btnes"
                    onClick={() => {
                      if (window.confirm("Esta seguro que desea eliminar esta ruta?")) {
                        const viajeConRuta = viajes.filter(({ ruta }) => ruta.id === id);
                        if (viajeConRuta[0] != null ) {
                          alert("No se puede eliminar, esta asignada al menos a un viaje");
                        } else {
                          borrarRuta(id);
                        }
                      }
                        refrescar();
                    }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <hr />
      {state2 ? (
        <FormRuta
          action={agregarRuta}
          callback={showForm}
          lugares={lugares}
          combis={combis}
          rutas={rutas}
        />
      ) : (
        <button className="btnes" onClick={showForm}>
          Agregar Ruta
        </button>
      )}
    </div>
  );
};
