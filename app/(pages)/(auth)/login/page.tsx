"use client";
import React from "react";
import image from "../../../../public/images/logo1.png";
import Link from "next/link";
import eye from "../../../../public/images/eye.png";
import Image from "next/image";

export default function Page() {
  return (
    <div className="flex mt-20 justify-center">
      <div className="w-[440px] h-[580px] ">
        <div className="flex justify-center">
          <Image src={image} className="w-[182px] h-[43px]" alt="Logo" />
        </div>
        <div className="flex text-center justify-center">
          <p className="font-bold text-[20px] text-[#1A1A1A] leading-7">
            Login with Calendly for <br /> free
          </p>
        </div>
        <div className="max-w-[440px] h-[390px] border-[1px] border-[#DADADA] rounded-[6px] p-[24px]">
          <div>
            <p className="font-bold text-[14px] leading-6">Enter your email</p>
          </div>
          <div className="mt-2">
            <input
              type="password"
              className="w-[374px] h-[46px] border-[1px] border[#B2B2B2] rounded-[8px] px-4"
              placeholder="email"
            />
          </div>
          <div>
            <p className="font-bold text-[14px] leading-6 mt-1">
              Enter your password
            </p>
          </div>

          <div className="relative mt-2">
            <input
              type="password"
              className="w-[374px] h-[46px] border-[1px] border[#B2B2B2] rounded-[8px] px-4 pr-10"
              placeholder="password"
            />
            <span className="absolute right-6 top-1/2 transform -translate-y-1/2 cursor-pointer">
              <Image src={eye} alt="" />
            </span>
          </div>

          <div className="h-[6px] w-[374px] rounded-[8px] mt-2 bg-[#F2F2F2]"></div>
          <div className="mt-3 mr-3">
            <p className="text-[#1A1A1A] text-[12px] text-end font-normal leading-5">
              <Link href="/forgotPassword">
                <span className="text-[#0069FF] cursor-pointer">
                  Forgot Password ?
                </span>
              </Link>
            </p>
          </div>
          <div className="mt-2 mx-6">
            <p className="text-[#C84545] md:text-start text-center text-[12px] font-normal leading-5">
              Use a few words, avoid common phrases <br /> No need for symbols,
              digits, or uppercase letters
            </p>
          </div>

          <div className="flex items-center justify-center mt-4">
            <button className="h-[44px] bg-[#0069FF] border-[#0069FF] text-center flex items-center justify-center rounded-[32px] w-[92px] border-[1px] text-white text-[12px] font-bold ">
              Login
            </button>
          </div>
          <div className="mt-3 mr-3">
            <p className="text-[#1A1A1A] text-[12px] font-normal leading-5">
              Don't have an account ?{" "}
              <Link href="/signUp">
                <span className="text-[#0069FF] cursor-pointer">Sign Up</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
