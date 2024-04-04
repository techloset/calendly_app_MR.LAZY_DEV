"use client";
import React, { useEffect, useState } from "react";
import logo from "../../../../public/images/logo.svg";
import person from "../../../../public/vectors/personn.png";
import brading from "../../../../public/profile/star.png";
import link from "../../../../public/profile/link.png";
import preference from "../../../../public/profile/list.png";
import sync from "../../../../public/profile/calendar.png";
import help from "../../../../public/profile/help.png";
import setting from "../../../../public/profile/setting.png";
import logout from "../../../../public/profile/logout.png";
import downArrow from "../../../../public/profile/down-arrow.png";
import backArrow from "../../../../public/profile/backArrow.png";
import i from "../../../../public/profile/i.png";
import inviteUser from "../../../../public/profile/inviteUser.png";
import Image from "next/image";
import {
  countriesArray,
  countryCityData,
  hoursOptions,
  timesArray,
} from "@/app/(components)/profileData/ProfileData";

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
const page: React.FC = () => {
  const [selectedHour, setSelectedHour] = useState<string | null>(null);

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // const hoursOptions: string[] = ["8 am", "9 am", "10 am", "11 am", "12 pm"];

  return (
    <div>
      <div className="flex">
        <div className="w-[20%] flex flex-col justify-between px-6 py-4 h-[1100px] border-[1px]">
          <div>
            <div>
              <Image src={logo} className="h-[40px] w-[150px]" alt="" />
            </div>
            <div className="flex items-center gap-2 mt-10">
              <div>
                <Image src={backArrow} className="w-4 h-4" alt="" />
              </div>
              <div>
                <p className="text-blue-600 font-medium text-[18px]">
                  Back to home
                </p>
              </div>
            </div>

            <div className="mt-4">
              <p className=" font-bold text-[19px]">Account settings</p>
            </div>

            <div className="flex mt-4 py-2 gap-3 flex-row items-center">
              <div>
                <Image src={person} className="w-6 h-6" alt="" />
              </div>
              <div>
                <p className="text-blue-600 font-medium text-[18px]">Profile</p>
              </div>
            </div>
            <div className="flex gap-3 mt-3 py-2">
              <div>
                <Image src={brading} className="w-6 h-6" alt="" />
              </div>
              <div>
                <p className=" font-medium text-[18px]">Branding</p>
              </div>
            </div>
            <div className="flex gap-3 mt-3 py-2">
              <div>
                <Image src={link} className="w-6 h-6" alt="" />
              </div>
              <div>
                <p className=" font-medium text-[18px]">My Link</p>
              </div>
            </div>
            <div className="flex gap-3 mt-3 py-2">
              <div>
                <Image src={preference} className="w-6 h-6" alt="" />
              </div>
              <div>
                <p className=" font-medium text-[18px]">Login preferences</p>
              </div>
            </div>
            <div className="flex gap-3 mt-3 py-2">
              <div>
                <Image src={setting} className="w-6 h-6" alt="" />
              </div>
              <div>
                <p className=" font-medium text-[18px]">Cookie settings</p>
              </div>
            </div>
            <div className="flex gap-3 mt-3 py-2">
              <div>
                <Image src={sync} className="w-6 h-6" alt="" />
              </div>
              <div>
                <p className=" font-medium text-[18px]">Calendar sync</p>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-3 mt-3 py-2">
              <div>
                <Image src={help} className="w-6 h-6" alt="" />
              </div>
              <div>
                <p className=" font-medium text-[18px]">Help</p>
              </div>
              <div>
                <Image src={downArrow} className="w-3 mt-1 h-3" alt="" />
              </div>
            </div>
            <div className="flex gap-3 mt-3 py-2">
              <div>
                <Image src={logout} className="w-6 h-6" alt="" />
              </div>
              <div>
                <p className=" font-medium text-[18px]">Logout</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[80%] h-[1000px]">
          <div className="flex h-[60px] px-6 justify-between">
            <div></div>
            <div className="flex items-center gap-3">
              <div className="flex jstify-center gap-2">
                <button className="h-[37px] gap-2 border-[blue] text-center flex items-center justify-center rounded-[32px] px-4 border-[1px] text-blue-700 text-[12px] font-bold ">
                  <Image src={inviteUser} className="h-6 w-6" alt="Tab" />
                  Invite user
                </button>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-[37px] w-[37px] text-center flex items-center justify-center rounded-[32px] px-4 border-[1px] bg-gray-400 text-[14px] font-semibold ">
                  M
                </div>
                <div>
                  <Image src={downArrow} className="h-3 w-3" alt="Tab" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="h-full w-[45%] px-7 py-4">
              <div>
                <div>
                  <p className="font-medium text-[16px]">Account details</p>
                </div>
                <div className="mt-4">
                  <p className="font-semibold text-[22px]">Profile</p>
                </div>

                <div className="mt-16 flex gap-7 items-center">
                  <div className="h-24 w-24 bg-slate-300 rounded-full"></div>
                  <div className="">
                    <div>
                      <button className="h-[37px] gap-2 text-center border-black flex items-center justify-center rounded-[32px] px-4 border-[1px] text-[12px] font-bold ">
                        Upload picture
                      </button>
                    </div>
                    <div className="mt-4">
                      <p className="text-[13px]">
                        JPG, GIF or PNG, Max size of 5MB.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex mt-2 items-center gap-2">
                    <p className="font-bold text-[16px]">Name</p>
                    <div>
                      <Image src={i} className="h-3 w-3" alt="i" />
                    </div>
                  </div>
                  <div className="mt-2">
                    <input
                      type="text"
                      className="h-[40px] w-[450px] border-[1px] px-3 rounded-md"
                      placeholder="Muhammad Talha"
                    />
                  </div>

                  <div className="flex mt-7 items-center gap-2">
                    <p className="font-bold text-[16px]">Welcome message</p>
                    <div>
                      <Image src={i} className="h-3 w-3" alt="i" />
                    </div>
                  </div>
                  <div className="mt-2">
                    <textarea
                      rows={10}
                      className="h-[90px] border-[1px] w-[450px] px-3 rounded-md"
                      placeholder=""
                    />
                  </div>

                  <div className="mt-3">
                    <div className="">
                      <p className="font-bold text-[16px]">Language</p>
                    </div>

                    <div className="h-[40px] mt-2 w-[450px] border-[1px] border-[#B2B2B2] rounded-[8px]">
                      <Dropdown
                        options={hoursOptions}
                        onSelect={(option) => setSelectedHour(option)}
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="flex gap-4 w-[450px]">
                      <div>
                        <div className="flex gap-2 items-center">
                          <p className="font-bold text-[16px]">Date Format</p>
                          <Image src={i} className="h-3 w-3" alt="i" />
                        </div>
                        <div className="h-[40px] mt-2">
                          {/* <Dropdown
                            options={hoursOptions}
                            onSelect={(option) => setSelectedHour(option)}
                          /> */}
                          <input
                            type="date"
                            className="h-[40px] w-[215px] px-3 border-[1px] border-gray-400 rounded-md"
                            name=""
                            placeholder="DD/MM/YYYY"
                            id=""
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex gap-2 items-center">
                          <p className="font-bold text-[16px]">Time Format</p>
                          <Image src={i} className="h-3 w-3" alt="i" />
                        </div>
                        <div className="h-[40px] w-[215px] border-[1px] border-gray-400 rounded-md mt-2">
                          <Dropdown
                            options={timesArray}
                            onSelect={(option) => setSelectedHour(option)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="">
                        <p className="font-bold text-[16px]">Language</p>
                      </div>

                      <div className="h-[40px] mt-2 w-[450px] border-[1px] border-[#B2B2B2] rounded-[8px]">
                        <Dropdown
                          options={countriesArray}
                          onSelect={(option) => setSelectedHour(option)}
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex w-[450px] justify-between items-center">
                        <p className="font-bold text-[16px]">Time Zone</p>
                        <p className="font-normal text-[16px]">
                          Current Time:{" "}
                          {currentTime.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>

                      <div className="h-[40px] mt-2 w-[450px] border-[1px] border-[#B2B2B2] rounded-[8px]">
                        <Dropdown
                          options={countryCityData}
                          onSelect={(option) => setSelectedHour(option)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-7 px-7 w-[66%]">
              <div className="flex justify-between items-center">
                <div className="flex gap-3">
                  <button className="h-[44px] bg-blue-600 text-white border-bg-blue-600 text-center flex items-center justify-center rounded-[32px] px-4 border-[1px] text-[14px] font-bold ">
                    Save changes
                  </button>
                  <button className="h-[44px]  text-center flex items-center border-black justify-center rounded-[32px] px-4 border-[1px] text-[14px] font-bold ">
                    Cancel
                  </button>
                </div>
                <div>
                  <button className="h-[44px] bg-red-600 text-white border-bg-blue-600 text-center flex items-center justify-center rounded-[32px] px-4 border-[1px] text-[14px] font-bold ">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
