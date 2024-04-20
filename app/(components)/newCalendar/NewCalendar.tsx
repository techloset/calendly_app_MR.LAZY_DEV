import React, { useState, useEffect } from "react";
import {
  format,
  startOfWeek,
  getDay,
  addDays,
  addMonths,
  subMonths,
  startOfMonth,
  isToday,
} from "date-fns";

import rightt from "../../../public/vectors/rightt.png";
import leftt from "../../../public/vectors/leftt.png";
import Image from "next/image";

interface CalendarProps {
  selectedDate?: Date;
  onDateChange?: (date: Date) => void;
}

const NewCalendar: React.FC<CalendarProps> = ({
  selectedDate,
  onDateChange,
}) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selected, setSelected] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentDate(selectedDate || new Date());
  }, [selectedDate]);

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const selectDate = (date: Date) => {
    const today = new Date();
    if (date.getTime() >= today.getTime()) {
      setCurrentDate(date);
      setSelected(date);
      onDateChange?.(date);
    }
  };

  const firstDayOfMonth = startOfWeek(startOfMonth(currentDate), {
    weekStartsOn: 1,
  });

  const days: Date[] = [];
  for (let i = 0; i < 35; i++) {
    const date = addDays(firstDayOfMonth, i);
    days.push(date);
  }

  return (
    <div className="calendar w-[380px] h-96">
      <div className="calendar-header flex justify-evenly items-center py-2 px-4">
        <button
          onClick={prevMonth}
          className="btn btn-sm rounded-full p-2 hover:bg-[#b7ccea]"
        >
          <Image src={leftt} alt="Previous Month" />
        </button>
        <span className="text-xl font-bold">
          {format(currentDate, "MMMM yyyy")}
        </span>
        <button
          onClick={nextMonth}
          className="btn btn-sm rounded-full p-2 bg-[#b7ccea]"
        >
          <Image src={rightt} alt="Next Month" />
        </button>
      </div>
      <div className="calendar-grid grid grid-cols-7 gap-1 px-4 py-2">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <div key={day} className="text-center text-xs font-bold">
            {day}
          </div>
        ))}
        {days.map((day) => (
          <div
            key={day.toString()}
            className={`calendar-day flex cursor-pointer justify-center items-center p-3 rounded-full hover:bg-[#c5d7f0] ${
              getDay(day) === 0 || getDay(day) === 6
                ? "text-[#a9b2be] hover:bg-[#c7cbd2]"
                : ""
            } ${
              day.toDateString() === selected?.toDateString()
                ? "bg-[#0069FF] text-white font-bold"
                : ""
            } ${
              isToday(day) ? "items-center justify-center flex flex-col" : ""
            }`}
            onClick={() => selectDate(day)}
          >
            {format(day, "d")}
            {isToday(day) && (
              <div className="dot bg-black w-1 rounded-full h-1" />
            )}{" "}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewCalendar;
