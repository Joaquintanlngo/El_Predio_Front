import { useEffect, useState } from "react";
import { FaTrashAlt } from "../../utils/icons/icons"
import axios from 'axios';
import { useAuth } from "../../services/authcontext/AuthContext";

const MyReservationsPage = () => {

    const [loading, setLoading] = useState(false)
    const [filterSelect, setFilterSelect] = useState("Activas")
    const [reservations, setReservations] = useState([]);
    const { token } = useAuth()

    const GetMyReservations = async () => {
        try {
            const response = await axios.get('https://localhost:7047/api/Reservation/GetMyReservation', {
                params: {
                    status: filterSelect
                },
                headers: {
                    // Si necesitás autenticación:
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            console.log(response.data); // Las reservas
            setReservations(response.data)
        } catch (error) {
            console.error('Error al obtener reservas pasadas:', error);
        }
    };

    useEffect(() => {
        GetMyReservations()
    }, [filterSelect])



    const formatDate = (dateStr) => {
        const [year, month, day] = dateStr.split("-");
        return `${day}/${month}/${year}`;
    };
    

    const MyReserveMapped = () => {
        if (reservations.length == 0) {
            return (
                <tr>
                    <td colSpan={6} style={{ textAlign: "center", padding: "1rem" }}>
                        No tienes reservas aún!
                    </td>
                </tr>
            );
        } else {
            return reservations.map((booking) => {
                return (
                    <tr key={booking.id} >
                        <td className="font-normal">
                            Cancha {booking.court} (F{booking.court.slice(0, 1)})
                        </td>
                        {/* <td className="font-normal">
                            {booking.clientName}
                        </td> */}
                        <td className="font-normal">
                            {formatDate(booking.date)}
                        </td>
                        <td className="font-normal">
                            {booking.time.slice(0, 5)} Hs
                        </td>
                        <td className="font-normal">
                            {booking.status == "Success" && "Señado"}
                            {booking.status == "Pending" && "Pendiente"}
                        </td>
                        <td className="font-normal">
                            ${booking.totalPrice}
                        </td>
                        <td className="font-normal">
                            ${booking.paidAmount}
                        </td>
                        <td className="font-normal">
                            ${booking.totalPrice - booking.paidAmount}
                        </td>
                        <td className="text-center">
                            <div className="inline-flex justify-center items-center w-full h-full">
                                <FaTrashAlt className="cursor-pointer w-5 h-5 transition-all duration-200 ease-in-out hover:text-red-500" />
                            </div>
                        </td>
                    </tr>
                );
            });
        }
    };


    return (
        <div
            className="flex justify-center min-h-screen bg-gray-50 overflow-x-hidden"
            style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}
        >
            <div className="flex flex-col items-center w-full max-w-[1200px] px-4">
                <div className="flex flex-wrap justify-between gap-3 p-12 w-full">
                    <p className="text-[32px] font-bold leading-tight min-w-72">
                        Mis Reservas
                    </p>
                </div>

                <div className="max-h-[600px] w-full overflow-y-auto rounded-[10px] shadow-lg shadow-gray-300">
                    <div className="sticky top-0 z-20 w-full flex justify-around bg-white">
                        <button className={`p-4 h-[100%] flex-1 hover:text-[#1990e5] font-bold transition-all duration-200 ease-in-out hover:border-b hover:border-[#1990e5] ${filterSelect == "Activas" && "text-[#1990e5] border-b border-[#1990e5]"}`} onClick={() => { setFilterSelect("Activas") }}>Activas</button>
                        <button className={`p-4 h-[100%] flex-1 hover:text-[#1990e5] font-bold transition-all duration-200 ease-in-out hover:border-b hover:border-[#1990e5] ${filterSelect == "Pasadas" && "text-[#1990e5] border-b border-[#1990e5]"}`} onClick={() => { setFilterSelect("Pasadas") }}>Pasadas</button>
                        <button className={`p-4 h-[100%] flex-1 hover:text-[#1990e5] font-bold transition-all duration-200 ease-in-out hover:border-b hover:border-[#1990e5] ${filterSelect == "Canceladas" && "text-[#1990e5] border-b border-[#1990e5]"}`} onClick={() => { setFilterSelect("Todas") }}>Todas</button>
                    </div>
                    <table className="bg-white w-full border-collapse font-bold shadow-[ -1px_7px_5px_-3px_rgba(0,0,0,0.2)]">
                        <thead className="sticky top-[56px] bg-white z-10 ">
                            <tr>
                                <th>Cancha</th>
                                {/* <th>Reservado por</th> */}
                                <th>Día de reserva</th>
                                <th>Hora reserva</th>
                                <th>Estado</th>
                                <th>Precio Total</th>
                                <th>Abonado</th>
                                <th>Monto a pagar</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={9} className="text-center py-4">
                                        Cargando trabajos<span className="ml-2 animate-pulse">...</span>
                                    </td>
                                </tr>
                            ) : (
                                MyReserveMapped()
                            )}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td ></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
};


// const reservations = [
//     {
//         id: 1,
//         court: "5A",
//         clientName: "Emily Carter",
//         date: "2025-07-20",
//         time: "10:00 AM - 12:00 PM",
//         total: "$200",
//         paid: "$200",
//         clientPhone: "3412122907"
//     },
//     {
//         id: 2,
//         court: "7T",
//         clientName: "Emily Carter",
//         date: "2025-06-14",
//         time: "2:00 PM - 4:00 PM",
//         total: "$150",
//         paid: "$150",
//         clientPhone: "3412122907"
//     },
//     {
//         id: 3,
//         court: "6C",
//         clientName: "Emily Carter",
//         date: "2025-08-30",
//         time: "9:00 AM - 11:00 AM",
//         total: "$180",
//         paid: "$180",
//         clientPhone: "3412122907"
//     },
//     {
//         id: 4,
//         court: "6C",
//         clientName: "Emily Carter",
//         date: "2025-08-30",
//         time: "9:00 AM - 11:00 AM",
//         total: "$180",
//         paid: "$180",
//         clientPhone: "3412122907"
//     },
//     {
//         id: 5,
//         court: "6C",
//         clientName: "Emily Carter",
//         date: "2025-08-30",
//         time: "9:00 AM - 11:00 AM",
//         total: "$180",
//         paid: "$180",
//         clientPhone: "3412122907"
//     },
//     {
//         id: 6,
//         court: "6C",
//         clientName: "Emily Carter",
//         date: "2025-08-30",
//         time: "9:00 AM - 11:00 AM",
//         total: "$180",
//         paid: "$180",
//         clientPhone: "3412122907"
//     },
//     {
//         id: 7,
//         court: "6C",
//         clientName: "Emily Carter",
//         date: "2025-08-30",
//         time: "9:00 AM - 11:00 AM",
//         total: "$180",
//         paid: "$180",
//         clientPhone: "3412122907"
//     },
//     {
//         id: 8,
//         court: "6C",
//         clientName: "Emily Carter",
//         date: "2025-08-30",
//         time: "9:00 AM - 11:00 AM",
//         total: "$180",
//         paid: "$180",
//         clientPhone: "3412122907"
//     },
//     {
//         id: 9,
//         court: "6C",
//         clientName: "Emily Carter",
//         date: "2025-08-30",
//         time: "9:00 AM - 11:00 AM",
//         total: "$180",
//         paid: "$180",
//         clientPhone: "3412122907"
//     },
//     {
//         id: 10,
//         court: "6C",
//         clientName: "Emily Carter",
//         date: "2025-08-30",
//         time: "9:00 AM - 11:00 AM",
//         total: "$180",
//         paid: "$180",
//         clientPhone: "3412122907"
//     },
//     {
//         id: 11,
//         court: "6C",
//         clientName: "Emily Carter",
//         date: "2025-08-30",
//         time: "9:00 AM - 11:00 AM",
//         total: "$180",
//         paid: "$180",
//         clientPhone: "3412122907"
//     },
//     {
//         id: 12,
//         court: "6C",
//         clientName: "Emily Carter",
//         date: "2025-08-30",
//         time: "9:00 AM - 11:00 AM",
//         total: "$180",
//         paid: "$180",
//         clientPhone: "3412122907"
//     },
//     {
//         id: 13,
//         court: "6C",
//         clientName: "Emily Carter",
//         date: "2025-08-30",
//         time: "9:00 AM - 11:00 AM",
//         total: "$180",
//         paid: "$180",
//         clientPhone: "3412122907"
//     },
//     {
//         id: 14,
//         court: "6C",
//         clientName: "Emily Carter",
//         date: "2025-08-30",
//         time: "9:00 AM - 11:00 AM",
//         total: "$180",
//         paid: "$180",
//         clientPhone: "3412122907"
//     },
// ];


export default MyReservationsPage;