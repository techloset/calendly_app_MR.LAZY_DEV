"use client";
// pages/dashboard.tsx
import Sidebar from "@/app/(components)/sidebar/Sidebar";
import React, { useState } from "react";

const page: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      {/* Main content */}
      <div className={`flex flex-col flex-1 ${isSidebarOpen ? "ml-64" : ""}`}>
        <header className="bg-gray-800 text-white py-4 px-6">
          <button onClick={toggleSidebar} className="focus:outline-none">
            Toggle Sidebar
          </button>
        </header>
        <main className="p-6">
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
          <p>This is the dashboard page.</p>
        </main>
      </div>
    </div>
  );
};

export default page;
