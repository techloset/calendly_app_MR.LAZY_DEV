"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import downArrow from "../../../public/profile/down-arrow.png";
import { useAppSelector } from "@/app/store/store";
import { useSession } from "next-auth/react";

export default function SidebarTopMenu() {
  const userData = useAppSelector((state) => state.user.userData);
  const sessionss = useSession();

  return (
    <div className="flex h-[60px] justify-between">
      <div></div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Link
            href={"/profile"}
            className="h-[37px] w-[37px] text-center flex items-center justify-center rounded-[32px] border-[1px] bg-gray-400 text-[14px] font-semibold "
          >
            {userData?.image ? (
              <>
                {userData?.image && (
                  <div className="w-full h-full relative">
                    <Image
                      src={userData?.image.toString()}
                      className="absolute inset-0 w-full h-full rounded-full"
                      layout="fill"
                      objectFit="cover"
                      alt="Uploaded"
                    />
                  </div>
                )}
              </>
            ) : (
              <>
                {sessionss.data?.user.image && (
                  <div className="w-full h-full relative">
                    <Image
                      src={sessionss.data.user.image.toString()}
                      className="absolute inset-0 w-full h-full rounded-full"
                      layout="fill"
                      objectFit="cover"
                      alt="Uploaded"
                    />
                  </div>
                )}
              </>
            )}
          </Link>
          <div>
            <Image src={downArrow} className="h-3 w-3" alt="Tab" />
          </div>
        </div>
        <></>
      </div>
    </div>
  );
}
