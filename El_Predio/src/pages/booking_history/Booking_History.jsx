import { useState } from "react";
import TableReserv from "../../components/table_reserv/TableReserv";
import styles from "./Booking_History.module.css"

const Booking_History = () => {

    const [filter, setFilter] = useState("all");
    const [value, setValue] = useState("");


    const HandleChange = (e) =>{
        setFilter(e.target.value);
    }


    return(
        <div>
            <div className={styles. title_container}>
                <h1>
                    <span className={styles.grey_title}>Inicio</span>
                    /Historial de Reservas
                </h1>
            </div>
            <div className={styles.container_filter}>
                <div className={styles.container_select}>
                <label htmlFor="">Filtrar reserva por:</label>
                    <select name="" id="" onChange={HandleChange} className="appearance-none w-[48%] bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-blue-500">
                        <option value="all">Todo</option>
                        <option value="court">Cancha</option>
                        <option value="today">Dia de hoy</option>
                        <option value="day">Dia</option>
                    </select>
                </div>
                {filter == "court" && 
                <div>
                    <label htmlFor="">Nombre de cancha: </label>
                    <select type="text" placeholder="Nombre de cancha" className="appearance-none w-[35%] bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-blue-500" onChange={(e) => {setValue(e.target.value)}}>
                        <option value="" disabled selected>--</option>
                        <option value="5A">5A</option>
                        <option value="5B">5B</option>
                        <option value="6A">6A</option>
                        <option value="6C">6C</option>
                        <option value="7T">7T</option>
                        <option value="7AL">7AL</option>
                        <option value="8AL">8AL</option>
                    </select> 
                </div>
                }
                
                {filter == "day" && <div>
                    <label htmlFor="">Seleccione un dia: </label>
                    <input type="date" className="appearance-none w-[50%] bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-blue-500" onChange={(e) => {setValue(e.target.value)}} />
                    </div>
                }


            </div>
            
            <TableReserv 
                typeFilter={filter} 
                value={value}
            />
        </div>
    )
}

export default Booking_History;