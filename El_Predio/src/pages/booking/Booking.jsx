import Court_Card from "../../components/court_card/Court_Card";
import "../booking/Booking.css"
import portada from "../../utils/images/portada.jpeg"
import { FaWhatsapp , FaInstagram , FaLocationDot, FaRegClock } from "../../utils/icons/icons"
import { useEffect, useState } from "react";
import Available_Times from "../../components/available_times/Available_Times";

const Booking = () => {

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
                    <Available_Times></Available_Times>
                </section>
            </div>
        </>
    )
}

export default Booking;