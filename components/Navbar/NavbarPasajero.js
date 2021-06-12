import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPizzaSlice, faBus, faSignOutAlt, faRoute, faUser ,faMapMarkerAlt, faRoad} from '@fortawesome/free-solid-svg-icons'

export const NavbarPasajero = () => {
    return (
        <nav className="navbar-container">
            <div>
                <NavLink activeClassName="activelink" className="inactivelink" exact to="/pasajero/home">Inicio</NavLink>
            </div>
            <div>
                <FontAwesomeIcon icon={faUser}/>
                <NavLink activeClassName="activelink" className="inactivelink" exact to="/pasajero/viajes">Viajes</NavLink>
            </div>
            <div>
                <FontAwesomeIcon icon={faUser}/>
                <NavLink activeClassName="activelink" className="inactivelink" exact to="/pasajero/profile">Perfil</NavLink>
            </div>
        </nav>
    )
}