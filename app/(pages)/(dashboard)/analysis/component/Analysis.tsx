"use client";
import Sidebar from "@/app/(components)/sidebar/Sidebar";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { fetchScheduleEvents } from "@/app/store/slice/scheduleEventsData";
import { data } from "@/app/(components)/profileData/ProfileData";
import { EventAnalysis, SelectedDateTimeAnalysis } from "@/app/constants/types";
import AnalysisBox from "@/app/(components)/analysisBox/AnalysisBox";
import GraphCart from "@/app/(components)/graphCart/graphCart";

export default function Analysis() {
  const [totall, setTotall] = useState<number>(0);
  const [upcoming, setUpcoming] = useState<number>(0);
  const [past, setPast] = useState<number>(0);

  const dispatch = useAppDispatch();

  const [events, setEvents] = useState<EventAnalysis[]>([]);
  const scheduleEvents = useAppSelector(
    (state) => state.fetchScheduleEvents.data
  );

  useEffect(() => {
    dispatch(fetchScheduleEvents());
  }, [dispatch]);

  useEffect(() => {
    if (scheduleEvents) {
      if (Array.isArray(scheduleEvents)) {
        const convertedEvents: EventAnalysis[] = scheduleEvents.map(
          (event: SelectedDateTimeAnalysis) => {
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

  const pending = 0;

  return (
    <>
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
              <AnalysisBox boxName="Total" total={totall} />
              <AnalysisBox boxName="Upcoming" total={upcoming} />
              <AnalysisBox boxName="pending" total={pending} />
              <AnalysisBox boxName="Past" total={past} />
            </div>

            <div className="mt-16 ml-10">
              <GraphCart />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
