import React, { useState } from "react";

interface TimeZone {
  label: string;
  value: string;
}

const TimezoneSelector: React.FC<{ timeZones: TimeZone[] }> = ({
  timeZones,
}) => {
  const [selectedTimeZone, setSelectedTimeZone] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTimeZone(event.target.value);
  };

  const hours = new Date().getHours();
  const mints = new Date().getMinutes();

  return (
    <div className="flex">
      <select
        id="timezone-select"
        className="rounded-md p-2 font-normal"
        value={selectedTimeZone || ""}
        onChange={handleChange}
      >
        {timeZones.map((timeZone: TimeZone, index: number) => (
          <option key={index} value={timeZone.value}>
            {timeZone.label}
            {`(${hours} : ${mints})`}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TimezoneSelector;
