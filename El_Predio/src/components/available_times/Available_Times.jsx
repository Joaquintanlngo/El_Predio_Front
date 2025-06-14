import React, { useState, useEffect } from 'react';
import styles from './Avaliable_Times.module.css';
import Court_Card from '../court_card/Court_Card';

const days = Array.from({ length: 30 }, (_, i) => {
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

const afternoonSlots = ['18:00', '19:00', '20:00', '21:00', '22:00'];

export default function Available_Times() {
  const [courts, setCourts] = useState([]);
  const [selectedDate, setSelectedDate] = useState(days[0].fullDate);
  const [selectedTime, setSelectedTime] = useState('');
  const [reservations, setReservations] = useState({});

  const fetchCourts = async () => {
    try {
      const res = await fetch('https://localhost:7047/api/Court/Get');
      if (!res.ok) throw new Error('Error al obtener canchas');
      const data = await res.json();
      setCourts(data);
    } catch (error) {
      console.error('Error al cargar canchas:', error);
    }
  };

  const fetchReservationsForAllCourts = async () => {
    try {
      const newReservations = {};
      for (const court of courts) {
        const url = `https://localhost:7047/api/Reservation/GetAllReservationForCourtOfDay/Filter-For-Court-Of-Today?courtId=${court.id}&date=${selectedDate}`;
        const res = await fetch(url);

        const contentType = res.headers.get("content-type");
        if (!res.ok || !contentType.includes("application/json")) {
          const errorText = await res.text();
          console.error(`Error (${res.status}) para la cancha ${court.id}:`, errorText);
          continue;
        }

        const data = await res.json();
        newReservations[court.id] = data.map(r => r.time?.slice(0, 5));
      }
      setReservations(newReservations);
    } catch (error) {
      console.error('Error al cargar reservas:', error);
    }
  };

  useEffect(() => {
    fetchCourts();
  }, []);

  useEffect(() => {
    if (courts.length > 0) {
      fetchReservationsForAllCourts();
    }
  }, [selectedDate, courts]);

  // const handleSubmit = async () => {
  //   if (!selectedTime) return;
  //   const [courtId, time] = selectedTime.split('-');

  //   const payload = {
  //     courtId: parseInt(courtId),
  //     clientId: 2,
  //     date: selectedDate,
  //     time: time
  //   };

  //   try {
  //     const response = await fetch('https://localhost:7047/api/Reservation/Create', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(payload)
  //     });

  //     if (!response.ok) throw new Error('Sucedió un error inesperado');
  //     await response.json();
  //     alert('Reserva realizada correctamente ✅');
  //     setSelectedTime('');
  //     await fetchReservationsForAllCourts();
  //   } catch (err) {
  //     console.log(err.message);
  //     alert('Error al realizar la reserva ❌');
  //   }
  // };

  return (
    <div className={styles.reservation_container}>
      <div className={styles.reservation}>

        <h2 className={styles.month_title}>Junio</h2>

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

        <table className={styles.schedule_table}>
          <thead>
            <tr>
              <th>Fútbol</th>
              {afternoonSlots.map((slot) => (
                <th  key={slot}>{slot}hs</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {courts.map((court) => {
              const reservedTimes = reservations[court.id] || [];
              return (
                <tr key={court.id}>
                  <td ><strong>{`Cancha ${court.name} (F${court.name.slice(0,1)})`}</strong></td>
                  {afternoonSlots.map((slot) => {
                    const isReserved = reservedTimes.includes(slot);
                    const isSelected = selectedTime === `${court.id}-${slot}`;
                    return (
                      <td key={slot}>
                        <button
                          onClick={() => setSelectedTime(`${court.id}-${slot}`)}
                          disabled={isReserved}
                          className={`
                            ${isReserved ? styles.slot_button_disable : styles.slot_button}
                            ${isSelected ? styles.selected : ''}
                          `}
                        >
                          {slot}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>

      </div>
        <Court_Card 
        selectedTime={selectedTime}
        selectedDay={selectedDate}
        />

      {/* {selectedTime && (
        <div className={styles.reserve_button_wrapper}>
          <button className={styles.enviar} onClick={handleSubmit}>
            Reservar
          </button>
        </div>
      )} */}
    </div>
    
  );
}
