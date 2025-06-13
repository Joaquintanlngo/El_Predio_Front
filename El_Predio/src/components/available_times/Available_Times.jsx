import React, { useState } from 'react';
import styles from './Avaliable_Times.module.css'; // Importá el CSS
import { useLocation } from 'react-router-dom';




// const morningSlots = ['11:00 am', '11:30 am'];
const afternoonSlots = ['18:00', '19:00', '20:00', '21:00', '22:00'];

export default function ReservationSchedule() {













  const days = Array.from({ length: 14 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() + i);

  const weekday = date.toLocaleDateString('es-AR', { weekday: 'short' });

  const day = date.getDate();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const dayStr = String(day).padStart(2, '0');
  const fullDate = `${year}-${month}-${dayStr}`;

  return { weekday, day, fullDate };
});


  const location = useLocation();
  const { court } = location.state;

//   const [body, setBody] = useState([]);
  const [selectedDate, setSelectedDate] = useState(days[0].fullDate);
  const [selectedTime, setSelectedTime] = useState('');



  const handleSubmit = async () => {

    const payload = {
        // tus datos a enviar
        courtId: court.id,
        clientId: 2,
        date: selectedDate,
        time: selectedTime
    };

    console.log(payload)

    try {
        const response = await fetch('https://localhost:7047/api/Reservation/Create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Error("Sucedió un error inesperado");

        const result = await response.json();
        console.log("Respuesta del servidor", result); 

        } catch (err) { 
            console.log(err.message);
        }
    }



//   console.log(court.name);
  return (
    <div className={styles.reservation_container}>
      <h2 className={styles.month_title}>Junio </h2>


      <div className={styles.days_scroll}>
        {days.map((d) => (
          <div
            key={d.fullDate}
            className={`${styles.day_item} ${selectedDate === d.fullDate ? styles.active : ''}`}
            onClick={() => {
              setSelectedDate(d.fullDate);
              setSelectedTime('');
            }}
          >
            <span className={styles.day_weekday}>{d.weekday}</span>
            <span className={styles.day_number}>{d.day}</span>
          </div>
        ))}
      </div>

      {/* <div className={styles.section}>
        <h3 className={styles.section_title}>Mañana</h3>
        <div className={styles.slots_container}>
          {morningSlots.map((slot) => (
            <button
              key={slot}
              onClick={() => setSelectedTime(slot)}
              className={`${styles.slot_button} ${selectedTime === slot ? styles.selected : ''}`}
            >
              {slot}
            </button>
          ))}
        </div>
      </div> */}

      <div className={styles.section}>
        {/* <h3 className={styles.section_title}>Tarde</h3> */}
        <div className={styles.slots_container}>
          {afternoonSlots.map((slot) => (
            <button
              key={slot}
              onClick={() => setSelectedTime(slot)}
              className={`${styles.slot_button} ${selectedTime === slot ? styles.selected : ''}`}
            >
              {slot} hs
            </button>
          ))}
        </div>
      </div>

      {selectedTime && (
        <div className={styles.selection_info}>
            <button className={styles.enviar} onClick={handleSubmit}>Reservar</button>
          {/* Seleccionaste: {selectedDate} a las {selectedTime} */}
        </div>
      )}
    </div>
  );
}
