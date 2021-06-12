import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useForm } from "../hooks/useForm.js";
import { FormPasajero } from "../components/formPasajero/FormPasajero.js";
import {
  agregarPasajero,
  listarPasajeros,
} from "../controllers/PasajeroABM.js";
import { listarChoferes } from "../controllers/ChoferABM.js";

export const LoginScreen = ({ history }) => {
  const [pasajeros, setPasajeros] = useState([]);
  const [choferes, setChoferes] = useState([]);
  const [formValues, handleInputChange] = useForm({
    correo: "",
    contraseña: "",
  });
  const { correo, contraseña } = formValues;
  const userContext = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      correo,
      contraseña,
      tipo: "",
    };
    if (correo === "" || contraseña === "") {
      alert("Los campos no deben estar vacios");
    } else {
      if (existeUsuario(user)) {
        alert("Inicio de sesion exitoso");
        if (user.tipo === "administrador") {
          history.replace("/admin/viajes");
        } else if (user.tipo === "chofer") {
          history.replace("/chofer/viajes");
        } else {
          history.replace("/pasajero/viajes");
        }
      } else {
        alert("El usuario o contraseña son incorrectos");
      }
    }
  };

  const existeUsuario = (user) => {
    const usuarioBuscado1 = pasajeros.filter(
      (pasajero) =>
        pasajero.mail === user.correo && pasajero.contraseña === user.contra
    );
    const usuarioBuscado2 = choferes.filter(
      (chofer) =>
        chofer.mail === user.correo && chofer.contraseña === user.contraseña
    );
    if (
      usuarioBuscado1[0] != null ||
      usuarioBuscado2[0] != null ||
      user.correo === "combi19@hotmail.com"
    ) {
      if (usuarioBuscado1[0] != null) {
        user.tipo = "pasajero";
      } else {
        if (usuarioBuscado2[0] != null) {
          user.tipo = "chofer";
        } else {
          user.tipo = "administrador";
        }
        return true;
      }
      return false;
    }
  };

  useEffect(() => {
    listarPasajeros().then((res) => setPasajeros(res));
    listarChoferes().then((res) => setChoferes(res));
  }, []);

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <h3>Inciar Sesion</h3>
        <input
          type="text"
          name="correo"
          placeholder="Ingrese su correo electronico"
          autoComplete="off"
          value={correo}
          onChange={handleInputChange}
        />
        <br />
        <input
          type="password"
          name="contraseña"
          placeholder="Ingrese su contraseña"
          autoComplete="off"
          value={contraseña}
          onChange={handleInputChange}
        />
        <br />
        <button type="submit">Iniciar Sesion</button>
      </form>
      <FormPasajero
        action={agregarPasajero}
        callback={() => {}}
        pasajeros={pasajeros}
        choferes={choferes}
      />
    </div>
  );
};
