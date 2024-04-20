"use client";
import Sidebar from "@/app/(components)/sidebar/Sidebar";
import React, { useEffect, useState } from "react";

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

export default function Analysis() {
  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const [total, setTotal] = useState<Event[]>([]);
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
}
