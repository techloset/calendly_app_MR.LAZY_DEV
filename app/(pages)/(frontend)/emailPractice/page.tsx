import React from "react";

export default function page() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-[80%] h-[200px] bg-slate-500">
        <div className="px-10 py-6">
          <div>
            <p className="font-bold text-lg">
              30 Minute Meeting with Muhammad Talha
            </p>
          </div>
          <div>
            <p className="font-medium text-[15px] text-blue-700">
              View on Google Calendar
            </p>
          </div>
          <div className="mt-4">
            <p className="font-medium text-[15px] text-gray-400">
              When{" "}
              <span className="text-black ml-8">
                Wed Mar, 2023 11am - 11:30am (GMT + 5)
              </span>
            </p>
          </div>
          <div className="mt-3">
            <p className="font-medium text-[15px] text-gray-400">
              Who <span className="ml-11">Muhammad Talha*</span>
            </p>
          </div>
        </div>
      </div>
      <div className="pt-10 pl-40">
        <div>
          <div>
            <p className="mb-0">
              Hi <span className="font-bold">test,</span>
            </p>
            <p>
              Your 30 Minutes Meeting with Muhammd Talha as 11:30am <br />
              (Pakistan, Maldives Time) on Wednesday, March 27, 2024 is <br />
              scheduled.
            </p>
          </div>
          <div className="mt-4">
            <p className="font-bold">Your Answers:</p>
            <p className="font-semibold mt-2">
              Please share anything that will help prepare for our meeting.
            </p>
            <p className="font-semibold">test</p>
          </div>
          <div className="mt-4">
            <p className="font-bold">
              This event should automatically show up on you calendar. If
              needed, you can still <br />
              add it manually:
            </p>
          </div>

          <div className="mt-8 flex items-center justify-center">
            <div className="w-72 h-20 bg-blue-600 flex justify-center items-center text-center">
              <p className="text-lg font-semibold text-white">
                Add to Google Calendar
              </p>
            </div>
          </div>
          <div className="mt-4 flex justify-center items-center">
            <p className="font-medium underline text-blue-700">
              Calendly will automatically add scheduled events if you{" "}
              <span className="text-blue-700 underline">
                connect your calendar
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
