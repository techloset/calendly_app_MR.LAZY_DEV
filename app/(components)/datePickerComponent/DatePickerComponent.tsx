import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";

interface DatePickerProps {
  onDateChange: (date: string) => void;
}

function DatePickerComponent({ onDateChange }: DatePickerProps): JSX.Element {
  const [value, setValue] = React.useState<dayjs.Dayjs | null>(null);

  const handleDateChange = (newValue: dayjs.Dayjs | null) => {
    if (newValue !== null) {
      const formattedDate = newValue.format("DD/MM/YYYY");
      onDateChange(formattedDate);
    }
    setValue(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div
        className="custom-calendar"
        style={{ width: "200px", height: "500px" }}
      >
        <DateCalendar value={value} onChange={handleDateChange} />
      </div>
    </LocalizationProvider>
  );
}

export default DatePickerComponent;
