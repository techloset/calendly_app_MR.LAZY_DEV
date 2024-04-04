"use client";
import React, { useState } from "react";
import image from "../../../../public/images/logo1.png";
import second from "../../../../public/images/second.png";
import icon from "../../../assets/images/icon.png";
import progressBar from "../../../../public/images/progressBar.png";
import speaker from "../../../../public/vectors/speaker.png";
import Checkbox from "@/app/(components)/checkBox/CheckBox";
import Image from "next/image";

interface DropdownProps {
  options: string[];
  onSelect: (option: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect }) => {
  return (
    <select
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "8px",
        border: "1px ",
        paddingLeft: "10px",
      }}
      onChange={(e) => onSelect(e.target.value)}
    >
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

const Page: React.FC = () => {
  const [selectedHour, setSelectedHour] = useState<string | null>(null);

  const hoursOptions: string[] = ["8 am", "9 am", "10 am", "11 am", "12 pm"];

  return (
    <div>
      <div className="bg-white h-[60px] flex justify-center">
        <div className="flex justify-center">
          <Image src={image} className="w-[182px] mt-3 h-[43px]" alt="Logo" />
        </div>
      </div>

      <div className="flex justify-center mt-7">
        <div className="w-[645px] h-[587px] ">
          <div className="w-[645px] h-[163px] flex border-[2px] ">
            <div className="w-[457px] h-[163px] px-8 pr-10 py-8">
              <div>
                <p className="text-[18px] font-bold">Set your availability</p>
              </div>
              <div className="mt-4">
                <p className="text-[14px] font-normal">
                  Let Calendly know when you’re typically available to accept
                  meetings.
                </p>
              </div>
            </div>
            <div className="w-[190px] h-[163px]">
              <Image src={second} className="w-[100%] h-[99%]" alt="Logo" />
            </div>
          </div>
          <div className="w-[645px] h-[302px] py-5 px-6 border-[2px] ">
            <p className="text-[14px] font-bold">Available hours</p>
            <div className="mt-2 w-[595px] h-[46px] flex justify-between">
              <div className="h-[46px] w-[278px] border-[1px] border-[#B2B2B2] rounded-[8px]">
                <Dropdown
                  options={hoursOptions}
                  onSelect={(option) => setSelectedHour(option)}
                />
              </div>
              <div className="h-[46px] w-[278px] border-[1px] border-[#B2B2B2] rounded-[8px]">
                <Dropdown
                  options={hoursOptions}
                  onSelect={(option) => setSelectedHour(option)}
                />
              </div>
            </div>

            <p className="text-[14px] mt-5 font-bold">Available days</p>
            <div className="mt-2 w-[595px] h-[60px] flex border-[1px] border-[#DADADA] rounded-[8px]">
              <div className="w-[86px] h-[60px] rounded-s-md border-[1px]">
                <Checkbox label={"Sundays"} />
              </div>
              <div className="w-[86px] h-[60px] border-[1px]">
                <Checkbox label={"Mondays"} />
              </div>
              <div className="w-[86px] h-[60px] border-[1px]">
                <Checkbox label={"Tuesdays"} />
              </div>
              <div className="w-[86px] h-[60px] border-[1px]">
                <Checkbox label={"Wednesdays"} />
              </div>
              <div className="w-[86px] h-[60px] border-[1px]">
                <Checkbox label={"Thursdays"} />
              </div>
              <div className="w-[86px] h-[60px] border-[1px]">
                <Checkbox label={"Fridays"} />
              </div>
              <div className="w-[86px] h-[60px] rounded-r-md border-[1px]">
                <Checkbox label={"Saturdays"} />
              </div>
            </div>
            <div className="mt-12 w-[595px] h-[24px] gap-2 flex justify-center">
              <div>
                <Image src={speaker} alt="speaker" />
              </div>
              <div>
                <p className="text-[14px] font-normal text-[#1A1A1A]">
                  Don’t worry! You’ll be able to further customize your
                  availability later on.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 items-center w-[645px] flex justify-between h-[44px]">
            <div>
              {" "}
              <Image
                src={progressBar}
                className="w-[100%] h-[100%]"
                alt="Logo"
              />
            </div>
            <div className="flex gap-2">
              <div className="flex justify-center">
                <button className="h-[44px] border-[grey] text-center flex items-center justify-center px-3 text-[13px] font-bold ">
                  Set up later
                </button>
              </div>
              <div className="flex justify-center">
                <button className="h-[44px] border-[#0069FF] bg-[#0069FF] text-center flex items-center text-white justify-center rounded-[32px] px-3 border-[1px] text-[13px] font-bold ">
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
