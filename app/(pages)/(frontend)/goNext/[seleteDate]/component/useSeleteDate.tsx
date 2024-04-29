"use client";
import TimeSlot from "@/app/(components)/timeSlot/TimeSlot";
import TimezoneSelector from "@/app/(components)/timeZone/TimezoneSelector";
import Image from "next/image";
import clock from "../../../../../public/vectors/clock.png";
import tool from "../../../../../public/vectors/tool.png";
import sticker from "../../../../../public/vectors/sticker.png";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NewCalendar from "@/app/(components)/newCalendar/NewCalendar";
import { format } from "date-fns";
import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { fetchAvailabilityData } from "@/app/store/slice/availabilityData";
import { useSession } from "next-auth/react";
import MenuHeader from "@/app/(components)/menuHeader/MenuHeader";
import {
  dayNames,
  monthNames,
  timeSlots,
  timeZones,
} from "@/app/(components)/profileData/ProfileData";
import { fetchUserData } from "@/app/store/slice/userSlice";
import { SelectedDateTime, SelectedDateTimeFirst } from "@/app/constants/types";
import { BeatLoader } from "react-spinners";

const useSeleteDate = ({ params }: any) => {
  const decodedValue = decodeURIComponent(params.seleteDate);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const dispatch = useAppDispatch();
  const availabilityData: any = useAppSelector(
    (state) => state.fetchAvailabilityData.data
  );
  const userData = useAppSelector((state) => state.user.userData);

  if (availabilityData !== null) {
    const reversedAvailabilityData = [...availabilityData].reverse();
    const availabilityObject = reversedAvailabilityData[0];

    if (availabilityObject !== undefined) {
      const { selectedHour1, selectedHour2 } = availabilityObject;
      console.log("selectedHour1:", selectedHour1);
      console.log("selectedHour2:", selectedHour2);
    } else {
      console.error("availabilityData array is empty.");
    }
  } else {
    console.error("availabilityData is null.");
  }
  useEffect(() => {
    dispatch(fetchAvailabilityData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  const router = useRouter();

  useEffect(() => {
    dispatch(fetchAvailabilityData());
  }, [dispatch]);

  const [selectedDateTime, setSelectedDateTime] =
    useState<SelectedDateTimeFirst>({
      date: null,
      time: null,
      timeZone: null,
      decodedValue: decodedValue,
    });

  useEffect(() => {
    dispatch(fetchAvailabilityData());
  }, [dispatch]);

  const handleDateChange = (date: Date) => {
    const formattedDate = format(date, "EEEE, d MMMM yyyy");
    setSelectedDate(date);
    setSelectedDateTime((prev) => ({ ...prev, date: formattedDate }));
  };

  const handleTimeSlotClick = (time: string) => {
    setSelectedDateTime((prev) => ({ ...prev, time }));
  };

  const handleTimeZoneChange = (value: string | null) => {
    setSelectedDateTime((prev) => ({ ...prev, timeZone: value }));
  };

  useEffect(() => {
    console.log("Selected Date Time:", selectedDateTime);
  }, [selectedDateTime]);

  console.log("select", selectedDate);

  const formatDate = (inputDate: any) => {
    const [day, month, year] = inputDate.split("/");

    const date = new Date(year, month - 1, day);

    const dayName = dayNames[date.getDay()];
    const monthName = monthNames[date.getMonth()];

    const formattedDate = `${dayName}, ${day} ${monthName} ${year}`;

    return formattedDate;
  };

  const formattedDate = formatDate("06/04/2024");

  return {
    userData,
    selectedDateTime,
    handleDateChange,
    handleTimeZoneChange,
    handleTimeSlotClick,
  };
};

export default useSeleteDate;
