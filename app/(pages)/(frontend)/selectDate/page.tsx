"use client";
import DatePickerComponent from "@/app/(components)/datePickerComponent/DatePickerComponent";
import TimeSlot from "@/app/(components)/timeSlot/TimeSlot";
import TimezoneSelector from "@/app/(components)/timeZone/TimezoneSelector";
import Image from "next/image";
import Calendar from "react-calendar";
import clock from "../../../../public/vectors/clock.png";
import tool from "../../../../public/vectors/tool.png";
import MenuHeader from "@/app/(components)/menuHeader/MenuHeader";
import sticker from "../../../../public/vectors/sticker.png";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NewCalendar from "@/app/(components)/newCalendar/NewCalendar";

interface TimeZone {
  label: string;
  value: string;
}

const timeZones: TimeZone[] = [
  { label: "Pakistan Standard Time ", value: "Asia/Karachi" },
  { label: "India Standard Time ", value: "Asia/Kolkata" },
  { label: "Bangladesh Standard Time ", value: "Asia/Dhaka" },
  { label: "Nepal Time ", value: "Asia/Kathmandu" },
  { label: "Uzbekistan Time ", value: "Asia/Tashkent" },
  { label: "Turkmenistan Standard Time ", value: "Asia/Ashgabat" },
  { label: "Afghanistan Time ", value: "Asia/Kabul" },
  { label: "British Summer Time ", value: "Europe/London" },
  { label: "Eastern Standard Time ", value: "America/New_York" },
  { label: "Central Standard Time ", value: "America/Chicago" },
  { label: "Mountain Standard Time ", value: "America/Denver" },
  { label: "Pacific Standard Time ", value: "America/Los_Angeles" },
  { label: "Atlantic Standard Time ", value: "America/Halifax" },
  { label: "Alaska Standard Time ", value: "America/Anchorage" },
  { label: "Hawaii-Aleutian Standard Time ", value: "Pacific/Honolulu" },
  { label: "Newfoundland Standard Time ", value: "America/St_Johns" },
  { label: "Eastern Standard Time ", value: "America/Toronto" },
];

interface SelectedDateTime {
  date: string | null;
  time: string | null;
  timeZone: string | null;
}

