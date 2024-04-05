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

const page: React.FC = () => {
  return (
    <div>
      <div>
        <MenuHeader />
      </div>
      <div>
        <div className="flex justify-center items-center mt-14">
          <div className="h-[700px] mb-6 shadow-2xl border-[1px] border-grey w-[1060px] flex justify-center">
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
                      <DatePickerComponent />
                    </div>
                    <div className="py-2 mt-4">
                      <p className="font-bold text-[18px]">Time zone</p>
                    </div>
                    <div>
                      <TimezoneSelector timeZones={timeZones} />
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
                      <TimeSlot time="9:00am" />
                      <TimeSlot time="9:30am" />
                      <TimeSlot time="10:00am" />
                      <TimeSlot time="10:30am" />
                      <TimeSlot time="11:00am" />
                      <TimeSlot time="11:30am" />
                      <TimeSlot time="12:00pm" />
                      <TimeSlot time="12:30pm" />
                      <TimeSlot time="1:00pm" />
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
      </div>
    </div>
  );
};

export default page;
