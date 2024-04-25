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
import {
  DropdownData,
  colors,
} from "@/app/(components)/profileData/ProfileData";
import Calendar from "react-calendar";
import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { Modal } from "antd";
import { fetchScheduleEvents } from "@/app/store/slice/scheduleEventsData";
import { useSession } from "next-auth/react";
import { fetchUserData } from "@/app/store/slice/userSlice";
import { EventSidebar, SelectedDateTimeSideBar } from "@/app/constants/types";
import { Dropdown } from "@/app/(components)/dropdown/DropDown";
import Modall from "@/app/(components)/modal/Modal";
import SidebarTopMenu from "@/app/(components)/sidebarTopMenu/SidebarTopMenu";
import SidebarSecondMenu from "@/app/(components)/sidebarSecondMenu/SidebarSecondMenu";
import SidebarHook from "./SidebarHook";

export default function SidebarPage() {
  const {
    filteredEvents,
    handleCancel,
    handleDateChange,
    handleImageClick,
    handleOk,
    isSidebarOpen,
    selectedCategory,
    selectedDate,
    selectedEvent,
    setIsModalOpen,
    setSelectedCategory,
    setSelectedEvent,
    showCalendar,
    toggleSidebar,
    uniqueDates,
    isModalOpen,
  } = SidebarHook();
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
            <SidebarTopMenu />
            <div>
              <SidebarSecondMenu />

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
      <Modall
        handleCancel={handleCancel}
        handleOk={handleOk}
        selectedEventAdditionalInfo={selectedEvent?.additionalInfo ?? ""}
        selectedEventDate={selectedEvent?.date ?? ""}
        selectedEventName={selectedEvent?.name ?? ""}
        selectedEventEmail={selectedEvent?.email ?? ""}
        selectedEventTime={selectedEvent?.time ?? ""}
        selectedEventTimeZone={selectedEvent?.timeZone ?? ""}
        isModalOpen={isModalOpen}
      />
    </>
  );
}
