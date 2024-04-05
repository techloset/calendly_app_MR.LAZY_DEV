import MenuHeader from "@/app/(components)/menuHeader/MenuHeader";
import Image from "next/image";
import React from "react";
import sticker from "../../../../public/vectors/sticker.png";
import backArrow from "../../../../public/vectors/backArrow.png";

export default function page() {
  return (
    <div>
      <div>
        <MenuHeader />
      </div>
      <div>
        <div className="flex justify-center items-center mt-14">
          <div className="h-[700px] mb-6 shadow-2xl border-[1px] border-grey w-[80%] flex justify-center">
            <div className="w-[30%] border-[1px] px-7 py-7">
              <div>
                <div>
                  <div className="h-10 w-10 border-[1px] flex items-center justify-center rounded-full">
                    <Image
                      src={backArrow}
                      className="h-6 w-6"
                      alt="Back Arrow"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <p className="text-[14px] font-medium">Muhammad Talha</p>
                </div>
                <div className="">
                  <p className="text-[22px] font-bold">30 Minutes Meeting</p>
                </div>
                <div className="mt-4 flex gap-3 items-center">
                  <div></div>
                  <div>
                    <p className="text-[14px] font-medium">30 Min</p>
                  </div>
                </div>
                <div className="mt-4 flex gap-3 items-center">
                  <div></div>
                  <div>
                    <p className="text-[14px] font-medium">
                      11:00am - 11:30am, Wednesday, March 27, 2024
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex gap-3 items-center">
                  <div></div>
                  <div>
                    <p className="text-[14px] font-medium">
                      Pakistan, Maldives Time
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-[380px]">
                <div className="flex justify-between">
                  <p className="font-medium text-[15px] text-[#0069FF]">
                    Cookie settings
                  </p>
                  <p className="font-medium text-[15px] ">Report abuse</p>
                </div>
              </div>
            </div>

            <div className="w-[70%] px-8 py-6 ">
              <div className="flex justify-end">
                <Image
                  src={sticker}
                  className="h-15 w-15 absolute"
                  style={{ right: "150px", top: "115px" }}
                  alt="tick"
                />
              </div>
              <div>
                <div>
                  <p className="font-bold text-[18px]">Enter Details</p>
                </div>
                <div className="mt-3">
                  <p className="font-semibold text-[15px]">Name *</p>
                </div>
                <div className="mt-1">
                  <input
                    type="text"
                    className="h-[50px] w-[470px] border-[1px] rounded-[8px] px-3"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="mt-2">
                  <p className="font-semibold text-[15px]">Email *</p>
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    className="h-[50px] w-[470px] border-[1px] rounded-[8px] px-3"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="mt-4 h-[50px] w-[420px]">
                  <p className="font-semibold text-[15px]">
                    Please share anything that will help prepare for our
                    meeting.
                  </p>
                </div>
                <div className="mt-3">
                  <textarea
                    rows={3}
                    cols={6}
                    className="w-[470px] border-[1px] rounded-[8px] px-3"
                    placeholder=""
                  />
                </div>
                <div className="mt-4 h-[50px] w-[470px]">
                  <p className="font-normal text-[14px]">
                    By proceeding, you comfirm that you have read and agree to{" "}
                    <span className="font-bold text-[#0069FF]">
                      Calendly's Term of Use{" "}
                    </span>{" "}
                    and{" "}
                    <span className="font-bold text-[#0069FF]">
                      Privacy Notice.
                    </span>
                  </p>
                </div>
                <div className="mt-3">
                  <button className="h-[44px] bg-[#0069FF] text-white border-bg-[#0069FF] text-center flex items-center justify-center rounded-[32px] px-4 border-[1px] text-[14px] font-bold ">
                    Schedule Event
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
