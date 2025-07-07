import { useNavigate } from "react-router-dom";
import Calendar from "../../components/calendar/Calendar";
import { useEffect, useState } from "react";
import axios from "axios";

const Field_Finder_Page = () => {
  const navigate = useNavigate()
  const hours = ["18:00", "19:00", "20:00", "21:00", "22:00"]
  const [fields, setFields] = useState([]);

  const handleReserve = (field, formattedDate, time) => {
    if (!formattedDate) {
      alert("Debe seleccionar una fecha!")
    } else {
      navigate("/confirm",{ state: {
                                      field,
                                      hour: time,
                                      day: formattedDate
                                  } })

    }
  }

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const response = await axios.get("https://localhost:7047/api/Court/Get");
        setFields(response.data); // asumimos que devuelve un array de canchas

      } catch (error) {
        console.error("Error al traer las canchas:", error);
      }
    };

    fetchFields();
  }, []);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const formattedDate = selectedDate?.toISOString().split("T")[0]; // "2025-07-09"
  return (

    <div className="layout-container flex h-full grow flex-col">
      {/* Main Content */}
      <main className="px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px]  flex-1">
          {/* Title */}
          <div className="flex flex-wrap justify-between gap-3 p-4">
            <p className="text-[#0e151b] tracking-light text-[32px] font-bold leading-tight min-w-72">Reservar una cancha de fútbol</p>
          </div>

          {/* Calendar (puede ir como componente separado luego) */}
          <div className="rounded-lg bg-slate-100 w-fit h-[340px] m-auto">
            <Calendar selected={selectedDate} onSelect={setSelectedDate} />
          </div>

          {/* Available Fields */}
          <h2 className="text-[#0e151b] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Canchas disponibles</h2>
          <div className="px-4 py-3 @container">
            <div className="flex overflow-hidden rounded-xl border border-[#d0dde7] bg-slate-50">
              <table className="table-fixed w-full text-center">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="w-[140px] px-4 py-3 text-sm font-medium leading-normal text-[#0e151b]">Fútbol</th>
                    {hours.map((hour, i) => (
                      <th
                        key={i}
                        className="w-30 px-4 py-3 text-sm font-medium leading-normal text-[#4e7997]"
                      >
                        {hour} hs
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {fields.map((field, i) => (
                    <tr key={i} className="border-t border-t-[#d0dde7]">
                      <td className="px-4 py-3 text-sm text-[#0e151b]">
                        Cancha {field.name}
                      </td>
                      {hours.map((hour, j) => {
                        const isReserved = field.reservations?.some(
                          (r) =>
                            r.date === formattedDate &&
                            r.time.slice(0, 5) === hour // compara solo hh:mm
                        );

                        return (
                          <td
                            key={j}
                            className={`px-4 py-2 text-sm font-bold tracking-[0.015em] 
                            ${isReserved
                                ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                                : "text-[#4e7997] cursor-pointer hover:bg-blue-100 hover:text-blue-700 transition-colors"
                              }`}
                            onClick={() => {
                              if (!isReserved) handleReserve(field, formattedDate, hour);
                            }}
                          >
                            {hour}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>

  );
}

export default Field_Finder_Page;