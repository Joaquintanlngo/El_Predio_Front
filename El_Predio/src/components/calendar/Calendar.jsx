import React, { useState } from "react";
import { es } from 'date-fns/locale';
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const Calendar = () => {

  const todayString = new Date();
  
  const [selected, setSelected] = useState(todayString);
  const [month, setMonth] = useState();

  const handleMonthChange = (newMonth) => {
    setMonth(newMonth);
  };

  const today = new Date();
  const oneMonthLater = new Date();
  oneMonthLater.setMonth(today.getMonth() + 1);

  return (
    <>

        <DayPicker
            mode="single"
            selected={selected}
            onSelect={setSelected}
            month={month}
            onMonthChange={handleMonthChange}
            showOutsideDays
            fixedWeeks
            captionLayout="buttons"
            d disabled={{ before: today, after: oneMonthLater }}
            locale={es}
            className="
                text-sm text-[#0e151b]
                [&_.rdp-months]:justify-center
                [&_.rdp-caption]:flex [&_.rdp-caption]:items-center [&_.rdp-caption]:justify-between [&_.rdp-caption]:w-full [&_.rdp-caption]:gap-4
                [&_.rdp-caption_label]:text-base [&_.rdp-caption_label]:font-medium [&_.rdp-caption_label]:order-2 [&_.rdp-caption_label]:text-center [&_.rdp-caption_label]:flex-1
                [&_.rdp-nav]:order-1 [&_.rdp-nav]:flex [&_.rdp-nav]:gap-4
                [&_.rdp-nav_button_previous]:order-1
                [&_.rdp-nav_button_next]:order-3
                [&_.rdp-nav_button]:text-xl
                [&_.rdp-table]:w-auto
                [&_.rdp-head_cell]:w-8 h-8 text-center text-xs text-[#4e7997]
                [&_.rdp-day]:!w-8 [&_.rdp-day]:!h-8 [&_.rdp-day]:text-center [&_.rdp-day]:text-sm [&_.rdp-day]:p-0
                [&_.rdp-day_selected]:bg-blue-500 [&_.rdp-day_selected]:text-white [&_.rdp-day_selected]:rounded-full
                [&_.rdp-day_today]:font-normal
            "
            modifiersClassNames={{
                selected: "bg-blue-500 text-white rounded-full",
                today: "font-text-normal",
        }}
        />
    </>
  );


};

export default Calendar;