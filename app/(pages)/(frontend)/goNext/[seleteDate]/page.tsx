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
import { SelectedDateTime } from "@/app/constants/types";

const page: React.FC = ({ params }: any) => {
  const decodedValue = decodeURIComponent(params.seleteDate);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const dispatch = useAppDispatch();
  const availabilityData = useAppSelector(
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

  const [selectedDateTime, setSelectedDateTime] = useState<SelectedDateTime>({
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

  return (
    <div>
      <div>
        <MenuHeader />
      </div>

      <div>
        <div className="flex justify-center items-center mt-14">
          <div className="h-[800px] mb-6 shadow-2xl border-[1px] border-grey w-[1060px] flex justify-center">
            <div className="w-[30%] border-[1px] px-7 py-7">
              <div>
                <div className="mt-6">
                  <p className="text-[14px] font-medium">
                    {userData?.fullName}
                  </p>
                </div>
                <div className="">
                  <p className="text-[22px] font-bold">30 Minutes Meeting</p>
                </div>
                <div className="mt-4 flex gap-2 items-center">
                  <div>
                    <Image src={clock} className="h-4 w-4" alt="clock" />
                  </div>
                  <div>
                    <p className="text-[14px] font-medium">30 Min</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-[70%] px-8 py-6 ">
              <div className="flex justify-end">
                <Image
                  src={sticker}
                  className="h-15 w-15 absolute"
                  style={{ right: "230px", top: "115px" }}
                  alt="tick"
                />
              </div>
              <div>
                <p className="font-bold text-[18px]">Select a Date & Time</p>
                <div className="flex">
                  <div>
                    <div className="w-[374px] h-[372px] ">
                      <NewCalendar
                        selectedDate={
                          selectedDateTime.date
                            ? new Date(selectedDateTime.date)
                            : undefined
                        }
                        onDateChange={handleDateChange}
                      />
                    </div>
                    <div className="py-2 mt-4">
                      <p className="font-bold text-[18px]">Time zone</p>
                    </div>
                    <div>
                      <TimezoneSelector
                        timeZones={timeZones}
                        onChange={handleTimeZoneChange}
                      />{" "}
                    </div>
                    <div className="mt-3">
                      <button className="h-[44px] gap-2 border-gray-400 text-center flex items-center justify-center rounded-[32px] px-4 border-[1px] text-[14px] font-bold ">
                        <Image src={tool} alt="Took" />
                        Troubleshoot
                      </button>
                    </div>
                  </div>
                  <div className="w-[275px] h-[640px] ml-4 ">
                    <div>
                      <p>Wednesday, March 27</p>
                    </div>
                    <div className="mt-8">
                      {timeSlots.map(({ time, label }) => (
                        <TimeSlot
                          key={label}
                          time={time}
                          onClick={() => handleTimeSlotClick(label)}
                        />
                      ))}
                      <div className="w-[220px] h-[65px] flex gap-2 mx-3 mt-10">
                        <div className="w-[110px] cursor-pointer h-[65px] bg-gray-600 rounded-[8px] flex justify-center items-center">
                          <p className="font-semibold text-[17px] text-white">
                            11:00am
                          </p>
                        </div>
                        {selectedDateTime.date &&
                        selectedDateTime.time &&
                        selectedDateTime.timeZone &&
                        selectedDateTime.decodedValue ? (
                          <Link
                            href={{
                              pathname: "/scheduleEvents",
                              query: {
                                date: selectedDateTime.date,
                                time: selectedDateTime.time,
                                timeZone: selectedDateTime.timeZone,
                                ownerEmail: selectedDateTime.decodedValue,
                                ownerName: userData?.fullName,
                              },
                            }}
                            className="w-[110px] cursor-pointer h-[65px] flex
                            justify-center rounded-[8px] items-center bg-[#0069FF] "
                          >
                            <p className="font-semibold text-white text-[17px]">
                              Next
                            </p>
                          </Link>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
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
