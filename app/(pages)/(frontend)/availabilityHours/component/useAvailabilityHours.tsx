"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import availabilityData, {
  fetchAvailabilityData,
} from "@/app/store/slice/availabilityData";
import { useAppDispatch, useAppSelector } from "@/app/store/store";
const useAvailabilityHours = () => {
  const { data: sessions } = useSession();
  const dispatch = useAppDispatch();
  const [selectedHour1, setSelectedHour1] = useState<string | null>(null);
  const [selectedHour2, setSelectedHour2] = useState<string | null>(null);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const handleCheckboxChange = (label: string, checked: boolean) => {
    setSelectedDays((prev) => {
      if (checked) {
        return [...prev, label];
      } else {
        return prev.filter((day) => day !== label);
      }
    });
  };

  useEffect(() => {
    dispatch(fetchAvailabilityData());
  }, [dispatch]);

  const handleAvailability = async () => {
    try {
      const response = await axios.post("/api/getAvailability", {
        selectedDays,
        selectedHour1,
        selectedHour2,
        email: sessions?.user.email,
      });
      console.log("Form data uploaded successfully:", response.data);
      window.location.assign("/sidebar");
    } catch (error) {
      console.error("Error handling form submission:", error);
    }
  };

  return {
    setSelectedHour1,
    setSelectedHour2,
    handleCheckboxChange,
    handleAvailability,
  };
};

export default useAvailabilityHours;
