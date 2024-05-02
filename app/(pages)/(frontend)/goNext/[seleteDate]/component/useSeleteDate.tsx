"use client";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { fetchAvailabilityData } from "@/app/store/slice/availabilityData";
import { useSession } from "next-auth/react";
import {
  dayNames,
  monthNames,
} from "@/app/(components)/profileData/ProfileData";
import { fetchUserData } from "@/app/store/slice/userSlice";
import { AvailabilityData, SelectedDateTimeFirst } from "@/app/constants/types";

const useSeleteDate = ({ params }: any) => {
  const decodedValue = decodeURIComponent(params.seleteDate);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const dispatch = useAppDispatch();

  const availabilityData: AvailabilityData | null = useAppSelector(
    (state) => state.fetchAvailabilityData.data
  );

  useEffect(() => {
    dispatch(fetchAvailabilityData());
  }, [dispatch]);

  console.log("avaialbiiliill", availabilityData);

  const userData = useAppSelector((state) => state.user.userData);
  const sessionss = useSession();

  const [selectedDateTime, setSelectedDateTime] =
    useState<SelectedDateTimeFirst>({
      date: null,
      time: null,
      timeZone: null,
      decodedValue: decodedValue,
    });

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

  return {
    userData,
    selectedDateTime,
    handleDateChange,
    handleTimeZoneChange,
    handleTimeSlotClick,
    sessionss,
  };
};

export default useSeleteDate;
``;
