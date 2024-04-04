import React from "react";

export default function page() {
  return (
    <div>
      <div className="bg-white shadow-lg h-[60px] flex justify-center">
        <div className=" w-[60%] flex justify-between items-center">
          <div></div>
          <div className="flex gap-4">
            <div className="flex gap-3 items-center">
              Menu{" "}
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 10l7 7 7-7"
                  />
                </svg>
              </span>
            </div>
            <div>
              <button className="h-[44px] border-[grey] text-center flex items-center justify-center rounded-[32px] px-6 border-[1px] text-[12px] font-bold ">
                Copy link
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-center items-center mt-14">
          <div className="h-[700px] mb-6 shadow-2xl border-[1px] border-grey w-[80%] flex justify-center">
            <div className="w-[30%] border-[1px] px-7 py-7">
              <div>
                <div>
                  <div className="bg-black h-10 w-10 rounded-full"></div>
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
                  <p className="font-medium text-[15px] text-blue-600">
                    Cookie settings
                  </p>
                  <p className="font-medium text-[15px] ">Report abuse</p>
                </div>
              </div>
            </div>

            <div className="w-[70%] px-8 py-6 ">
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
                    <span className="font-bold text-blue-600">
                      Calendly's Term of Use{" "}
                    </span>{" "}
                    and{" "}
                    <span className="font-bold text-blue-600">
                      Privacy Notice.
                    </span>
                  </p>
                </div>
                <div className="mt-3">
                  <button className="h-[44px] bg-blue-600 text-white border-bg-blue-600 text-center flex items-center justify-center rounded-[32px] px-4 border-[1px] text-[14px] font-bold ">
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
