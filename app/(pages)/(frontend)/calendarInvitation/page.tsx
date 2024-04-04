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
          <div className="h-[550px] shadow-2xl border-[1px] border-grey w-[70%] flex justify-center">
            <div className="w-[600px] h-[300px] mt-10">
              <div>
                <div></div>
                <div className="text-center">
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
                <button className="h-[44px] border-[grey] text-center flex items-center justify-center rounded-[32px] px-6 border-[1px] text-[12px] font-bold ">
                  Open Invitation
                </button>
              </div>
              <div className="flex justify-center">
                <div className="w-[500px] h-[160px] mt-5 border-[1px] border-grey rounded-[8px]">
                  <div className="py-3 px-5">
                    <div>
                      <p className="text-[18px] font-bold">
                        30 Minutes Meeting
                      </p>
                    </div>
                    <div className="flex mt-2">
                      <div></div>
                      <div>
                        <p className="text-[17px] font-semibold text-gray-500">
                          Muhammad Talha
                        </p>
                      </div>
                    </div>
                    <div className="flex mt-2">
                      <div></div>
                      <div>
                        <p className="text-[17px] font-semibold text-gray-500">
                          11:00am - 11:30am, Wednesday, March 27, 2024
                        </p>
                      </div>
                    </div>
                    <div className="flex mt-2">
                      <div></div>
                      <div>
                        <p className="text-[17px] font-semibold text-gray-500">
                          Pakistan, Maldives Time
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
