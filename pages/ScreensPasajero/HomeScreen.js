 import React,{ useState,useEffect } from 'react'
 import { listarViajes } from "../../controllers/ViajeABM";
 import { listarLugares } from "../../controllers/LugarABM";
 import { useForm } from "../../hooks/useForm";
 import DatePicker from "react-datepicker";

 export const HomeScreen = () => {
     const [viajes, setviajes] = useState(["cargando"])
     const [lugares,setlugares] = useState([])
     const [viajesFiltrados,setViajesFiltrados] = useState([])
     const [formValues,handleInputChange] = useForm({
         origen:"",
         destino:"",
     })
     const {origen,destino} = formValues;
     const [fecha, setFecha] = useState(new Date());

     useEffect(() => {
         listarViajes().then(res => {
            setviajes(res)
         })
         listarLugares().then(res => setlugares(res))
     },[])

     const handleInputChangeDate = (unaFecha) => {
        setFecha(unaFecha);
    };

     const inputSubmit = (e) => {
         e.preventDefault()
         console.log({origen,destino,fecha})
        //  const filtrado = viajes.filter(({ruta,fecha}) => 
        //      ruta.origen
        //  )
     }

     if(viajes[0] === "cargando"){
         return (<h1>Cargando...</h1>)
     }
     return (
         <div>
             <h1>Home Screen Pasajero</h1>
             <hr/>
             <h2>Busque el viaje que desee</h2>
             <form className="filtro-viajes" onSubmit={inputSubmit}>
                 <label>Origen:</label>
                 <select name="origen" value={origen} onChange={handleInputChange}>
                    <option>Seleccione un origen</option>
                    {lugares.map(({ id,nombre,provincia }) => {
                        return (
                        <option key={id} value={id}>
                            {nombre},{provincia}
                        </option>
                        );
                    })}
                 </select>
                 <label>Destino:</label>
                 <select name="destino" value={destino} onChange={handleInputChange}>
                    <option>Seleccione un destino</option>
                    {lugares.map(({ id,nombre,provincia }) => {
                        return (
                        <option key={id} value={id}>
                            {nombre},{provincia}
                        </option>
                        );
                    })}
                 </select>
                 <DatePicker
                    selected={fecha}
                    onChange={handleInputChangeDate}
                    dateFormat="dd-MM-yyyy"
                 />
                 <button type="submit">Buscar</button>
             </form>      
        </div>
    )
}
