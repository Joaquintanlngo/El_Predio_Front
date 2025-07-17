import React, { use, useEffect, useState } from 'react';
import '../reservationConfirm/Reservation_Confirm.css';
import { useLocation, useNavigate } from 'react-router-dom';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import AireLibre from '../../utils/images/aireLibre.jpeg'
import axios from "axios";
import { useAuth } from '../../services/authcontext/AuthContext';
// import PaymentCountdown from '../countdownTimer/CountdownTimer';

const ConfirmReservation = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const { field, hour, day } = location.state || {};
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const { token } = useAuth();
  const [error, setError] = useState("")
  const [user, setUser] = useState("")

  // const [showCountdown, setShowCountdown] = useState(false);
  // const [countdownStartTime, setCountdownStartTime] = useState(null);

  // const preferenceCreationTime = new Date(); // ahora
  // const expirationTime = new Date(preferenceCreationTime.getTime() + 5 * 60000); // +5 minutos

  const handleSubmit = async () => {
    setLoading(true);
    // const now = new Date();
    // localStorage.setItem("paymentStartTime", now.toISOString());
    // setCountdownStartTime(now);
    // setShowCountdown(true);
    try {
      const response = await axios.post("https://7ad205a1531d.ngrok-free.app/api/MercadoPago/CreatePayment", {
        title: field.name,
        price: 1,
        successUrl: "https://www.youtube.com/",
        date: day,
        time: hour,
        clientId: 2,
        courtId: field.id,
      });
      console.log("hola");
      const data = await response.data;
      console.log("hola 2");
      
      navigate("/reservation",{ state: {
                                      field,
                                      hour: hour,
                                      hourPlusOne: sumarUnaHora(hour),
                                      nameDate: nameDate,
                                      day: date.toLocaleDateString('es-AR'),
                                      url: data.url
                                  } })

    } catch (err) {
      console.error("💥 Error completo:", err.response.data.message);

      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message); // <-- este es el mensaje del backend
      } else {
        setError("Ocurrió un error inesperado");
      }
    } finally {
      setLoading(false);
    }

  };

//   useEffect(() => {
//   const storedTime = localStorage.getItem("paymentStartTime");

//   if (storedTime) {
//     const start = new Date(storedTime);
//     const expiration = new Date(start.getTime() + 5 * 60 * 1000);
//     const now = new Date();

