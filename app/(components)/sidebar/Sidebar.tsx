"use client";
// components/Sidebar.tsx
import React from "react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <aside
      className={`bg-gray-900 text-white w-64 min-h-screen py-6 px-4 fixed top-0 left-0 transition-transform duration-300 ease-in-out transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Close button */}
      <div className="flex justify-end mb-4">
        <button onClick={onClose} className="focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      {/* Sidebar content */}
      <nav>
        <ul>
          <li className="py-2">
            <a href="#" className="text-gray-300 hover:text-white">
              Dashboard
            </a>
          </li>
          <li className="py-2">
            <a href="#" className="text-gray-300 hover:text-white">
              Profile
            </a>
          </li>
          <li className="py-2">
            <a href="#" className="text-gray-300 hover:text-white">
              Settings
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
