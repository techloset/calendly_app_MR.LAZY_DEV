"use client";
import React, { useEffect, useRef, useState } from "react";
import downArrow from "../../../../../public/profile/down-arrow.png";
import i from "../../../../../public/profile/i.png";
import inviteUser from "../../../../../public/profile/inviteUser.png";
import avatar from "../../../../public/profile/avatar.png";
import {
  countriesArray,
  countryCityData,
  hoursOptions,
  timesArray,
} from "@/app/(components)/profileData/ProfileData";
import Link from "next/link";
import ProfileSidebar from "@/app/(components)/profileSidebar/ProfileSidebar";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { signOut, useSession } from "next-auth/react";
import { Modal } from "antd";
import { fetchUserData } from "@/app/store/slice/userSlice";
import Image from "next/image";
import { Dropdown } from "@/app/(components)/dropdown/DropDown";

interface Props {
  handleFileChange: (files: FileList | null) => void;
}

interface FormData {
  country: string;
  fullName: string;
  welcomeMessage: string;
  language: string;
  dateFormat: string;
  timeFormat: string;
  timeZone: string;
  image: string | ArrayBuffer | null;
}
const useProfile = () => {
  const { data: sessions } = useSession();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.user.userData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const scheduleEventss = useAppSelector(
    (state) => state.fetchScheduleEvents.data
  );

  // const handleUpload = (info: any) => {
  //   const url = info.info.secure_url;
  //   setImageUrl(url);
  //   console.log("Uploaded image URL:", url);
  // };

  const handleDeleteAccount = async () => {
    try {
      const response = await axios.delete("/api/accountDelete", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        console.log("User account deleted successfully");
        signOut();
      } else {
        console.error("Error:", response.data);
      }
    } catch (error: any) {
      console.error("Error:", error.message);
    }
  };

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    country: "country",
    welcomeMessage: "",
    language: "language",
    dateFormat: "dateFormat",
    timeFormat: "timeFormat",
    timeZone: "timeZone",
    image: "",
  });

  //via.placeholder.com/50x50

  https: useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleUpload = (info: any) => {
    const url = info.info.secure_url;
    setImageUrl(url);
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: url,
    }));
    console.log("Uploaded image URL:", url);
    // console.log("formData", formData);
  };

  // const handleFileInputChange = (files: FileList | null) => {
  //   if (files) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       setFormData((prev) => ({
  //         ...prev,
  //         image: imageUrl,
  //         // image: reader.result as string,
  //       }));
  //     };
  //     reader.readAsDataURL(files[0]);
  //   }
  // };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const UpdateProfile = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.put("/api/register", formData);
      console.log("response update profile", response);
      dispatch(fetchUserData());
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  useEffect(() => {
    console.log("formData", formData);
  }, [formData]);
  return {
    setIsModalOpen,
    sessions,
    formData,
    handleClick,
    fileInputRef,
    // handleFileInputChange,
    handleChange,
    setFormData,
    currentTime,
    UpdateProfile,
    handleDeleteAccount,
    isModalOpen,
    handleCancel,
    handleOk,
    userData,
    setImageUrl,
    imageUrl,
    handleUpload,
  };
};

export default useProfile;
