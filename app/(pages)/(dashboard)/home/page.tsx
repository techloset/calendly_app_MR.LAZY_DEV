// pages/index.tsx
"use client";
import Image from "next/image";
// pages/index.tsx
import { useState } from "react";
import logo from "../../../../public/profile/calendar.png";
import top from "../../../../public/images/logo1.png";

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div>
      <nav className={`sidebar ${sidebarOpen ? "" : "close"}`}>
        <header>
          <div className="image-text">
            <span>
              <img src="logo.png" alt="" />
            </span>
            <div className="">
              <Image src={top} className="ml-2" alt="hello" />
            </div>
          </div>
          <i className="bx bx-chevron-right toggle" onClick={toggleSidebar}></i>
        </header>
        <div className="menu-bar">
          <div className="menu">
            <div className="flex justify-center items-center">
              <div className="bg-blue-600 text-white rounded-3xl w-[100%] text-center py-2 h-[40px]">
                + Create
              </div>
            </div>
            <ul className="menu-links">
              <li className="nav-link flex gap-3 px-3">
                <a href="#">
                  <Image src={logo} className="w-6 h-6" alt="logo" />
                  <span className="text ml-3 nav-text">Schedule Event</span>
                </a>
              </li>
              <li className="nav-link flex gap-3 px-3">
                <a href="#">
                  <Image src={logo} className="w-6 h-6" alt="logo" />
                  <span className="text ml-3 nav-text">Analytics</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="bottom-content">
            <li>
              <a href="#">
                <i className="bx bx-log-out icon"></i>
                <span className="text nav-text">Logout</span>
              </a>
            </li>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Home;
