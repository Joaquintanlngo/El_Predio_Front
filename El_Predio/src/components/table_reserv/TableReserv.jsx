import { useEffect, useState } from 'react';
import styles from './TableReserv.module.css'
import {FaTrashAlt} from "../../utils/icons/icons"

const TableReserv = ({typeFilter, value}) => {
    
    const [bookings, setBookings] = useState([]) 
    const [loading, setLoading] = useState(true) 
    
    const getReservationUrl = (typeFilter, value) => {
                switch (typeFilter) {
                  case "all":
                    return "https://localhost:7047/api/Reservation/GetAll";
                  case "today":
                    return "https://localhost:7047/api/Reservation/GetAllReservationDay/Filter-For-Today";
                  case "court":
                    return `https://localhost:7047/api/Reservation/GetAllReservationForCourt?courtName=${encodeURIComponent(value)}`;
                  case "day":
                    return `https://localhost:7047/api/Reservation/GetAllReservation/Filter-For-Day?date=${encodeURIComponent(value)}`;
                  default:
                    return "https://localhost:7047/api/Reservation/GetAll"; // fallback por si se rompe algo
                }
              };

    const fetchData = async () => {
        try {
            const url = getReservationUrl(typeFilter, value);
            const response = await fetch(url);
             if (!response.ok) throw new Error("Sucedio un error inesperado");
            const data = await response.json();
            setBookings(data);
        } catch (err) { 
            console.log(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
      if ((typeFilter === "court" || typeFilter === "day") && !value) return;
      fetchData();
    },  [typeFilter, value]);

    const formatDate = (dateStr) => {
  const [year, month, day] = dateStr.split("-");
  return `${day}/${month}/${year}`;
};
    
    const jobsMapped = () => {
    if (bookings.length == 0) {
      return (
        <tr>
          <td colSpan={6} style={{ textAlign: "center", padding: "1rem" }}>
            No tienes reservas aún!
          </td>
        </tr>
      );
    } else {
      return bookings.map((booking) => {
        return (
          <tr key={booking.id} >
            <td className={styles.weight_normal}>
                Cancha {booking.court} (F{booking.court.slice(0,1)})
            </td>
            <td className={styles.weight_normal}>
              {booking.clientName}
            </td>
            <td className={styles.weight_normal}>
              {formatDate(booking.date)}
            </td>
            <td className={styles.weight_normal}>
                {booking.time.slice(0,5)}hs
            </td>
            <td className={styles.weight_normal}>
                {booking.clientPhone}
            </td>
            <td>
              <FaTrashAlt
            // onClick={() => handleDeleteJob(job.id)}
            className={styles.delete_icon}
              />
            </td>
          </tr>
        );
      });
    }
  };


    return (
    <>
        <div className={styles.booking_container}>
            <div className={styles.table_container}>
                <table className={styles.table_booking}>
                    <thead>
                        <tr>
                            <th>Cancha</th>
                            <th>Nombre reserva</th>
                            <th>Dia de reserva</th>
                            <th>Hora reserva</th>
                            <th>Teléfono</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={6}>
                                    Cargando trabajos<span className={styles.dots}></span>
                                </td>
                            </tr>
                         ) : (
                            jobsMapped()
                        )}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={6}></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    </>
);
}

export default TableReserv;