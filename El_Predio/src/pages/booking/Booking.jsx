import Court_Card from "../../components/court_card/Court_Card";
import "../booking/Booking.css"
import portada from "../../utils/images/portada.jpeg"
import { FaWhatsapp , FaInstagram , FaPhone, FaLocationDot, FaRegClock } from "../../utils/icons/icons"
import { useEffect, useState } from "react";

const Booking = () => {
    
// const courts = [
//       {
//         id: 1,
//         court: "Cancha 5B (F5)",
//         duration: "60 min",
//         price: 45000,
//         description: "Cancha techada con pasto cintetico y caucho (más chica que la 5A)",
//         category: "Techada"
//       },
//       {
//         id: 2,
//         court: "Cancha 5A (F5)",
//         duration: "60 min",
//         price: 45000,
//         description: "Cancha techada con pasto cintetico y caucho",
//         category: "Techada"
//       },
//       {
//         id: 3,
//         court: "Cancha 6C (F6)",
//         duration: "60 min",
//         price: 54000,
//         description: "Cancha techada con pasto cintetico y caucho",
//         category: "Techada"
//       },
//       {
//         id: 4,
//         court: "Cancha 6A (F6)",
//         duration: "60 min",
//         price: 54000,
//         description: "Cancha techada con pasto cintetico y caucho",
//         category: "Techada"
//       },
//       {
//         id: 5,
//         court: "Cancha 7T (F7)",
//         duration: "60 min",
//         price: 63000,
//         description: "Cancha techada con pasto cintetico y caucho",
//         category: "Techada"
//       },
//       {
//         id: 6,
//         court: "Cancha 7AL (F7)",
//         duration: "60 min",
//         price: 63000,
//         description: "Cancha al aire libre con pasto cintetico y caucho",
//         category: "Aire Libre"
//       },
//       {
//         id: 7,
//         court: "Cancha 8AL (F8)",
//         duration: "60 min",
//         price: 75000,
//         description: "Cancha al aire libre con pasto cintetico y caucho",
//         category: "Aire Libre"
//       }
//     ]

    useEffect(() => {
      fetch('https://localhost:7047/api/Court/Get')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error en la respuesta de la API');
          }
          return response.json();
        })
        .then((data) => {
          
          setCourts(data);
          // Actualizá tu estado o hacé lo que necesites con los datos
        })
        .catch((error) => {
          console.error('Hubo un problema con la petición:', error);
        });
    }, []);


    const [courts, setCourts] = useState([]);
    const [list, setList] = useState(true);
    const [list2, setList2] = useState(true);

    const handleChange = () => {
      setList(!list);
    }
    const handleChange2 = () => {
      setList2(!list2);
    }

    return(
        <>
            <div className="container_main">

                <section className="profile">
                    <div className="container_profile">
                        <div className="container_photo-profile_name">

                            <img className="cover_photo" src={portada} alt="" /> {/* foto de portada */}
                            <div className="profile_name">
                                <img className="photo_logo" src={portada} alt="" /> {/* foto de logo */}
                                <div className="container_description">
                                    <h2>El Predio</h2>
                                    <p>Canchas de futbola 5/6/7/8</p>
                                </div>
                            </div>
                        </div>

                        <div className="container_location">
                            <div className="maps">
                              <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1610.1966703697472!2d-60.67217078744698!3d-32.982058561126564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b7ab863c07b111%3A0xde126db37be16b5e!2sEl%20Predio%20del%20F%C3%BAtbol!5e0!3m2!1ses!2sar!4v1746502504710!5m2!1ses!2sar"
                                width="100%"
                                height="100%"
                                style={{ border: 0, borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                              ></iframe>
                              
                            </div>
                            <div className="div_container_description">
                                <p><FaLocationDot /> <a href="https://maps.app.goo.gl/bVKrbwCGHZkyRwyH7" target="_blank" style={{color:"Black", textDecoration:"none"}} >Bv. Ovidio Lagos 4170, Rosario, Santa Fe, Argentina</a></p>
                                <p><FaWhatsapp /> <a href="https://wa.me/+5493413768787" target="_blank" style={{color:"Black"}}>¡Contactanos por WhatsApp!</a></p>
                                <p><FaInstagram  /> <a href="https://www.instagram.com/complejoelpredio/?hl=es-la" target="_blank" style={{color:"Black"}}>¡Sumate a nuestras redes sociales!</a></p>
                                <p style={{cursor: "pointer"}}><FaRegClock /> Ver horario</p>
                            </div>
                        </div>

                    </div>
                </section>
                <section className="reserve">
                    <div className="canchas" onClick={handleChange}>
                        <h3>Canchas Techadas</h3>
                        <h3>-</h3>
                    </div>

                    <div className={list ? "div_card_court" : "div_card_court_none"}>
                    {courts.filter((court) => court.category == "Techada").map((court) => (
                    <Court_Card
                    key={court.id}
                    name={court.name}
                    duration={court.duration}
                    price={court.price}
                    description={court.description}
                    />
                    ))}
                    </div>
                    <div className="canchas" onClick={handleChange2}>
                        <h3>Canchas Aire Libre</h3>
                        <h3>-</h3>
                    </div>
                    <div className={list2 ? "div_card_court" : "div_card_court_none"}>
                    {courts.filter((court) => court.category == "Aire Libre").map((court) => (
                    <Court_Card
                    key={court.id}
                    name={court.name}
                    duration={court.duration}
                    price={court.price}
                    description={court.description}
                    />
                    ))}
                    </div>
                </section>
            </div>
        </>
    )
}

export default Booking;