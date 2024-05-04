"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { showToast } from "@/app/constants/toastify";

const useForgotConfirm = ({ params }: any) => {
  const decodedValue = decodeURIComponent(params?.forgot || "");

  const router = useRouter();
  const [selectedDateTime, setSelectedDateTime] = useState<any>({
    decodedValue: decodedValue,
  });

  const userEmail = selectedDateTime.decodedValue;

  const [password, setPassword] = useState("");

  const handleForgotPassword = async () => {
    try {
      const response = await axios.put("/api/forgot", {
        userEmail,
        password,
      });
      showToast("Forgot Password Successfull", "success");

      router.push("/login");
    } catch (error) {
      console.error("Error updating user password:", error);
      showToast("Please Enter Your Data Correctly", "error");
    }
  };
  return {
    handleForgotPassword,
    password,
    setPassword,
  };
};

export default useForgotConfirm;
