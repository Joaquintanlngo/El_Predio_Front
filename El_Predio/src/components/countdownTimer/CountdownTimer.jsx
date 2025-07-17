import { useEffect, useState } from "react";

const CountdownTimer = ({ durationInMinutes = 6, onExpire }) => {
  const [secondsRemaining, setSecondsRemaining] = useState(0);

  useEffect(() => {
    const key = "reservation-expiration-time";

    // Intentar leer la hora de expiración guardada
    let expirationTimestamp = localStorage.getItem(key);

    // Si no hay, la seteamos ahora
    if (!expirationTimestamp) {
      const now = new Date().getTime();
      expirationTimestamp = now + durationInMinutes * 60 * 1000;
      localStorage.setItem(key, expirationTimestamp);
    }

    const updateTimeLeft = () => {
      const now = new Date().getTime();
      const remaining = Math.floor((expirationTimestamp - now) / 1000);
      setSecondsRemaining(remaining);

      if (remaining <= 0) {
        localStorage.removeItem(key); // limpiar el tiempo al expirar
        onExpire?.();
      }
    };

    updateTimeLeft(); // actualización inicial

    const interval = setInterval(updateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [durationInMinutes, onExpire]);

  // Evitar valores negativos
  const safeSeconds = Math.max(secondsRemaining, 0);

  const hours = Math.floor(safeSeconds / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);
  const seconds = safeSeconds % 60;

  const timeParts = {
    Horas: String(hours).padStart(2, "0"),
    Minutos: String(minutes).padStart(2, "0"),
    Segundos: String(seconds).padStart(2, "0"),
  };

  return (
    <div className="flex gap-4 py-6 px-4">
      {["Horas", "Minutos", "Segundos"].map((label) => (
        <div key={label} className="flex grow basis-0 flex-col items-stretch gap-4">
          <div className="flex h-14 grow items-center justify-center rounded-xl px-3 bg-[#e7eef3]">
            <p className="text-[#0e151b] text-lg font-bold leading-tight tracking-[-0.015em]">
              {timeParts[label]}
            </p>
          </div>
          <div className="flex items-center justify-center">
            <p className="text-[#0e151b] text-sm font-normal leading-normal">{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;
