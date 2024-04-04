import React from "react";
import logo from "../../../../public/images/logo.svg";
import person from "../../../../public/vectors/personn.png";
import Image from "next/image";
export default function page() {
  return (
    <div>
      <div className="flex">
        <div className="w-[18%] px-6 py-4 h-[1000px] border-[1px]">
          <div>
            <Image src={logo} className="h-[40px] w-[150px]" alt="" />
          </div>
          <div className="flex mt-4">
            <div></div>
            <div>
              <p className="text-blue-600 font-semibold text-[18px]">
                Back to home
              </p>
            </div>
          </div>

          <div className="mt-4">
            <p className=" font-bold text-[19px]">Account settings</p>
          </div>

          <div className="flex mt-4 py-2 gap-2 flex-row items-center">
            <div>
              <Image src={person} className="w-6 h-6" alt="" />
            </div>
            <div>
              <p className="text-blue-600 font-semibold text-[18px]">Profile</p>
            </div>
          </div>
          <div className="flex mt-3 py-2">
            <div></div>
            <div>
              <p className=" font-semibold text-[18px]">Branding</p>
            </div>
          </div>
          <div className="flex mt-3 py-2">
            <div></div>
            <div>
              <p className=" font-semibold text-[18px]">My Link</p>
            </div>
          </div>
          <div className="flex mt-3 py-2">
            <div></div>
            <div>
              <p className=" font-semibold text-[18px]">Login preferences</p>
            </div>
          </div>
          <div className="flex mt-3 py-2">
            <div></div>
            <div>
              <p className=" font-semibold text-[18px]">Cookie settings</p>
            </div>
          </div>
          <div className="flex mt-3 py-2">
            <div></div>
            <div>
              <p className=" font-semibold text-[18px]">Calendar sync</p>
            </div>
          </div>
        </div>

        <div className="w-[82%] bg-slate-700 h-[1000px]">
          <div className="flex justify-between">
            <div>dkfj</div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
