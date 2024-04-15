// TimezoneSelector.tsx
import Image from "next/image";
import React, { useState } from "react";
import world from "../../../public/vectors/globe.png";

interface TimeZone {
  label: string;
  value: string;
}

interface TimezoneSelectorProps {
  timeZones: TimeZone[];
  onChange: (value: string | null) => void;
}

const TimezoneSelector: React.FC<TimezoneSelectorProps> = ({
  timeZones,
  onChange,
}) => {
  const [selectedTimeZone, setSelectedTimeZone] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedTimeZone(value);
    onChange(value); // Call the onChange callback with the selected value
  };

  const hours: string = String(new Date().getHours()).padStart(2, "0");
  const mints: string = String(new Date().getMinutes()).padStart(2, "0");

  return (
    <div className="flex">
      <Image src={world} className="h-4 w-4 mt-2" alt="world" />
      <select
        id="timezone-select"
        className="rounded-md p-2 font-normal"
        value={selectedTimeZone || ""}
        onChange={handleChange}
      >
        {timeZones.map((timeZone: TimeZone, index: number) => (
          <option key={index} value={timeZone.value + `(${hours} : ${mints})`}>
            {timeZone.label}
            {`(${hours} : ${mints})`}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TimezoneSelector;
