import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { HomeScreen } from "../pages/ScreensPasajero/HomeScreen";
import { ViajesScreen } from "../pages/ScreensPasajero/ViajesScreen";
import { ProfileScreen } from "../pages/ScreensPasajero/ProfileScreen";
import { NavbarPasajero } from "../components/Navbar/NavbarPasajero";


export const DashboardPasajero = () => {
  return (
    <>
      <NavbarPasajero />
      <Switch>
        <Route exact path="/pasajero/home" component={HomeScreen} />
        <Route exact path="/pasajero/viajes" component={ViajesScreen} />
        <Route exact path="/pasajero/profile" component={ProfileScreen} />
        {/* <Redirect to="/home" /> */}
      </Switch>
    </>
  );
};