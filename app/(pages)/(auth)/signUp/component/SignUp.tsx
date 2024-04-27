"use client";
import React, { useState } from "react";
import Link from "next/link";
import eye from "../../../../../public/images/eye.png";
import open from "../../../../../public/icons/open.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import AuthInputField from "@/app/(components)/authInputField/AuthInputField";

export default function SignUp() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [selectedHour1, setSelectedHour1] = useState<string | null>("Empty");
  const [selectedHour2, setSelectedHour2] = useState<string | null>("Empty");
  const [selectedDays, setSelectedDays] = useState<string[]>(["Empty"]);
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    userName: "",
    password: "",
    image:
      "https://res.cloudinary.com/dqwzzzyby/image/upload/v1714204006/cloudinary_images/ed6oycbgtth4u1vibsbk.png",
    welcomeMessage: "Empty",
    language: "Empty",
    timeFormat: "Empty",
    dateFormat: "Empty",
    country: "Empty",
    timeZone: "Empty",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const click = () => {
    setShow(!show);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.post("/api/register", formData);
      router.push("/login");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[440px] h-[550px] border-[1px] border-[#DADADA] rounded-[6px] p-[24px]">
      <div>
        <p className="font-bold text-[14px] leading-6">
          Enter your email to get started.
        </p>
      </div>
      <div className="mt-2">
        <AuthInputField
          type="text"
          placeholder="test@gamil.com"
          value={formData.email}
          name="email"
          onChange={handleChange}
        />
      </div>
      <div>
        <p className="font-bold text-[14px] leading-6 mt-1">
          Enter your full name.
        </p>
      </div>
      <div className="mt-2">
        <AuthInputField
          type="text"
          placeholder="John Doe"
          value={formData.fullName}
          name="fullName"
          onChange={handleChange}
        />
      </div>
      <div>
        <p className="font-bold text-[14px] leading-6 mt-1">
          Enter your username
        </p>
      </div>
      <div className="mt-2">
        <AuthInputField
          type="text"
          placeholder="John Doe"
          value={formData.userName}
          name="userName"
          onChange={handleChange}
        />
      </div>
      <div>
        <p className="font-bold text-[14px] leading-6 mt-1">
          Choose a password with at least 8 characters.
        </p>
      </div>
      <div className="relative mt-2">
        <AuthInputField
          type={show ? "text" : "password"}
          placeholder="password"
          value={formData.password}
          name="password"
          onChange={handleChange}
        />
        <span
          onClick={click}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 cursor-pointer"
        >
          {show ? (
            <Image className="h-4 w-4" src={open} alt="" />
          ) : (
            <Image src={eye} alt="" />
          )}
        </span>
      </div>
      <div className="h-[6px] w-[374px] rounded-[8px] mt-2 bg-[#F2F2F2]"></div>
      <div className="mt-2 mx-6">
        <p className="text-[#C84545] md:text-start text-center text-[12px] font-normal leading-5">
          Use a few words, avoid common phrases <br /> No need for symbols,
          digits, or uppercase letters
        </p>
      </div>
      <div className="mt-3 mr-3">
        <p className="text-[#1A1A1A] text-[12px] text-center font-normal leading-5">
          By creating a Calendly account, you agree to Calendly's Terms and
          Privacy Policy
        </p>
      </div>
      <div className="flex items-center justify-center mt-4">
        <button
          onClick={handleSubmit}
          className="h-[44px] bg-[#0069FF] border-[#0069FF] text-center flex items-center justify-center rounded-[32px] w-[92px] border-[1px] text-white text-[12px] font-bold "
        >
          Sign Up
        </button>
      </div>
      <div className="mt-1 mr-3">
        <p className="text-[#1A1A1A] text-[12px] font-normal leading-5">
          Don't have an account ?{" "}
          <Link href="/login">
            <span className="text-[#0069FF] cursor-pointer">Login</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
