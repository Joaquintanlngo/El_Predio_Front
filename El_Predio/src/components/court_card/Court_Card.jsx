import "../court_card/Court_Card.css"
import aireLibre from "../../utils/images/aireLibre.jpeg"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";

const Court_Card = ({ selectedTime, selectedDay }) => {
    const navigate = useNavigate();
    const [court, setCourt] = useState([])

    if (!court) return null; // protección por si todavía no está cargado

    const HandleSubmit = () => {
        navigate("/pay", { state: {
                                    court,
                                    hour: time,
                                    day: selectedDay
                                } });
        };

    const [courtId, time] = selectedTime.split('-');
    console.log(courtId)
    // fetchCourts();
    const fetchCourt = async () => {
    try {
      const res = await fetch(`https://localhost:7047/api/Court/GetById?id=${courtId}`);
      if (!res.ok) throw new Error('Error al obtener canchas');
      const data = await res.json();
      setCourt(data);
    } catch (error) {
      console.error('Error al cargar canchas:', error);
    }
  };

   useEffect(() => {
      fetchCourt();
    }, [selectedTime]);

    return (
        <div className="container_court_card">
            <div className="container_court">
                <div className="court">
                    <h3 className="service">Cancha {selectedTime ? court.name : "-|-"} (F{court?.name?.slice(0,1) ?? "-"}) a las {selectedTime ? time : "--:--"} </h3>
                    <p className="duration">{selectedTime ? court.duration : "00 min"}</p>
                    <h3 className="price">${selectedTime ? court.price : " 0,00"}</h3>
                    <p className="description">{selectedTime ? court.description : "------ ----- ----- ----- ----- ----- ----- ----- -----"}</p>
                </div>
        
                <div className="reserve_button_wrapper">
                    <button disabled={selectedTime === ""} className="enviar" onClick={HandleSubmit}>
                    Reservar
                    </button>
                </div>
                
            </div>
            <img className="image" src={aireLibre} alt={court.category} />
        </div>
    );
};


export default Court_Card;