//     if (now < expiration) {
//       setCountdownStartTime(start);
//       setShowCountdown(true);
//     } else {
//       localStorage.removeItem("paymentStartTime"); // ⛔ ya expiró
//       navigate("/"); // 👈 redirigí directamente
//     }
//   }
// }, [navigate]);


  const fetchUser = async () => {
    try {
      const response = await axios.get("https://localhost:7047/api/Auth/GetUserById", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setUser(response.data);

    } catch (err) {
      setError("Error al obtener el usuario");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);


  // const handleSubmit = async () => {
  //     if (!name || !email) {
  //         alert('Por favor, completa todos los campos requeridos');
  //         return;
  //     }

  //     setLoading(true);

  //     try {
  //         // 1. Llamada a CreatePaymentIntent
  //         const response = await fetch('https://717123410de7.ngrok-free.app/api/MercadoPago/CreatePayment', {
  //             method: 'POST',
  //             headers: {
  //                 'Content-Type': 'application/json',
  //             },
  //             body: JSON.stringify({
  //               Name: name,
  //               Email: email,
  //               Price: 1, // Solo el 30% como anticipo
  //               CourtName: field.name, 
  //               Date: day,
  //               Time: hour,
  //               CourtId: field.id,
  //               ClientId: 2,
  //               SuccessUrl: window.location.origin + '/payment-success'
  //             })
  //         });

  //         const data = await response.json();
  //         localStorage.setItem("url", data);
  //         setPaymentData(data);

  //         // 2. Redirigir a Mercado Pago
  //         window.location.href = data.url;
  //     } catch (error) {
  //         console.error('Error al crear el pago:', error);
  //         alert('Hubo un error al procesar el pago. Por favor, intenta nuevamente.');
  //     } finally {
  //         setLoading(false);
  //     }
  // };

  const parseFechaLocal = (fechaStr) => {
    const [year, month, day] = fechaStr.split('-');
    return new Date(year, month - 1, day); // 👈 Esto crea la fecha en hora local
  };

  function sumarUnaHora(horaStr) {
    const [horas, minutos] = horaStr.split(':').map(Number);
    const fecha = new Date();
    fecha.setHours(horas);
    fecha.setMinutes(minutos);

    // Sumamos una hora
    fecha.setHours(fecha.getHours() + 1);

    // Formateamos de nuevo a "HH:mm"
    const nuevaHora = fecha.toTimeString().slice(0, 5);
    return nuevaHora;
  }

  const date = parseFechaLocal(day);
  const nameDate = date.toLocaleDateString('es-AR', { weekday: 'short' });

  return (
    <div className="reservation-confirm-container">
      <h1 className="title">Ya casi terminamos!</h1>
      <p className="subtitle">
        Para completar tu reserva en <strong>El Predio</strong>, por favor chequeá tus datos y luego confirmá.
      </p>

      <div className="reservation-content">
        <div className="left-panel">
          <div className="summary-box">
            <div className="field">
              <span className="label">Fútbol {field.name.slice(0, 1)}</span>
            </div>
            <h2 className="place-name">El Predio</h2>
            <p className="address">Av. Ovidio Lagos 4170, Rosario</p>
            <img src={AireLibre} alt="El Predio" className="w-[100%] h-[100px] rounded-[5px] my-4 object-cover" />
            <div className="details">
              <div className="detail-item">
                <span className="icon">📅 Fecha</span>
                <span className="text">{nameDate}. {date.toLocaleDateString('es-AR')}</span>
              </div>
              <div className="detail-item">
                <span className="icon">🕒 Turno</span>
                <span className="text">{hour} - {sumarUnaHora(hour)}</span>
              </div>
              <div className="detail-item">
                <span className="icon">🏟</span>
                <span className="text">Cancha {field.name} - Fútbol {field.name.slice(0, 1)}</span>
              </div>
              <div className="detail-item">
                <span className="text small">{field.description}</span>
              </div>
              <div className="detail-item">
                <span className="label">Precio</span>
                <span className="value">$ {field.price}</span>
              </div>
              <div className="detail-item service-fee">
                <span className="label">Tasa de servicio</span>
                <span className="value !text-blue-500"><s >$ 550</s> $ 0 🎁</span>
              </div>
              <div className="detail-item">
                <span className="label">Anticipo / Adelanto:</span>
                <span className="value">$ {field.price * 0.3}</span>
              </div>
              <div className="benefit-box !bg-blue-100">
                <p>Beneficio ofrecido por <strong>TIFOX</strong></p>
                <p className="green !text-blue-500">Ahorraste $ 550 en esta reserva</p>
              </div>
            </div>
          </div>
        </div>

        <div className="right-panel">
          <div className="form-box">
            <h3>Información personal</h3>
            {token ? <div className="form-row">
              <input
                placeholder="Nombre:*"
                className="cursor-not-allowed form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-gray-500 focus:outline-0 focus:ring-0 border-none bg-[#e7eef3] focus:border-none h-14 placeholder:text-[#4e7997] p-4 text-base font-normal leading-normal"
                value={user.fullName}
                disabled
              />
            </div>
              : <div className="form-row">
                <input
                  placeholder="Nombre:*"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0e151b] focus:outline-0 focus:ring-0 border-none bg-[#e7eef3] focus:border-none h-14 placeholder:text-[#4e7997] p-4 text-base font-normal leading-normal"
                  defaultValue=""
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            }
            <div className="form-row">

              {token ? <PhoneInput
                country={'ar'}
                value={`54 ${user.phoneNumber}`}
                preferredCountries={['ar', 'cl', 'co', 'mx', 'pe']}
                enableSearch
                dropdownStyle={{ zIndex: 9999 }}
                containerClass="!w-full"
                inputClass="!w-full !rounded-xl !bg-[#e7eef3] !h-14 !text-base !font-normal !leading-normal !text-gray-500 !placeholder-[#4e7997] !p-4 !pl-14 !border-none focus:!outline-0 focus:!ring-0"
                buttonClass="!bg-[#e7eef3] !border-none !rounded-l-xl !h-14"
                disabled
              />
                : <PhoneInput
                  country={'ar'}
                  value={user.phone}
                  onChange={setPhone}
                  preferredCountries={['ar', 'cl', 'co', 'mx', 'pe']}
                  enableSearch
                  dropdownStyle={{ zIndex: 9999 }}
                  containerClass="!w-full"
                  inputClass="!w-full !rounded-xl !bg-[#e7eef3] !h-14 !text-base !font-normal !leading-normal !text-[#0e151b] !placeholder-[#4e7997] !p-4 !pl-14 !border-none focus:!outline-0 focus:!ring-0"
                  buttonClass="!bg-[#e7eef3] !border-none !rounded-l-xl !h-14"
                />
              }
            </div>
            {token ? <div className="form-row">
              <input
                placeholder="E-mail:*"
                className="cursor-not-allowed form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-gray-500 focus:outline-0 focus:ring-0 border-none bg-[#e7eef3] focus:border-none h-14 placeholder:text-[#4e7997] p-4 text-base font-normal leading-normal"
                value={user.email}
                disabled
              />
            </div>
              : <div className="form-row">
                <input
                  placeholder="E-mail:*"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0e151b] focus:outline-0 focus:ring-0 border-none bg-[#e7eef3] focus:border-none h-14 placeholder:text-[#4e7997] p-4 text-base font-normal leading-normal"
                  defaultValue=""
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

            }
            <small>(Recibirás el voucher de la reserva)</small>
          </div>

          <div className="payment-info !bg-[#e7eef3]">
            <p><strong>IMPORTANTE:</strong> Sólo se debitará el importe del Anticipo / Adelanto. En el complejo abonarás el saldo restante del valor total del turno (si lo hubiere). En caso de que canceles con más de <strong>24hs</strong> de anticipación, se reintegrará el importe de la seña de manera automática.</p>
          </div>

          <button
            className="confirm-button !bg-blue-500"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Procesando...' : 'Continuar'}
          </button>
          {/* {showCountdown && countdownStartTime && (
            <PaymentCountdown
              expirationTime={new Date(countdownStartTime.getTime() + 5 * 60 * 1000)}
              onExpire={() => {
                localStorage.removeItem("paymentStartTime"); // 🧽 limpiar
                alert("⏳ El tiempo para pagar ha expirado.");
                navigate("/")
              }}
            />
          )} */}
          {error ?? <p>{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default ConfirmReservation;