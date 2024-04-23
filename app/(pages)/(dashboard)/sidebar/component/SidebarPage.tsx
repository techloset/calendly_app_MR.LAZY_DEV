"use client";
import Sidebar from "@/app/(components)/sidebar/Sidebar";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import downArrow from "../../../../../public/profile/down-arrow.png";
import down from "../../../../../public/icons/down.png";
import exportt from "../../../../../public/icons/export.png";
import filterNew from "../../../../../public/icons/filterNew.png";
import rightSmall from "../../../../../public/icons/rightSmall.png";
import { DropdownData } from "@/app/(components)/profileData/ProfileData";
import Calendar from "react-calendar";
import { useAppDispatch, useAppSelector } from "@/app/store/store";

import { Divider, Form, Input, Modal, message } from "antd";
import { fetchScheduleEvents } from "@/app/store/slice/scheduleEventsData";
import { useSession } from "next-auth/react";
import axios from "axios";
import { fetchUserData } from "@/app/store/slice/userSlice";

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
  ownerEmail: string;
  additionalInfo: string;
  createdAt: string;
}
interface Modall {
  id: string;
  name: string;
  time: string;
  date: string;
  timeZone: string;
  email: string;
  additionalInfo: string;
  createdAt: string;
}

interface SelectedDateTime {
  id: string | null;
  name: string | null;
  email: string | null;
  ownerEmail: string | null;
  additionalInfo: string | null;
  date: string | null;
  time: string | null;
  timeZone: string | null;
  createdAt: string | null;
}

const colors = [
  "bg-blue-600",
  "bg-pink-600",
  "bg-green-600",
  "bg-gray-600",
  "bg-yellow-600",
  "bg-orange-600",
  "bg-red-600",
  "bg-amber-600",
  "bg-black",
  "bg-purple-600",
];

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

