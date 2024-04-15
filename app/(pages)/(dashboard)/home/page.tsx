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
import openClose from "../../../../public/icons/openClose.png";
import scheduleHome from "../../../../public/icons/scheduleHome.png";
import analysis from "../../../../public/icons/analysis.png";
import adminCenter from "../../../../public/icons/adminCenter.png";
import avaibility from "../../../../public/icons/avaibility.png";
import down from "../../../../public/icons/down.png";
import exportt from "../../../../public/icons/export.png";
import filterNew from "../../../../public/icons/filterNew.png";
import rightSmall from "../../../../public/icons/rightSmall.png";
import {
  DropdownData,
  countriesArray,
  countryCityData,
  hoursOptions,
  timesArray,
} from "@/app/(components)/profileData/ProfileData";
import Link from "next/link";
import { useSession } from "next-auth/react";

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
  const { data: session, status } = useSession();

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
      <div className="flex h-[811px]">
        <div className="w-[18%] flex flex-col justify-between px-3 py-4 border-gray-300 border-[1px]">
          <div>
            <div className="flex justify-between items-center">
              <div>
                <Image src={logo} className="h-[40px] w-[150px]" alt="" />
              </div>
              <div>
                <Image src={openClose} className="h-4 w-4" alt="" />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-10">
              <p className="text-white bg-[#0069FF]  w-[100%] items-center justify-center py-2 rounded-full  border-[1px]font-medium flex gap-2 text-[18px]">
                <span>+</span>
                <span>Create</span>
              </p>
            </div>

            <div className="flex mt-6 py-2 gap-3 flex-row bg-[#F2F8FF] cursor-pointer px-3 w-[243px] h-[44px] items-center">
              <div>
                <Image src={scheduleHome} className="w-4 h-4" alt="" />
              </div>
              <div className="">
                <p className="text-[#0069FF] font-bold text-[14px]">
                  Schedule Event
                </p>
              </div>
            </div>
            <div className="flex mt-3 py-2 gap-3 flex-row px-3  hover:bg-[#F2F8FF] cursor-pointer w-[243px] h-[44px] items-center">
              <div>
                <Image src={analysis} className="w-4 h-4" alt="" />
              </div>
              <div className="">
                <p className=" font-bold text-[14px]">Analisis</p>
              </div>
            </div>
          </div>
          <div>
            <div className="flex mt-3 py-2 gap-3 flex-row  hover:bg-[#F2F8FF] cursor-pointer px-3 w-[243px] h-[44px] items-center">
              <div>
                <Image src={avaibility} className="w-4 h-4" alt="" />
              </div>
              <div className="">
                <p className=" font-bold text-[14px]">Availability</p>
              </div>
            </div>
            <div className="flex mt-2 py-2 gap-3 flex-row  hover:bg-[#F2F8FF] cursor-pointer px-3 w-[243px] h-[44px] items-center">
              <div>
                <Image src={adminCenter} className="w-4 h-4" alt="" />
              </div>
              <div className="">
                <p className=" font-bold text-[14px]">Admin center</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[82%] px-6">
          <div className="flex h-[60px] justify-between">
            <div></div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                {session?.user?.image ? (
                  <Link href={"/profile"} className="flex items-center gap-2">
                    <Image
                      src={session?.user?.image}
                      width={100}
                      height={100}
                      className="h-[37px] w-[37px] rounded-full "
                      alt=""
                    />
                    <div>
                      <Image src={downArrow} className="h-3 w-3" alt="Tab" />
                    </div>
                  </Link>
                ) : (
                  <>
                    <Link
                      href={"/profile"}
                      className="h-[37px] w-[37px] text-center flex items-center justify-center rounded-[32px] px-4 border-[1px] bg-gray-400 text-[14px] font-semibold "
                    >
                      M
                    </Link>
                    <div>
                      <Image src={downArrow} className="h-3 w-3" alt="Tab" />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="h-full w-[45%] py-4">
              <div className="mt-4">
                <p className="font-bold text-[25px] leading-7">
                  Scheduled events
                </p>
              </div>
            </div>

            <div className="flex mt-9 h-[60px] justify-between">
              <div className="h-[46px] w-[151px] border-[1px] text-[14px] font-normal border-gray-300 rounded-md mt-2">
                <Dropdown
                  options={DropdownData}
                  onSelect={(option) => setSelectedHour(option)}
                />
              </div>
              <div className="flex items-center gap-3">
                <p className="font-normal text-[14px] text-gray-500">
                  Displaying 1 of 1 Events
                </p>
              </div>
            </div>

            <div className="mt-4">
              <div className="h-[277px]">
                <div className="h-[64px] rounded-t-[6px] flex justify-between border-[1px] border-gray-300 items-center px-8">
                  <div>
                    <div className="flex gap-3 mt-4">
                      <div className="h-[48px] w-[89px] border-b-[3px] border-blue-600 items-center flex justify-center">
                        <p className="text-[15px] font-normal">Upcoming</p>
                      </div>
                      <div className="h-[48px] w-[89px] border-b-[3px] cursor-pointer hover:border-blue-600 items-center flex justify-center">
                        <p className="text-[15px] text-gray-500 font-normal">
                          Pending
                        </p>
                      </div>
                      <div className="h-[48px] w-[89px] border-b-[3px] cursor-pointer hover:border-blue-600 items-center flex justify-center">
                        <p className="text-[15px] text-gray-500 font-normal">
                          Past
                        </p>
                      </div>
                      <div className="h-[48px] w-[89px] border-b-[3px] cursor-pointer hover:border-blue-600 items-center flex justify-center">
                        <p className="text-[15px] text-gray-500 font-normal">
                          Data Range
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex gap-2 border-[1px] border-black px-3 py-2 rounded-full ">
                      <div>
                        <Image
                          src={exportt}
                          className="h-[16px] w-[16px]"
                          alt=""
                        />
                      </div>
                      <div>
                        <p className="font-normal text-[12px]">Export</p>
                      </div>
                    </div>
                    <div className="flex gap-2 border-[1px] border-black px-3 py-2 rounded-full ">
                      <div>
                        <Image
                          src={filterNew}
                          className="h-[16px] w-[16px]"
                          alt=""
                        />
                      </div>
                      <div>
                        <p className="font-normal text-[12px]">Filter</p>
                      </div>
                      <div>
                        <Image
                          src={down}
                          className="h-[16px] w-[16px]"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-[58px] px-8 border-[1px] border-t-0 border-gray-300 flex items-center">
                  <p className="font-bold text-[15px]">
                    Wednesday, 27 March 2024
                  </p>
                </div>
                <div className="h-[96px] border-[1px] border-gray-300 border-t-0 px-8">
                  <div className="flex items-center justify-between">
                    <div className="h-[48px] flex mt-6 gap-3 w-[310px]">
                      <div className="h-[30px] w-[30px] bg-slate-600 rounded-full"></div>
                      <div>
                        <p className="font-normal text-[13px]">
                          11:00am - 11:30am
                        </p>
                      </div>
                    </div>
                    <div className="h-[48px] mt-6 w-[310px]">
                      <div className="h-[48px] gap-3 w-[310px]">
                        <div className="">
                          <p className="font-bold text-[14px]">test</p>
                        </div>
                        <div>
                          <p className="font-normal text-[14px]">
                            Event type{" "}
                            <span className="font-bold">30 Minute Meeting</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className=" h-[48px] mt-6 w-[310px]">
                      <div className="h-[48px] gap-3 w-[310px]">
                        <div className="">
                          <p className="font-normal flex gap-2 text-[14px]">
                            <span className="px-2 border-r-2  border-black">
                              1 host
                            </span>
                            <span>non-hosts</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className=" h-[48px] flex items-center mt-6 w-[68px]">
                      <div className="flex gap-2">
                        <div>
                          <Image
                            src={rightSmall}
                            className="h-[16px] w-[16px]"
                            alt=""
                          />
                        </div>
                        <div>
                          <p className="font-normal text-[14px] text-gray-500">
                            Details
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-[58px] rounded-b-[6px] border-[1px] border-t-0 text-gray-500 border-gray-300 justify-center flex items-center">
                  <p className="font-normal text-[15px]">
                    You've reached the end of the list
                  </p>
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
