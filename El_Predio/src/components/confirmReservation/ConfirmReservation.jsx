import React, { useState } from 'react';
import '../reservationConfirm/Reservation_Confirm.css';
import { useLocation } from 'react-router-dom';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';

 const ConfirmReservation = () => {

    const court = {
    id: 1,
    name: "5A",
    duration: "60min",
    price: 1000,
    description: "Cancha techada",
    isAvailable: true,
    category: "Fútbol 5",
    };

    

    const hour = "20:00";
    const day = "2025-07-01";



    // const location = useLocation();
    // const {court, hour, day} = location.state || {};
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [paymentData, setPaymentData] = useState(null);

    const handleSubmit = async () => {
        if (!name || !email) {
            alert('Por favor, completa todos los campos requeridos');
            return;
        }

        setLoading(true);
        
        try {
            // 1. Llamada a CreatePaymentIntent
            const response = await fetch('https://1351-190-192-58-120.ngrok-free.app/api/MpSdk/CreatePaymentIntent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  Name: name,
                  Email: email,
                  Price: 1, // Solo el 30% como anticipo
                  CourtName: court.name, 
                  Date: day,
                  Time: hour,
                  CourtId: court.id,
                  ClientId: 2,
                  SuccessUrl: window.location.origin + '/payment-success'
                })
            });

            const data = await response.json();
            localStorage.setItem("url", data);
            setPaymentData(data);

            // 2. Redirigir a Mercado Pago
            window.location.href = data.url;
        } catch (error) {
            console.error('Error al crear el pago:', error);
            alert('Hubo un error al procesar el pago. Por favor, intenta nuevamente.');
        } finally {
            setLoading(false);
        }
    };

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
    const nameDate = date.toLocaleDateString('es-AR', { weekday: 'short'});

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
              <span className="label">Fútbol {court.name.slice(0,1)}</span>
            </div>
            <h2 className="place-name">El Predio</h2>
            <p className="address">Av. Ovidio Lagos 4170, Rosario</p>
            <img src="/elovalo.png" alt="El Predio" className="place-image" />
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
                <span className="text">Cancha {court.name} - Fútbol {court.name.slice(0,1)}</span>
              </div>
              <div className="detail-item">
                <span className="text small">{court.description}</span>
              </div>
              <div className="detail-item">
                <span className="label">Precio</span>
                <span className="value">$ {court.price}</span>
              </div>
              <div className="detail-item service-fee">
                <span className="label">Tasa de servicio</span>
                <span className="value !text-blue-500"><s >$ 550</s> $ 0 🎁</span>
              </div>
              <div className="detail-item">
                <span className="label">Anticipo / Adelanto:</span>
                <span className="value">$ {court.price * 0.3}</span>
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
            <div className="form-row">
              <input
                  placeholder="Nombre:*"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0e151b] focus:outline-0 focus:ring-0 border-none bg-[#e7eef3] focus:border-none h-14 placeholder:text-[#4e7997] p-4 text-base font-normal leading-normal"
                  defaultValue=""
                  onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="form-row">
              
              <PhoneInput
                    country={'ar'}
                    value={phone}
                    onChange={setPhone}
                    preferredCountries={['ar', 'cl', 'co', 'mx', 'pe']}
                    enableSearch
                    dropdownStyle={{ zIndex: 9999 }}
                    containerClass="!w-full"
                    inputClass="!w-full !rounded-xl !bg-[#e7eef3] !h-14 !text-base !font-normal !leading-normal !text-[#0e151b] !placeholder-[#4e7997] !p-4 !pl-14 !border-none focus:!outline-0 focus:!ring-0"
                    buttonClass="!bg-[#e7eef3] !border-none !rounded-l-xl !h-14"
                />
            </div>
            <div className="form-row">
              <input
                  placeholder="E-mail:*"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0e151b] focus:outline-0 focus:ring-0 border-none bg-[#e7eef3] focus:border-none h-14 placeholder:text-[#4e7997] p-4 text-base font-normal leading-normal"
                  defaultValue=""
                  onChange={(e) => setEmail(e.target.value)}
                />
            </div>
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
        </div>
      </div>
    </div>
  );
}

export default ConfirmReservation;