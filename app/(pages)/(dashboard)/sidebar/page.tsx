"use client";
// pages/dashboard.tsx
import Sidebar from "@/app/(components)/sidebar/Sidebar";
import Image from "next/image";
import Link from "next/link";
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
import openClose from "../../../../public/icons/openClose.png";
import scheduleHome from "../../../../public/icons/scheduleHome.png";
import analysis from "../../../../public/icons/analysis.png";
import adminCenter from "../../../../public/icons/adminCenter.png";
import avaibility from "../../../../public/icons/avaibility.png";
import down from "../../../../public/icons/down.png";
import exportt from "../../../../public/icons/export.png";
import filterNew from "../../../../public/icons/filterNew.png";
import rightSmall from "../../../../public/icons/rightSmall.png";
import { DropdownData } from "@/app/(components)/profileData/ProfileData";
import axios from "axios";

interface DropdownProps {
  options: string[];
  onSelect: (option: string) => void;
}

interface Event {
  id: string;
  name: string;
  time: string;
  date: string;
  timeZone: string;
  email: string;
  additionalInfo: string;
  createdAt: string;
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

  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetchData();

    async function fetchData() {
      try {
        const response = await axios.get("/api/getEventsData");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  }, []);

  // const filteredEvents = events.filter(
  //   (event) => new Date(event.date) < new Date()
  // );

  // console.log("filtered Events :", filteredEvents);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("past");

  useEffect(() => {
    fetchData();

    async function fetchData() {
      try {
        const response = await axios.get("/api/getEventsData");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    filterEventsByCategory(selectedCategory);
  }, [selectedCategory, events]);

  const filterEventsByCategory = (category: string) => {
    switch (category) {
      case "upcoming":
        setFilteredEvents(
          events.filter((event) => new Date(event.date) > new Date())
        );
        break;
      case "past":
        setFilteredEvents(
          events.filter((event) => new Date(event.date) < new Date())
        );
        break;
      case "pending":
        // Implement logic for pending events
        setFilteredEvents([]);
        break;
      case "dateRange":
        const sortedEvents = [...events].sort((a, b) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return dateA - dateB;
        });
        setFilteredEvents(sortedEvents);
        break;
      default:
        setFilteredEvents(events);
        break;
    }
  };

  return (
    <div className="flex">
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      <div
        className={`flex flex-col flex-1 ${
          isSidebarOpen ? "lg:ml-[17%] md:ml-[25%] ml:[35%]" : "ml-[5%]"
        }`}
      >
        <div className="w-[100%]  px-6">
          <div className="flex h-[60px] justify-between">
            <div></div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Link
                  href={"/profile"}
                  className="h-[37px] w-[37px] text-center flex items-center justify-center rounded-[32px] px-4 border-[1px] bg-gray-400 text-[14px] font-semibold "
                >
                  M
                </Link>
                <div>
                  <Image src={downArrow} className="h-3 w-3" alt="Tab" />
                </div>
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
                      <div
                        className={`h-[48px] w-[89px] border-b-[3px] ${
                          selectedCategory === "upcoming"
                            ? "border-blue-600"
                            : "cursor-pointer hover:border-blue-600"
                        } items-center flex justify-center`}
                        onClick={() => setSelectedCategory("upcoming")}
                      >
                        <p className="text-[15px] font-normal">Upcoming</p>
                      </div>
                      <div
                        className={`h-[48px] w-[89px] border-b-[3px] ${
                          selectedCategory === "pending"
                            ? "border-blue-600"
                            : "cursor-pointer hover:border-blue-600"
                        } items-center flex justify-center`}
                        onClick={() => setSelectedCategory("pending")}
                      >
                        <p className="text-[15px] font-normal">Pending</p>
                      </div>
                      <div
                        className={`h-[48px] w-[89px] border-b-[3px] ${
                          selectedCategory === "past"
                            ? "border-blue-600"
                            : "cursor-pointer hover:border-blue-600"
                        } items-center flex justify-center`}
                        onClick={() => setSelectedCategory("past")}
                      >
                        <p className="text-[15px] font-normal">Past</p>
                      </div>

                      <div
                        className={`h-[48px] w-[89px] border-b-[3px] ${
                          selectedCategory === "dateRange"
                            ? "border-blue-600"
                            : "cursor-pointer hover:border-blue-600"
                        } items-center flex justify-center`}
                        onClick={() => setSelectedCategory("dateRange")}
                      >
                        <p className="text-[15px] font-normal">Date Range</p>
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
                {filteredEvents.map((event, index) => (
                  <div className="h-[96px] border-[1px] border-gray-300 border-t-0 px-8">
                    <div className="flex items-center justify-between">
                      <div className="h-[48px] flex mt-6 gap-3 w-[310px]">
                        {/* <div className="h-[30px] w-[30px] bg-slate-600 rounded-full"></div> */}
                        <>
                          <div className="h-[30px] text-white w-[30px] text-center flex items-center justify-center rounded-full border-[1px] bg-gray-400 text-[14px] font-semibold ">
                            {event.name.charAt(0).toUpperCase()}
                          </div>
                        </>
                        <div>
                          <p className="font-normal text-[13px]">
                            {event.time}
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
                              <span className="font-bold">
                                30 Minute Meeting
                              </span>
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
                ))}

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
