import React, { useState } from "react";

interface CheckboxProps {
  label: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div className="flex flex-col items-center py-3">
      <input
        id={label}
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        className="w-[16px] h-[16px] text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-opacity-50"
      />
      <label
        htmlFor={label}
        className="ml-2 mt-2 text-[11px] font-normal text-gray-700"
      >
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
