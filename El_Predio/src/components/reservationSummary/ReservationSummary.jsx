import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CountdownTimer from "../countdownTimer/CountdownTimer";
import axios from "axios";

const ReservationSummary = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [reservationData, setReservationData] = useState(() => {
        return location.state || JSON.parse(localStorage.getItem("reservation-data"));
    });
    localStorage.setItem("reservation-data", JSON.stringify(reservationData));
    useEffect(() => {
        if (!reservationData) {
            navigate("/");
        }
    }, [reservationData, navigate]);

    if (!reservationData) return null; // evita crash mientras navega

    const { field, hour, hourPlusOne, nameDate, day, url } = reservationData;


    const HandleDeleteReservation = async () => {
        try {
            const response = await axios.delete("https://localhost:7047/api/Reservation/DeleteReservationPending", {
                params: {
                    courtId: field.id,
                    date: day,
                    time: hour
                }
            });

            console.log("Reserva pendiente eliminada:", response.data);
            localStorage.removeItem("reservation-expiration-time");
            localStorage.removeItem("reservation-data");
            navigate("/")
            return response.data;
        } catch (error) {
            console.error("Error al eliminar la reserva pendiente:", error);
            throw error;
        }
    }

    const HandlePay = async () => {
        setLoading(true);
        setTimeout(() => {
            window.location.href = url;
        }, 100); // o incluso 50ms

        setTimeout(() => {
            setLoading(false);
        }, 1000); 
    }


    useEffect(() => {
        const handlePopState = (event) => {
            // Mostrar alerta
            alert("La única forma de salir de esta página es con el botón de Cancelar.");
            // Volver a empujar el estado actual al historial para evitar navegación hacia atrás
            window.history.pushState(null, "", window.location.href);
        };

        // Prevenir retroceso con un estado de historial falso
        window.history.pushState(null, "", window.location.href);
        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, []);



    return (
        <div
            className="relative flex size-full min-h-screen flex-col bg-slate-50 group/design-root overflow-x-hidden"
            style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}
        >
            <div className="layout-container flex h-full grow flex-col">

                {/* Main content */}
                <div className="px-40 flex flex-1 justify-center py-5">

                    <div className="flex flex-col max-w-[960px] w-full">
                        <div className="flex justify-between p-4">
                            <p className="text-[32px] font-bold min-w-72">Resumen de reserva</p>
                        </div>

                        <div className="p-4">
                            <div className="flex flex-col xl:flex-row rounded-xl">
                                <div
                                    className="w-full h-[200px] aspect-video bg-cover bg-center rounded-xl"
                                    style={{
                                        backgroundImage:
                                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBoKr7Gh-GGRMuhuaNUi5yMMBvKmWkNn4v3glZbv6A8bw4aa16flvcEqDRpUe7-w3JNxMYir8NT0PMbAVgfuz1sTv9pj43-HjW4F870Q8oaHN4Ggr895euL8R-5DTK3e5BhnaGeOUtN1bHP5vW9LWsTvXsSwt9UIwZtYOD2417I-X_qYh6lVrlICc69r77OIVvXdzWjdCh5qe5MjdbsZhUjl4E4Zgil53RPSEbT-6QEaBK73LDVghVUjCbuTeEBTDldOgN4pwozUmEs")',
                                    }}
                                ></div>
                                <div className="w-full min-w-72 grow flex flex-col justify-center gap-1 py-4 xl:px-4">
                                    <p className="text-lg font-bold tracking-[-0.015em]">Partido de Fútbol</p>
                                    <div className="flex justify-between gap-3">
                                        <div className="flex flex-col gap-1">
                                            <p className="text-[#4e7997] text-base">Bv. Ovidio lagos 4170, Rosario</p>
                                            <p className="text-[#4e7997] text-base">{nameDate}. {day}, {hour} PM - {hourPlusOne} PM</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h3 className="text-lg font-bold tracking-[-0.015em] px-4 ">Detalles de la Reserva</h3>
                        <div className="p-4 grid grid-cols-[20%_1fr] gap-x-6">
                            <div className="col-span-2 grid grid-cols-subgrid border-t border-[#d0dde7] py-5">
                                <p className="text-[#4e7997] text-sm">Cancha</p>
                                <p className="text-sm">Cancha {field.name} (F{field.name.slice(0, 1)})</p>
                            </div>
                            <div className="col-span-2 grid grid-cols-subgrid border-t border-[#d0dde7] py-5">
                                <p className="text-[#4e7997] text-sm">Precio Total</p>
                                <p className="text-sm">$ {field.price}</p>
                            </div>
                            <div className="col-span-2 grid grid-cols-subgrid border-t border-[#d0dde7] py-5">
                                <p className="text-[#4e7997] text-sm">Pago anticipado</p>
                                <p className="text-sm">$ {field.price * 0.3}</p>
                            </div>
                        </div>

                        <h3 className="text-lg font-bold tracking-[-0.015em] px-4 pb-2 pt-4">Payment</h3>




                        {/* Timer */}
                        <CountdownTimer
                            durationInMinutes={6}
                            onExpire={() => {
                                // Redirigir o lo que necesites cuando se termine
                                navigate("/");
                            }}
                        />
                        <p className="text-[#4e7997] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center">
                            Tienes 6 minutos para pagar
                        </p>

                        {/* Botones */}
                        <div className="flex justify-center">
                            <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 max-w-[480px] justify-center">
                                {loading && (
                                    <div className="text-sm text-[#1990e5] font-semibold text-center w-full">
                                        Estamos procesando tu pago...
                                    </div>
                                )}
                                <button
                                    onClick={HandlePay}
                                    disabled={loading}
                                    className={`flex min-w-[84px] max-w-[480px] items-center justify-center overflow-hidden rounded-full h-10 px-4 ${loading ? "bg-[#A1C9EA] cursor-not-allowed" : "bg-[#1990e5] cursor-pointer"
                                        } text-slate-50 text-sm font-bold leading-normal tracking-[0.015em] grow`}
                                >
                                    <span className="truncate">{loading ? "Procesando..." : "Ir a pagar"}</span>
                                </button>

                                <button
                                    onClick={HandleDeleteReservation}
                                    disabled={loading}
                                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#e7eef3] text-[#0e151b] text-sm font-bold leading-normal tracking-[0.015em] grow"
                                >
                                    <span className="truncate">Cancelar</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReservationSummary;
