"use client";
import React, { useState } from "react";
import image from "../../../../public/images/logo1.png";
import Link from "next/link";
import eye from "../../../../public/images/eye.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { fork } from "child_process";

export default function Page() {
  // const router = useRouter();
  // const [loading, setLoading] = useState(false);
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [fullName, setFullName] = useState("");
  // const [userName, setUserName] = useState("");
  // const [formData, setFormData] = useState({
  //   email: "",
  //   fullName: "",
  //   userName: "",
  //   password: "",
  // });

  // const handleChange = (e: any) => {
  //   const { name, value } = e.target;
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

  // const handleSubmit = async () => {
  //   setLoading(true);
  //   try {
  //     await axios.post("/api/register", {
  //       email,
  //       password,
  //     });

  //     router.push("/login");
  //   } catch (err: any) {
  //     console.log(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleSubmit = async () => {
  //   setLoading(true);
  //   try {
  //     await axios.post("/api/register", formData);
  //     router.push("/login");
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    userName: "",
    password: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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

  // const handleSubmit = async () => {
  //   setLoading(true);
  //   try {
  //     await axios.post("/api/register", {
  //       formData,
  //     });

  //     router.push("/login");
  //   } catch (err: any) {
  //     console.log(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="flex mt-5 justify-center">
      <div className="w-[440px] h-[580px] ">
        <div className="flex justify-center">
          <Image src={image} className="w-[182px] h-[43px]" alt="Logo" />
        </div>
        <div className="flex text-center justify-center">
          <p className="font-bold text-[20px] text-[#1A1A1A] leading-7">
            Sign up with Calendly for <br /> free
          </p>
        </div>
        <div className="max-w-[440px] h-[550px] border-[1px] border-[#DADADA] rounded-[6px] p-[24px]">
          <div>
            <p className="font-bold text-[14px] leading-6">
              Enter your email to get started.
            </p>
          </div>
          <div className="mt-2">
            <input
              type="text"
              className="w-[374px] h-[46px] border-[1px] border[#B2B2B2] rounded-[8px] px-4"
              placeholder="test@gmail.com"
              name="email"
              value={formData.email}
              // onChange={(e) => setEmail(e.target.value)}
              onChange={handleChange}
            />
          </div>
          <div>
            <p className="font-bold text-[14px] leading-6 mt-1">
              Enter your full name.
            </p>
          </div>
          <div className="mt-2">
            <input
              type="text"
              name="fullName"
              className="w-[374px] h-[46px] border-[1px] border[#B2B2B2] rounded-[8px] px-4"
              placeholder="John Doe"
              value={formData.fullName}
              // onChange={(e) => setFullName(e.target.value)}
              onChange={handleChange}
            />
          </div>
          <div>
            <p className="font-bold text-[14px] leading-6 mt-1">
              Enter your username
            </p>
          </div>
          <div className="mt-2">
            <input
              type="text"
              className="w-[374px] h-[46px] border-[1px] border[#B2B2B2] rounded-[8px] px-4"
              placeholder="John Doe"
              name="userName"
              value={formData.userName}
              // onChange={(e) => setUserName(e.target.value)}
              onChange={handleChange}
            />
          </div>
          <div>
            <p className="font-bold text-[14px] leading-6 mt-1">
              Choose a password with at least 8 characters.
            </p>
          </div>
          <div className="relative mt-2">
            <input
              type="password"
              className="w-[374px] h-[46px] border-[1px] border[#B2B2B2] rounded-[8px] px-4 pr-10"
              placeholder="password"
              value={formData.password}
              name="password"
              // onChange={(e) => setPassword(e.target.value)}
              onChange={handleChange}
            />
            <span className="absolute right-6 top-1/2 transform -translate-y-1/2 cursor-pointer">
              <Image src={eye} alt="" />
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
      </div>
    </div>
  );
}
