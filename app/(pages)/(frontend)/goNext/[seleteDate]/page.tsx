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
import {
  AvailabilityData,
  SelectedDateTime,
  SelectedDateTimeFirst,
} from "@/app/constants/types";
import { BeatLoader } from "react-spinners";
import useSeleteDate from "./component/useSeleteDate";
import TimezoneDropdown from "@/app/(components)/timeZone/TimezoneSelector";
import moment from "moment-timezone";

const page = ({ params }: any) => {
  const dispatch = useAppDispatch();

  const availabilityData = useAppSelector(
    (state) => state.fetchAvailabilityData.data
  );

  const [selectedTimezone, setSelectedTimezone] = useState("");

  const handleSelectTimezone = (timezone: any) => {
    setSelectedTimezone(timezone);
  };

  const timezones = moment.tz.names();

  useEffect(() => {
    dispatch(fetchAvailabilityData());
  }, [dispatch]);

  const {
    handleDateChange,
    handleTimeSlotClick,
    handleTimeZoneChange,
    selectedDateTime,
    userData,
    sessionss,
  } = useSeleteDate({ params });

  let timeSlots = [
    { time: "9:00am", label: "9:00am - 9:30am" },
    { time: "9:30am", label: "9:30am - 10:00am" },
    { time: "10:00am", label: "10:00am - 10:30am" },
    { time: "10:30am", label: "10:30am - 11:00am" },
    { time: "11:00am", label: "11:00am - 11:30am" },
    { time: "11:30am", label: "11:30am - 12:00pm" },
    { time: "12:00pm", label: "12:00pm - 12:30pm" },
    { time: "12:30pm", label: "12:30pm - 1:00pm" },
    { time: "1:00pm", label: "1:00pm - 1:30pm" },
    { time: "1:30pm", label: "1:30pm - 2:00pm" },
    { time: "2:00pm", label: "2:00pm - 2:30pm" },
    { time: "2:30pm", label: "2:30pm - 3:00pm" },
    { time: "3:00pm", label: "3:00pm - 3:30pm" },
    { time: "3:30pm", label: "3:30pm - 4:00pm" },
    { time: "4:00pm", label: "4:00pm - 4:30pm" },
  ];

  let selectedHour1 = "12:00 pm";
  let selectedHour2 = "1:00 pm";

  // Convert selected hours to 24-hour format for easier comparison
  const selectedTime1 = convertTo24Hour(selectedHour1);
  const selectedTime2 = convertTo24Hour(selectedHour2);

  function convertTo24Hour(time: any) {
    const [hour, minute, period] = time.match(/\d+|\D+/g);
    let hourInt = parseInt(hour);
    if (period === "pm" && hourInt !== 12) {
      hourInt += 12;
    } else if (period === "am" && hourInt === 12) {
      hourInt = 0;
    }
    return `${hourInt}:${minute}`;
  }

  // Filter time slots between selected hours
  const filteredTimeSlots = timeSlots.filter((slot) => {
    const slotTime = convertTo24Hour(slot.time);
    return slotTime >= selectedTime1 && slotTime <= selectedTime2;
  });

  console.log(filteredTimeSlots);

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
                    {userData ? userData?.fullName : sessionss.data?.user.name}
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
                    <div className="w-[374px] h-[372px]">
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
                      {/* <TimezoneSelector
                        timeZones={timeZones}
                        onChange={handleTimeZoneChange}
                      />{" "} */}

                      <TimezoneDropdown onChange={handleTimeZoneChange} />
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
                    <div className="mt-8 h-[570px] pb-4 overflow-auto scrollbar-hide">
                      {filteredTimeSlots.map(({ time, label }) => (
                        <TimeSlot
                          key={label}
                          time={time}
                          onClick={() => handleTimeSlotClick(label)}
                        />
                      ))}
                    </div>
                    <div className="w-[220px] h-[65px] flex gap-2 mx-3 mt-6">
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
                              ownerName: userData
                                ? userData?.fullName
                                : sessionss.data?.user.name,
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
  );
};

export default page;