export default function SidebarPage() {
  const { data: sessions } = useSession();
  const dispatch = useAppDispatch();
  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const [newDate, setNewDate] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const scheduleEvents = useAppSelector(
    (state) => state.fetchScheduleEvents.data
  );

  const userData = useAppSelector((state) => state.user.userData);

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("/api/getProfileCollection"); // Adjust the API route if necessary
  //       console.log(response.data);
  //     } catch (error: any) {
  //       console.log("djflkdjfdkf", error.message);
  //     }
  //   };

  //   fetchData();

  //   return () => {
  //   };
  // }, []);

  useEffect(() => {
    dispatch(fetchScheduleEvents());
  }, [dispatch]);

  useEffect(() => {
    if (scheduleEvents) {
      if (Array.isArray(scheduleEvents)) {
        const convertedEvents: Event[] = scheduleEvents.map(
          (event: SelectedDateTime) => {
            return {
              id: event.id || "",
              name: event.name || "",
              email: event.email || "",
              additionalInfo: event.additionalInfo || "",
              date: event.date || "",
              ownerEmail: event.ownerEmail || "",
              time: event.time || "",
              timeZone: event.timeZone || "",
              createdAt: event.createdAt || "",
            };
          }
        );
        setEvents(convertedEvents);
      } else {
        console.error("scheduleEvents is not an array:", scheduleEvents);
      }
    }
  }, [scheduleEvents]);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const handleImageClick = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
    setShowCalendar(false);
    const formattedDate = date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "2-digit",
      year: "numeric",
    });
    setNewDate(formattedDate);
  };

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
    filterEventsByCategory(selectedCategory);
  }, [selectedCategory, events, startDate, endDate]);

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
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        setFilteredEvents(
          events.filter((event) => {
            const eventDate = new Date(event.date);
            eventDate.setHours(0, 0, 0, 0);
            return eventDate.getTime() === today.getTime();
          })
        );
        break;
      case "dateRange":
        if (startDate && endDate) {
          setFilteredEvents(
            events.filter(
              (event) =>
                new Date(event.date) >= startDate &&
                new Date(event.date) <= endDate
            )
          );
        } else {
          setFilteredEvents(events);
        }
        break;
      default:
        setFilteredEvents(events);
        break;
    }
  };

  const uniqueDates = Array.from(
    new Set(filteredEvents.map((event) => event.date))
  );

  return (
    <>
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
                  {/* {userData ? (
                    <Link href={"/profile"}>
                      <Image
                        src={userData?.image || ""}
                        width={100}
                        height={100}
                        className="h-[37px] w-[37px] rounded-full "
                        alt=""
                      />
                    </Link>
                  ) : ( */}
                  <Link
                    href={"/profile"}
                    className="h-[37px] w-[37px] text-center flex items-center justify-center rounded-[32px] px-4 border-[1px] bg-gray-400 text-[14px] font-semibold "
                  >
                    M
                  </Link>
                  {/* )} */}
                  <div>
                    <Image src={downArrow} className="h-3 w-3" alt="Tab" />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="h-full w-[45%] py-4">
                <div className="mt-4">
                  <p className="font-semibold text-[25px] leading-7">
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
                          className={`h-[48px] w-[149px] flex border-b-[3px] ${
                            selectedCategory === "dateRange"
                              ? "border-blue-600"
                              : "cursor-pointer hover:border-blue-600"
                          } items-center flex justify-center`}
                          onClick={() => setSelectedCategory("dateRange")}
                        >
                          <p className="text-[15px] w-[120px] items-center gap-3 flex font-normal">
                            Date Range{" "}
                            <span
                              onClick={handleImageClick}
                              className="cursor-pointer bg-gra"
                            >
                              <Image
                                src={down}
                                className="h-[12px] w-[12px]"
                                alt=""
                              />
                            </span>
                          </p>
                        </div>
                        <div className="w-[300px] absolute left-[47%] top-[11%] bg-white shadow-2xl p-3">
                          {showCalendar && (
                            <Calendar
                              onChange={handleDateChange}
                              value={selectedDate}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex gap-2 bg- border-[1px] border-black px-3 py-2 rounded-full ">
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
                  {uniqueDates.map((date, index) => (
                    <div key={index}>
                      <div className="h-[58px] px-8 border-[1px] border-t-0 border-gray-300 flex items-center">
                        <p className="font-semibold text-[15px]">{date}</p>
                      </div>
                      {filteredEvents
                        .filter((event) => event.date === date)
                        .map((event, index) => (
                          <div
                            key={index}
                            className="h-[96px] border-[1px] border-gray-300 border-t-0 px-8"
                          >
                            <div className="flex items-center justify-between">
                              <div className="h-[48px] flex mt-6 gap-3 w-[310px]">
                                <>
                                  <div
                                    className={`h-[30px] text-white w-[30px] text-center flex items-center justify-center rounded-full border-[1px] ${
                                      colors[index % colors.length]
                                    } text-[14px] font-semibold`}
                                  >
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
                                    <p className="font-semibold text-[14px]">
                                      test
                                    </p>
                                  </div>
                                  <div>
                                    <p className="font-normal text-[14px]">
                                      Event type{" "}
                                      <span className="font-semibold">
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
                              <div
                                className=" h-[48px] flex items-center mt-6 w-[68px]"
                                onClick={() => {
                                  setSelectedEvent(event);
                                  setIsModalOpen(true);
                                }}
                              >
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

      <Modal
        title=""
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleOk}
      >
        <div className="container">
          <div className="row">
            <div className="col">
              <p>
                <span className="font-semibold" style={{ fontSize: "17px" }}>
                  Name :{" "}
                </span>{" "}
                <span style={{ fontSize: "17px" }} className="ml-[90px]">
                  {" "}
                  {selectedEvent?.name}
                </span>
              </p>
              <p>
                <span className="font-semibold" style={{ fontSize: "17px" }}>
                  Email :{" "}
                </span>{" "}
                <span style={{ fontSize: "17px" }} className="ml-24">
                  {selectedEvent?.email}
                </span>
              </p>

              <p>
                <span className="font-semibold" style={{ fontSize: "17px" }}>
                  Time :{" "}
                </span>{" "}
                <span style={{ fontSize: "17px" }} className="ml-[98px]">
                  {selectedEvent?.time}
                </span>
              </p>
              <p>
                <span className="font-semibold" style={{ fontSize: "17px" }}>
                  Date :{" "}
                </span>{" "}
                <span style={{ fontSize: "17px" }} className="ml-[102px]">
                  {" "}
                  {selectedEvent?.date}
                </span>
              </p>
              <p>
                <span className="font-semibold" style={{ fontSize: "17px" }}>
                  Time Zone :{" "}
                </span>{" "}
                <span style={{ fontSize: "17px" }} className="ml-[58px]">
                  {" "}
                  {selectedEvent?.timeZone}
                </span>
              </p>
              <p>
                <span className="font-semibold" style={{ fontSize: "17px" }}>
                  Additional Info :{" "}
                </span>{" "}
                <span style={{ fontSize: "17px" }} className="ml-[24px]">
                  {selectedEvent?.additionalInfo}
                </span>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
