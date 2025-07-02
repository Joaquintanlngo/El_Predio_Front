import { useNavigate } from "react-router-dom";
import Calendar from "../../components/calendar/Calendar";


const Field_Finder_Page = () => {
    const navigate = useNavigate()
    const hours = ["18:00", "19:00", "20:00", "21:00", "22:00"]
    const fields = ["5A", "5B", "6A", "6C", "7T", "7AL", "8AL"]

  const handleReserve = (cancha, horario) => {
    console.log(cancha, horario)
    navigate("/confirm")
  }

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
                <Calendar/>
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
    {fields.map((type, i) => (
      <tr key={i} className="border-t border-t-[#d0dde7]">
        <td className="w-[140px] px-4 py-3 text-sm font-normal leading-normal text-[#0e151b]">
          Cancha {type} (F{type.slice(0, 1)})
        </td>
        {hours.map((hour, j) => (
          <td
            key={j}
            className="w-30 px-4 py-2 text-sm font-bold leading-normal tracking-[0.015em] text-[#4e7997] cursor-pointer hover:bg-blue-100 hover:text-blue-700 transition-colors"
            onClick={() => handleReserve(type, hour)}
          >
            {hour}
          </td>
        ))}
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