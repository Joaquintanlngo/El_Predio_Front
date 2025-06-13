import "../court_card/Court_Card.css"
import aireLibre from "../../utils/images/aireLibre.jpeg"
import { useNavigate } from "react-router-dom"

const Court_Card = ({ court }) => {
    const navigate = useNavigate();

    if (!court) return null; // protección por si todavía no está cargado

    const HandleSubmit = () => {
        navigate("/times", { state: { court } });
    };

    return (
        <div className="container_court_card">
            <img className="image" src={aireLibre} alt={court.category} />
            <div className="container_court">
                <div className="court">
                    <h3 className="service">{court.name}</h3>
                    <p className="duration">{court.duration}</p>
                    <h3 className="price">${court.price}</h3>
                    <p className="description">{court.description}</p>
                </div>
                <div className="container_button">
                    <button className="button_court_card" onClick={HandleSubmit}>
                        Reservar
                    </button>
                </div>
            </div>
        </div>
    );
};


export default Court_Card;