"use client";
import React, { useEffect, useState } from "react";
import image from "../../../../public/images/logo1.png";
import Link from "next/link";
import eye from "../../../../public/images/eye.png";
import open from "../../../../public/icons/open.png";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { fetchUserData } from "@/app/store/slice/userSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import { showToast } from "@/app/constants/toastify";

export default function Page() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const userData = useAppSelector((state) => state.user.userData);

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  console.log("djfkdjf", userData?.hashPassword);

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  const [show, setShow] = useState(false);

  const click = () => {
    setShow(!show);
  };
  const [show2, setShow2] = useState(false);

  const click2 = () => {
    setShow2(!show2);
  };
  const [show3, setShow3] = useState(false);

  const click3 = () => {
    setShow3(!show3);
  };

  const [formData, setFormData] = useState({
    password: "",
    newPassword1: "",
    newPassword2: "",
    hashPasswordd: userData?.hashPassword,
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleResetPassword = async () => {
    try {
      const response = await axios.put("/api/resetPassword", formData);
      console.log("User password updated:", response.data);
      showToast("Password Reset Successfull", "success");

      router.push("/profile");
    } catch (error) {
      console.error("Error updating user password:", error);
      showToast("Error in Reset Password", "error");
    }
  };

  return (
    <div className="flex mt-16 justify-center">
      <div className="w-[440px] h-[580px] ">
        <div className="flex justify-center">
          <Image src={image} className="w-[182px] h-[43px]" alt="Logo" />
        </div>
        <div className="flex text-center justify-center">
          <p className="font-bold text-[20px] text-[#1A1A1A] leading-7">
            Reset Password with Calendly for <br /> free
          </p>
        </div>
        <div className="max-w-[440px] h-[440px] border-[1px] border-[#DADADA] rounded-[6px] p-[24px]">
          <div>
            <p className="font-bold text-[14px] leading-6">Current Password</p>
          </div>
          <div className="relative mt-2">
            <input
              type={show ? "text" : "password"}
              className="w-[374px] h-[46px] border-[1px] border[#B2B2B2] rounded-[8px] px-4 pr-10"
              placeholder="Old Password"
              name="password"
              value={formData.password}
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
          <div>
            <p className="font-bold text-[14px] leading-6 mt-1">New Password</p>
          </div>
          <div className="relative mt-2">
            <input
              type={show2 ? "text" : "password"}
              className="w-[374px] h-[46px] border-[1px] border[#B2B2B2] rounded-[8px] px-4 pr-10"
              placeholder="New Password"
              name="newPassword1"
              onChange={handleChange}
              value={formData.newPassword1}
            />
            <span
              onClick={click2}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 cursor-pointer"
            >
              {show2 ? (
                <Image className="h-4 w-4" src={open} alt="" />
              ) : (
                <Image src={eye} alt="" />
              )}
            </span>
          </div>
          <div>
            <p className="font-bold text-[14px] leading-6 mt-1">
              Confirm Password
            </p>
          </div>
          <div className="relative mt-2">
            <input
              type={show3 ? "text" : "password"}
              className="w-[374px] h-[46px] border-[1px] border[#B2B2B2] rounded-[8px] px-4 pr-10"
              placeholder="New Password"
              name="newPassword2"
              value={formData.newPassword2}
              onChange={handleChange}
            />
            <span
              onClick={click3}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 cursor-pointer"
            >
              {}
              {show3 ? (
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
          <div className="flex items-center justify-center mt-4">
            <button
              onClick={handleResetPassword}
              className="h-[44px] bg-[#0069FF] border-[#0069FF] text-center flex items-center justify-center rounded-[32px] w-[122px] border-[1px] text-white text-[12px] font-bold "
            >
              Reset password
            </button>
          </div>
          <div className="mt-3 mr-3">
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
