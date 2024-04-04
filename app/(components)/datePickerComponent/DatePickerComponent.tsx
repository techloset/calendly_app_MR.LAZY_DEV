import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";

function DatePickerComponent(): JSX.Element {
  const [value, setValue] = React.useState<dayjs.Dayjs | null>(null);

  const handleDateChange = (newValue: dayjs.Dayjs | null) => {
    if (newValue !== null) {
      const formattedDate = newValue.format("DD/MM/YYYY");

      // Log the formatted date to the console
      console.log("Selected Date:", formattedDate);
    }
    setValue(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={value}
        onChange={handleDateChange}
        className="custom-calendar"
      />
    </LocalizationProvider>
  );
}

export default DatePickerComponent;