const page: React.FC = () => {
  const router = useRouter();
  const [selectedDateTime, setSelectedDateTime] = useState<SelectedDateTime>({
    date: null,
    time: null,
    timeZone: null,
  });

  const handleDateChange = (date: string) => {
    const formattedDate = formatDate(date);
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

  const formatDate = (inputDate: any) => {
    // Split the input date into day, month, and year components
    const [day, month, year] = inputDate.split("/");

    // Create a new Date object with the provided year, month (zero-based), and day
    const date = new Date(year, month - 1, day);

    // Define an array of month names
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const dayName = dayNames[date.getDay()];
    const monthName = monthNames[date.getMonth()];

    // Format the date string
    const formattedDate = `${dayName}, ${day} ${monthName} ${year}`;

    return formattedDate;
  };

  // Example usage:
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
                  <p className="text-[14px] font-medium">Muhammad Talha</p>
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
                      {/* <Calendar
                        className=" rounded-md p-4 custom-calendar"
                        tileClassName={({ date, view }) =>
                          view === "month" && date.getDay() < 7
                            ? "bg-red-500 h-[44px] m-1 w-[44px] text-white rounded-full "
                            : ""
                        }
                      /> */}
                      <DatePickerComponent onDateChange={handleDateChange} />
                      {/* <NewCalendar
                        onDateChange={(date: any) => handleDateChange(date)}
                      /> */}
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
                      {/* <div className="w-[208px] h-[52px] ml-4 flex justify-center border-[1px] py-2 border-[#0069FF] rounded-[4px]">
                        <p className="font-bold text-[14px] text-[#0069FF]">
                          9:00am
                        </p>
                      </div> */}
                      <TimeSlot
                        time="9:00am"
                        onClick={() => handleTimeSlotClick("9:00am - 9:30am")}
                      />{" "}
                      <TimeSlot
                        time="9:30am"
                        onClick={() => handleTimeSlotClick("9:30am - 10:00am")}
                      />{" "}
                      <TimeSlot
                        time="10:00am"
                        onClick={() => handleTimeSlotClick("10:00am - 10:30am")}
                      />{" "}
                      <TimeSlot
                        time="10:30am"
                        onClick={() => handleTimeSlotClick("10:30am - 11:00am")}
                      />{" "}
                      <TimeSlot
                        time="11:00am"
                        onClick={() => handleTimeSlotClick("11:00am - 11:30am")}
                      />{" "}
                      <TimeSlot
                        time="11:30am"
                        onClick={() => handleTimeSlotClick("11:30am - 12:00pm")}
                      />{" "}
                      <TimeSlot
                        time="12:00pm"
                        onClick={() => handleTimeSlotClick("12:00pm - 12:30pm")}
                      />{" "}
                      <TimeSlot
                        time="12:30pm"
                        onClick={() => handleTimeSlotClick("12:30pm - 1:00pm")}
                      />{" "}
                      <TimeSlot
                        time="1:00m"
                        onClick={() => handleTimeSlotClick("1:00m - 1:30pm")}
                      />{" "}
                      <div className="w-[220px] h-[65px] flex gap-2 mx-3 mt-10">
                        <div className="w-[110px] cursor-pointer h-[65px] bg-gray-600 rounded-[8px] flex justify-center items-center">
                          <p className="font-semibold text-[17px] text-white">
                            11:00am
                          </p>
                        </div>
                        {selectedDateTime.date &&
                        selectedDateTime.time &&
                        selectedDateTime.timeZone ? (
                          <Link
                            href={{
                              pathname: "/scheduleEvents",
                              query: {
                                date: selectedDateTime.date,
                                time: selectedDateTime.time,
                                timeZone: selectedDateTime.timeZone,
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
                      {/* <div className="w-[208px] h-[52px] mt-3 ml-4 flex justify-center border-[1px] py-2 border-[#0069FF] rounded-[4px]">
                        <p className="font-bold text-[14px] text-[#0069FF]">
                          9:30am
                        </p>
                      </div>
                      <div className="w-[208px] h-[52px] mt-3 ml-4 flex justify-center border-[1px] py-2 border-[#0069FF] rounded-[4px]">
                        <p className="font-bold text-[14px] text-[#0069FF]">
                          10:00am
                        </p>
                      </div>
                      <div className="w-[208px] h-[52px] mt-3 ml-4 flex justify-center border-[1px] py-2 border-[#0069FF] rounded-[4px]">
                        <p className="font-bold text-[14px] text-[#0069FF]">
                          10:30am
                        </p>
                      </div>
                      <div className="w-[208px] h-[52px] mt-3 ml-4 flex justify-center border-[1px] py-2 border-[#0069FF] rounded-[4px]">
                        <p className="font-bold text-[14px] text-[#0069FF]">
                          11:00am
                        </p>
                      </div>
                      <div className="w-[208px] h-[52px] mt-3 ml-4 flex justify-center border-[1px] py-2 border-[#0069FF] rounded-[4px]">
                        <p className="font-bold text-[14px] text-[#0069FF]">
                          11:30am
                        </p>
                      </div>
                      <div className="w-[208px] h-[52px] mt-3 ml-4 flex justify-center border-[1px] py-2 border-[#0069FF] rounded-[4px]">
                        <p className="font-bold text-[14px] text-[#0069FF]">
                          12:00pm
                        </p>
                      </div>
                      <div className="w-[208px] h-[52px] mt-3 ml-4 flex justify-center border-[1px] py-2 border-[#0069FF] rounded-[4px]">
                        <p className="font-bold text-[14px] text-[#0069FF]">
                          12:30pm
                        </p>
                      </div>
                      <div className="w-[208px] h-[52px] mt-3 ml-4 flex justify-center border-[1px] py-2 border-[#0069FF] rounded-[4px]">
                        <p className="font-bold text-[14px] text-[#0069FF]">
                          1:00pm
                        </p>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="w-[230px] h-[65px] bg-slate-500 mx-3 mt-10">
          dkfjkdjf
        </div> */}
      </div>
    </div>
  );
};

export default page;
