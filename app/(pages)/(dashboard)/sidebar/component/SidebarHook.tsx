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

const SidebarHook = () => {
  const { data: sessions } = useSession();
  const dispatch = useAppDispatch();
  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const [newDate, setNewDate] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState<EventSidebar[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [filteredEvents, setFilteredEvents] = useState<EventSidebar[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("upcoming");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventSidebar | null>(null);
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

  useEffect(() => {
    dispatch(fetchScheduleEvents());
  }, [dispatch]);

  useEffect(() => {
    if (scheduleEvents) {
      if (Array.isArray(scheduleEvents)) {
        const convertedEvents: EventSidebar[] = scheduleEvents.map(
          (event: SelectedDateTimeSideBar) => {
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
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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

  return {
    isSidebarOpen,
    toggleSidebar,
    selectedCategory,
    setSelectedCategory,
    handleImageClick,
    showCalendar,
    handleDateChange,
    selectedDate,
    uniqueDates,
    filteredEvents,
    setSelectedEvent,
    setIsModalOpen,
    handleCancel,
    handleOk,
    selectedEvent,
    isModalOpen,
  };
};

export default SidebarHook;
