import React, { ChangeEvent } from "react";

interface AuthInputField {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  name?: string;
}
const AuthInputField = ({
  value,
  type,
  placeholder,
  name,
  onChange,
}: AuthInputField) => {
  return (
    <input
      type={type}
      className="w-[374px] h-[46px] border-[1px] border[#B2B2B2] rounded-[8px] px-4 pr-10"
      placeholder={placeholder}
      value={value}
      name={name}
      onChange={onChange}
    />
  );
};

export default AuthInputField;
