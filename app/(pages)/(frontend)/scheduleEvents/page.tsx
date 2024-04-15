// Import the necessary modules
"use client";
import MenuHeader from "@/app/(components)/menuHeader/MenuHeader";
import Image from "next/image";
import React, { useState } from "react";
import sticker from "../../../../public/vectors/sticker.png";
import backArrow from "../../../../public/vectors/backArrow.png";
import { useRouter } from "next/navigation";
import axios from "axios";
import nodemailer from "nodemailer";

interface FormData {
  name: string;
  email: string;
  additionalInfo: string;
}

interface EmailMessage {
  from: string;
  to: string;
  subject: string;
  text: string;
}

export default function Page() {
  // Initialize state variables and router
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    additionalInfo: "",
  });

  // const { title, desc } = router.query || {};

  // Function to handle changes in form fields
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const response = await fetch("/api/sendEmail", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        formData,
      }),
    });
    console.log(await response.json());
  };
  // const handleSubmit = async () => {
  //   try {
  //     await axios.post("/api/sendEmail", formData);
  //     // Handle success, e.g., show a success message or navigate to another page
  //     console.log("request send correctly");
  //   } catch (error) {
  //     console.error("Error handling form submission:", error);
  //     console.log("request not not send correctly");
  //     // Handle error, e.g., show an error message to the user
  //   }
  // };

  // const handleSubmit = async () => {
  // try {
  //   const response = await fetch("/api/uploadData", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(formData),
  //   });
  //   if (!response.ok) {
  //     throw new Error(`HTTP error! status: ${response.status}`);
  //   }
  //   console.log("Data submitted successfully");
  // } catch (error) {
  //   console.error("Error submitting data:", error);
  // }
  // };

  // Function to handle navigating back
  const handleBack = () => {
    router.back();
  };

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
                  <div
                    onClick={handleBack}
                    className="h-10 w-10 cursor-pointer border-[1px] flex items-center justify-center rounded-full"
                  >
                    <Image
                      src={backArrow}
                      className="h-6 w-6"
                      alt="Back Arrow"
                    />
                  </div>
                  <div>
                    {/* <h1>Selected Date Time:</h1>
                    <p>Date: {title}</p> */}
                    {/* <p>Time: {time}</p>
                    <p>Time Zone: {timeZone}</p> */}
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
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
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
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
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
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    className="w-[470px] border-[1px] rounded-[8px] py-2 px-3"
                    placeholder=""
                  />
                </div>
                <div className="mt-4 h-[50px] w-[470px]">
                  <p className="font-normal text-[14px]">
                    By proceeding, you confirm that you have read and agree to{" "}
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
                  <button
                    onClick={handleSubmit}
                    className="h-[44px] bg-[#0069FF] text-white border-bg-[#0069FF] text-center flex items-center justify-center rounded-[32px] px-4 border-[1px] text-[14px] font-bold "
                  >
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
