import React, { useState, useEffect } from 'react';
import styles from './Avaliable_Times.module.css';

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

const afternoonSlots = ['18:00', '19:00', '20:00', '21:00', '22:00'];

export default function ReservationSchedule() {
  const [courts, setCourts] = useState([]);
  const [selectedDate, setSelectedDate] = useState(days[0].fullDate);
  const [selectedTime, setSelectedTime] = useState('');
  const [reservations, setReservations] = useState({});

  const fetchCourts = async () => {
    try {
      const res = await fetch('https://localhost:7047/api/Court/Get');
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
        const res = await fetch(`https://localhost:7047/api/Reservation/GetAllReservationForCourtOfDay/Filter-For-Court-Of-Today?courtId=${court.id}&date=${selectedDate}`);
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

  const handleSubmit = async (courtId) => {
    const payload = {
      courtId: courtId,
      clientId: 2,
      date: selectedDate,
      time: selectedTime
    };

    try {
      const response = await fetch('https://localhost:7047/api/Reservation/Create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Sucedió un error inesperado');
      await response.json();
      alert('Reserva realizada correctamente ✅');
      setSelectedTime('');
      await fetchReservationsForAllCourts();
    } catch (err) {
      console.log(err.message);
      alert('Error al realizar la reserva ❌');
    }
  };

  return (
    <div className={styles.reservation_container}>
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

      {courts.map((court) => (
        <div key={court.id} className={styles.section}>
          <h3 className={styles.section_title}>{court.name}</h3>
          <div className={styles.slots_container}>
            {afternoonSlots.map((slot) => {
              const reservedTimes = reservations[court.id] || [];
              const isReserved = reservedTimes.includes(slot);
              return (
                <button
                  key={slot}
                  onClick={() => setSelectedTime(slot)}
                  disabled={isReserved}
                  className={`
                    ${isReserved ? styles.slot_button_disable : styles.slot_button} 
                    ${selectedTime === slot ? styles.selected : ''}`}
                >
                  {slot} hs
                </button>
              );
            })}
            {afternoonSlots.length === 0 && (
              <p className={styles.no_slots}>No hay horarios disponibles ese día.</p>
            )}
          </div>
          {selectedTime && (
            <div className={styles.selection_info}>
              <button className={styles.enviar} onClick={() => handleSubmit(court.id)}>
                Reservar en {court.name}
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
