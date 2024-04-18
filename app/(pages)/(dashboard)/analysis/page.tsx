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
import { PieChart, Pie, Sector } from "recharts";
import { BarChart, Bar, Cell, ResponsiveContainer } from "recharts";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { fetchScheduleEvents } from "@/app/store/slice/scheduleEventsData";

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

interface SelectedDateTime {
  id: string | null;
  name: string | null;
  email: string | null;
  additionInfo: string | null;
  date: string | null;
  time: string | null;
  timeZone: string | null;
  createdAt: string | null;
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
  const [total, setTotal] = useState<Event[]>([]); // Change the type to Event[]
  const [totall, setTotall] = useState<number>(0);
  const [upcoming, setUpcoming] = useState<number>(0);
  const [past, setPast] = useState<number>(0);

  const dispatch = useAppDispatch();

  const [events, setEvents] = useState<Event[]>([]);
  const scheduleEvents = useAppSelector(
    (state) => state.fetchScheduleEvents.data
  );

  useEffect(() => {
    dispatch(fetchScheduleEvents());
  }, [dispatch]);

  useEffect(() => {
    // Convert SelectedDateTime to Event if necessary
    if (scheduleEvents) {
      if (Array.isArray(scheduleEvents)) {
        const convertedEvents: Event[] = scheduleEvents.map(
          (event: SelectedDateTime) => {
            return {
              id: event.id || "",
              name: event.name || "",
              email: event.email || "",
              additionInfo: event.additionInfo || "",
              date: event.date || "",
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

  useEffect(() => {
    setTotall(events.length);
    setUpcoming(
      events.filter((event) => new Date(event.date) > new Date()).length
    );
    setPast(events.filter((event) => new Date(event.date) < new Date()).length);
  }, [events]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const data = [
    { name: "Monday", value: 200 },
    { name: "Tuesday", value: 400 },
    { name: "Wednesday", value: 100 },
    { name: "Thursday", value: 700 },
    { name: "Friday", value: 400 },
    { name: "Saturday", value: 500 },
    { name: "Sunday", value: 300 },
  ];

  return (
    <div className="flex">
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      <div
        className={`flex flex-col flex-1 px-5 ${
          isSidebarOpen ? "lg:ml-[17%] md:ml-[25%] ml:[35%]" : "ml-[7%]"
        }`}
      >
        <div>
          <div className="my-8">
            <p className="font-bold text-[25px] ml-28 leading-7">Analysis</p>
          </div>
          <div className="flex gap-4 justify-center">
            <div className="h-[200px] py-3 px-3 pt-4 w-[20%] shadow-2xl">
              <div>
                <p className="text-[20px] font-bold">Total</p>
              </div>
              <div className="my-3 mx-3">
                <p className="text-[34px] font-extrabold">{totall}</p>
              </div>
              <div className="text-gray-400">
                <p>+0 (no change)</p>
              </div>
              <div className="my-2">
                <p className="text-gray-400">VS prior 30 days</p>
              </div>
            </div>
            <div className="h-[200px] py-3 px-3 pt-4 w-[20%] shadow-2xl">
              <div>
                <p className="text-[20px] font-bold">Upcoming</p>
              </div>
              <div className="my-3 mx-3">
                <p className="text-[34px] font-extrabold">{upcoming}</p>
              </div>
              <div className="text-gray-400">
                <p>+0 (no change)</p>
              </div>
              <div className="my-2">
                <p className="text-gray-400">VS prior 30 days</p>
              </div>
            </div>
            <div className="h-[200px] py-3 px-3 pt-4 w-[20%] shadow-2xl">
              <div>
                <p className="text-[20px] font-bold">Pending</p>
              </div>
              <div className="my-3 mx-3">
                <p className="text-[34px] font-extrabold">0</p>
              </div>
              <div className="text-gray-400">
                <p>+0 (no change)</p>
              </div>
              <div className="my-2">
                <p className="text-gray-400">VS prior 30 days</p>
              </div>
            </div>
            <div className="h-[200px] py-3 px-3 pt-4 w-[20%] shadow-2xl">
              <div>
                <p className="text-[20px] font-bold">Past</p>
              </div>
              <div className="my-3 mx-3">
                <p className="text-[34px] font-extrabold">{past}</p>
              </div>
              <div className="text-gray-400">
                <p>+0 (no change)</p>
              </div>
              <div className="my-2">
                <p className="text-gray-400">VS prior 30 days</p>
              </div>
            </div>
          </div>

          <div className="mt-16 ml-10">
            <LineChart
              width={1130}
              height={310}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
