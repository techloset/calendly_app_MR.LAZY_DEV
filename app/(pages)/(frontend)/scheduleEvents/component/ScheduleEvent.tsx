"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import sticker from "../../../../../public/vectors/sticker.png";
import clock from "../../../../../public/icons/clock.png";
import diary from "../../../../../public/icons/diary.png";
import global from "../../../../../public/icons/globe.png";
import backArrow from "../../../../../public/vectors/backArrow.png";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import emailjs from "emailjs-com";

interface EmailData {
  userEmail: string;
  otherData: any;
}

interface FormData {
  name: string;
  email: string;
  additionalInfo: string;
  date: string | null;
  time: string | null;
  timeZone: string | null;
}
interface propss {
  date: string | null;
  time: string | null;
  timeZone: string | null;
}

interface EmailMessage {
  from: string;
  to: string;
  subject: string;
  text: string;
}

export default function ScheduleEvent() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    additionalInfo: "",
    date: null,
    time: null,
    timeZone: null,
  });

  const searchParams = useSearchParams();
  const router = useRouter();

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post("/api/uploadData", formData);
  //     console.log("Form data uploaded successfully:", response.data);
  //   } catch (error) {
  //     console.error("Error handling form submission:", error);
  //   }
  // };

  const handleSubmit = async () => {
    try {
      const serviceId = "service_20ro8tt";
      const templateId = "template_szfvbdm";
      const userId = "G7wOKA2XXop3K0YlX";

      const templateParams = {
        from_name: formData.email,
        to_name: "Rana Saab The Great",
        message: formData.additionalInfo,
      };

      await emailjs.send(serviceId, templateId, templateParams, userId);

      console.log("Email sent successfully!");

      // Redirect or perform any action after successful email submission
      // router.push("/success");
    } catch (error) {
      console.error("Error sending email:", error);
      // Handle error gracefully
      // Optionally display error message to the user
    }
  };

  // const handleSendEmail = async (e: any) => {
  //   e.preventDefault();

  //   const response = await fetch("/api/sendEmail", {
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       userName: formData.name,
  //       email: formData.email,
  //       anything: formData.additionalInfo,
  //       date: formData.date,
  //       time: formData.time,
  //       timeZone: formData.timeZone,
  //     }),
  //   });
  //   console.log(await response.json());
  // };

  const handleBack = () => {
    router.back();
  };

  return (
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
                  <Image src={backArrow} className="h-6 w-6" alt="Back Arrow" />
                </div>
              </div>
              <div className="mt-6">
                <p className="text-[14px] font-medium">Muhammad Talha</p>
              </div>
              <div className="">
                <p className="text-[22px] font-bold">30 Minutes Meeting</p>
              </div>
              <div className="mt-4 flex gap-1 items-center">
                <div>
                  <Image src={clock} className="h-4 w-4" alt="" />
                </div>
                <div>
                  <p className="text-[14px] font-medium">30 Min</p>
                </div>
              </div>
              <div className="mt-4 flex gap-1 items-center">
                <div>
                  <Image src={diary} className="h-4 w-4" alt="" />
                </div>
                <div>
                  <p className="text-[14px] font-medium">
                    {formData.time ? formData.time : "undefine"},{" "}
                    {formData.date ? formData.date : "undefine"},{" "}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex gap-1 items-center">
                <div>
                  <Image src={global} className="h-4 w-4" alt="" />
                </div>
                <div>
                  <p className="text-[14px] font-medium">
                    {formData.timeZone ? formData.timeZone : "undefine"},{" "}
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

          <div className="w-[70%] flex justify-between">
            <div>
              {/* <div className="flex justify-end">
                <Image
                  src={sticker}
                  className="h-15 w-15 absolute"
                  style={{ right: "150px", top: "115px" }}
                  alt="tick"
                />
              </div> */}
              <div className=" px-8 py-6 ">
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
                <div className="mt-4 h-[50px] w-[430px]">
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
                <div
                  // className="mt-3 w-[150px]"
                  className="h-[44px] w-[10] bg-[#0069FF] text-white border-bg-[#0069FF] text-center flex items-center justify-center rounded-[32px] px-4 border-[1px] text-[14px] font-bold "
                  onClick={handleSubmit}
                >
                  {/* <Link
                    href={{
                      pathname: "/calendarInvitation",
                      query: {
                        date: formData.date,
                        time: formData.time,
                        timeZone: formData.timeZone,
                      },
                    }}
                  > */}
                  Schedule Event
                  {/* </Link> */}
                </div>
              </div>
            </div>
            <div>
              <Image
                src={sticker}
                className="h-15 w-15"
                style={{}}
                alt="tick"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
