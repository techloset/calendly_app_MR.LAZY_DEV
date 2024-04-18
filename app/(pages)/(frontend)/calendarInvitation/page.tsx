"use client";
import MenuHeader from "@/app/(components)/menuHeader/MenuHeader";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import tick from "../../../../public/vectors/check.png";
import tab from "../../../../public/vectors/newTab.png";
import person from "../../../../public/vectors/person.png";
import calendar from "../../../../public/vectors/diary.png";
import world from "../../../../public/vectors/globe.png";
import sticker from "../../../../public/vectors/sticker.png";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

interface FormData {
  date: string | null;
  time: string | null;
  timeZone: string | null;
}

export default function page() {
  const searchParams = useSearchParams();

  const session = useSession();

  const [formData, setFormData] = useState<FormData>({
    date: null,
    time: null,
    timeZone: null,
  });

  useEffect(() => {
    if (searchParams) {
      const date = searchParams.get("date");
      const time = searchParams.get("time");
      const timeZone = searchParams.get("timeZone");

      setFormData((prev) => ({
        ...prev,
        date,
        time,
        timeZone,
      }));
    }
  }, [searchParams]);

  return (
    <div>
      <div>
        <MenuHeader />
      </div>
      <div>
        <div className="flex justify-center items-center mt-14">
          <div className="h-[550px] shadow-2xl border-[1px] border-grey w-[70%] flex justify-center">
            <div></div>
            <div className="w-[600px] h-[300px] mt-10">
              <div className="flex justify-end">
                <Image
                  src={sticker}
                  className="h-15 w-15 absolute"
                  style={{ right: "230px", top: "115px" }}
                  alt="tick"
                />
              </div>
              <div>
                <div className="text-center flex items-center justify-center gap-2">
                  <div className="">
                    <Image src={tick} className="h-5 w-5" alt="tick" />
                  </div>
                  <p className="text-[19px] font-semibold ">
                    You are scheduled
                  </p>
                </div>
              </div>
              <div>
                <div className="text-center mt-3">
                  <p className=" ">
                    A calendar invitation has been send to your email address.
                  </p>
                </div>
              </div>
              <div className="flex justify-center mt-4">
                <button className="h-[37px] border-[grey] text-center flex items-center justify-center rounded-[32px] px-4 border-[1px] text-[12px] font-bold ">
                  Open Invitation
                  <Image src={tab} className="h-6 w-6" alt="Tab" />
                </button>
              </div>
              <div className="flex justify-center">
                <div className="w-[480px] h-[160px] mt-5 border-[1px] border-grey rounded-[8px]">
                  <div className="py-3 px-5">
                    <div>
                      <p className="text-[18px] font-bold">
                        30 Minutes Meeting
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <div>
                        <Image src={person} className="w-4 h-4" alt="Person" />
                      </div>
                      <div>
                        <p className="text-[17px] font-semibold text-gray-500">
                          {/* Muhammad Talha */}
                          {session.data?.user?.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <div>
                        <Image
                          src={calendar}
                          className="w-4 h-4"
                          alt="Person"
                        />
                      </div>
                      <div>
                        <p className="text-[17px] font-semibold text-gray-500">
                          {formData.time ? formData.time : "undefine"},{" "}
                          {formData.date ? formData.date : "undefine"},
                          {/* 11:00am - 11:30am, Wednesday, March 27, 2024 */}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <div>
                        <Image src={world} className="w-4 h-4" alt="Person" />
                      </div>
                      <div>
                        <p className="text-[17px] font-semibold text-gray-500">
                          {/* Pakistan, Maldives Time */}
                          {formData.timeZone ? formData.timeZone : "undefine"},
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex mt-44 -ml-52 items-end">
                <p className="text-cyan-600">Cooking settings</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
