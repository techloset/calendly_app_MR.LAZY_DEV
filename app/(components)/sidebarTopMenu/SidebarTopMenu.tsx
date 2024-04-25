"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import downArrow from "../../../public/profile/down-arrow.png";

export default function SidebarTopMenu() {
  return (
    <div className="flex h-[60px] justify-between">
      <div></div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Link
            href={"/profile"}
            className="h-[37px] w-[37px] text-center flex items-center justify-center rounded-[32px] px-4 border-[1px] bg-gray-400 text-[14px] font-semibold "
          >
            M
          </Link>
          <div>
            <Image src={downArrow} className="h-3 w-3" alt="Tab" />
          </div>
        </div>
      </div>
    </div>
  );
}
