import React, { useState } from 'react';
import './Reservation_Confirm.css';
import { useLocation } from 'react-router-dom';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';

 const ReservationConfirm = () => {
    const location = useLocation();
    const {court, hour, day} = location.state || {};
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    

    const handleSubmit = () => {
        console.log("Enviar a", name, "a mercado pago para pagar, y usar su mail", email, "para mandar voucher")
    }

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
            <img src="/elovalo.png" alt="El Óvalo" className="place-image" />
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
                <span className="value"><s>$ 550</s> $ 0 🎁</span>
              </div>
              <div className="detail-item">
                <span className="label">Anticipo / Adelanto:</span>
                <span className="value">$ {court.price * 0.3}</span>
              </div>
              <div className="benefit-box">
                <p>Beneficio ofrecido por <strong>TIFOX</strong></p>
                <p className="green">Ahorraste $ 550 en esta reserva</p>
              </div>
            </div>
          </div>
        </div>

        <div className="right-panel">
          <div className="form-box">
            <h3>Información personal</h3>
            <div className="form-row">
              <input className="input" placeholder="Nombre:*" onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-row">
              
              <PhoneInput
                    country={'ar'} // País por defecto: Argentina
                    value={phone}
                    onChange={setPhone}
                    inputStyle={{
                    width: '100%',
                    borderColor: '', // si querés marcar error
                    }}
                    dropdownStyle={{ zIndex: 9999 }} // evita bugs de visibilidad
                    preferredCountries={['ar', 'cl', 'co', 'mx', 'pe']} // los más usados arriba
                    enableSearch
                />
            </div>
            <div className="form-row">
              <input className="input" placeholder="E-mail:*" onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <small>(Recibirás el voucher de la reserva)</small>
          </div>

          <div className="payment-info">
            <p><strong>IMPORTANTE:</strong> Sólo se debitará el importe del Anticipo / Adelanto. En el complejo abonarás el saldo restante del valor total del turno (si lo hubiere). En caso de que canceles con más de <strong>24hs</strong> de anticipación, se reintegrará el importe de la seña de manera automática.</p>
          </div>

          <button className="confirm-button" onClick={handleSubmit}>Continuar</button>
        </div>
      </div>
    </div>
  );
}

export default ReservationConfirm;