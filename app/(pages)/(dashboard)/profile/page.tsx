// components/page.tsx
"use client";
import React, { useEffect, useRef, useState } from "react";
import downArrow from "../../../../public/profile/down-arrow.png";
import i from "../../../../public/profile/i.png";
import inviteUser from "../../../../public/profile/inviteUser.png";
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

interface User {
  id: string;
  email: string;
  name: string;
}

interface DropdownProps {
  options: string[];
  onSelect: (option: string) => void;
  defaultValue?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect }) => {
  return (
    <select
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "8px",
        border: "1px ",
        paddingLeft: "10px",
      }}
      onChange={(e) => onSelect(e.target.value)}
    >
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

const page: React.FC<Props> = ({ handleFileChange }) => {
  const { data: sessions } = useSession();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.user.userData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const scheduleEventss = useAppSelector(
    (state) => state.fetchScheduleEvents.data
  );

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
    image: "https://via.placeholder.com/50x50",
  });

  useEffect(() => {
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
    // console.log("djfkdjfkjdkfjdkfjdklfjdkjfjdjf", formData);
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("/api/getProfileCollection");
  //       console.log(response.data);
  //     } catch (error: any) {
  //       console.log("error in get profile data api", error.message);
  //     }
  //   };

  //   fetchData();

  //   return () => {
  //     // Cleanup function if needed
  //   };
  // }, []);

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

  const handleFileInputChange = (files: FileList | null) => {
    if (files) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({
          ...prev,
          image: reader.result as string, // Cast to string
        }));
      };
      reader.readAsDataURL(files[0]);
    }
  };
  // const handleFileInputChange = (files: FileList | null) => {
  //   if (files) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       setFormData((prev) => ({
  //         ...prev,
  //         image: reader.result,
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

  // const handleSubmit = async () => {
  //   try {
  //     await axios.post("/api/uploadProfile", formData);
  //     console.log("Profile updated successfully!");
  //     router.push("/sidebar");
  //   } catch (error) {
  //     console.error("Error updating profile:", error);
  //     console.log("Failed to update profile. Please try again later.");
  //   }
  // };

  return (
    <>
      <div>
        <div className="flex">
          <ProfileSidebar />
          <div className="w-[80%] h-[1000px]">
            <div className="flex h-[60px] px-6 justify-between">
              <div></div>
              <div className="flex items-center gap-3">
                <div className="flex jstify-center gap-2">
                  <button
                    onClick={() => {
                      setIsModalOpen(true);
                    }}
                    className="h-[37px] gap-2 border-[blue] hover:bg-[#0069FF] hover:text-white transition duration-2000 active:bg-[#006aff87] text-center flex items-center justify-center rounded-[32px] px-4 border-[1px] text-blue-700 text-[12px] font-bold "
                  >
                    <Image src={inviteUser} className="h-6 w-6" alt="Tab" />
                    Invite user
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <>
                    <div className="h-[37px] w-[37px] text-center flex items-center justify-center rounded-[32px] px-4 border-[1px] bg-gray-400 text-[14px] font-semibold ">
                      M
                    </div>
                    <div>
                      <Image src={downArrow} className="h-3 w-3" alt="Tab" />
                    </div>
                  </>
                </div>
              </div>
            </div>

            <div>
              <div className="h-full w-[45%] px-7 py-4">
                <div>
                  <div>
                    <p className="font-medium text-[16px]">Account details</p>
                  </div>
                  <div className="mt-4">
                    <p className="font-semibold text-[22px]">Profile</p>
                  </div>

                  <div className="mt-16 flex gap-7 items-center">
                    <div className="h-24 w-24 rounded-full">
                      {formData?.image ? (
                        <Image
                          src={formData.image as string}
                          className="w-full h-full rounded-full"
                          width={100}
                          height={100}
                          alt="Profile Image"
                        />
                      ) : (
                        <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400">No Image</span>
                        </div>
                      )}
                    </div>
                    <div className="">
                      <div>
                        <button
                          onClick={handleClick}
                          className="h-[37px] gap-2 text-center hover:bg-[#0069FF] hover:text-white transition duration-2000 active:bg-[#006aff87] border-black flex items-center justify-center rounded-[32px] px-4 border-[1px] text-[12px] font-bold"
                        >
                          Upload picture
                        </button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          style={{ display: "none" }}
                          onChange={(e) =>
                            handleFileInputChange(e.target.files)
                          }
                        />
                      </div>
                      <div className="mt-4">
                        <p className="text-[13px]">
                          JPG, GIF or PNG, Max size of 5MB.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex mt-2 items-center gap-2">
                      <p className="font-bold text-[16px]">Name</p>
                      <div>
                        <Image src={i} className="h-3 w-3" alt="i" />
                      </div>
                    </div>
                    <div className="mt-2">
                      <input
                        type="text"
                        className="h-[40px] w-[450px] border-[1px] border-gray-300 px-3 rounded-md"
                        value={formData.fullName}
                        onChange={handleChange}
                        name="fullName"
                        placeholder={userData?.fullName || ""}
                      />
                    </div>

                    <div className="flex mt-7 items-center gap-2">
                      <p className="font-bold text-[16px]">Welcome message</p>
                      <div>
                        <Image src={i} className="h-3 w-3" alt="i" />
                      </div>
                    </div>
                    <div className="mt-2">
                      <textarea
                        rows={10}
                        value={formData.welcomeMessage}
                        onChange={handleChange}
                        className="h-[90px] border-[1px] w-[450px] border-gray-300 px-3 rounded-md"
                        name="welcomeMessage"
                        placeholder={userData?.welcomeMessage || ""}
                      />
                    </div>

                    <div className="mt-3">
                      <div className="">
                        <p className="font-bold text-[16px]">Language</p>
                      </div>

                      <div className="h-[40px] mt-2 w-[450px] border-[1px] border-[#B2B2B2] rounded-[8px]">
                        <Dropdown
                          options={hoursOptions}
                          onSelect={(option) =>
                            setFormData((prev) => ({
                              ...prev,
                              language: option,
                            }))
                          }
                        />
                      </div>
                    </div>

                    <div className="mt-6">
                      <div className="flex gap-4 w-[450px]">
                        <div>
                          <div className="flex gap-2 items-center">
                            <p className="font-bold text-[16px]">Date Format</p>
                            <Image src={i} className="h-3 w-3" alt="i" />
                          </div>
                          <div className="h-[40px] mt-2">
                            <input
                              type="date"
                              className="h-[40px] w-[215px] px-3 border-[1px] border-gray-300 rounded-md"
                              name="dateFormat"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex gap-2 items-center">
                            <p className="font-bold text-[16px]">Time Format</p>
                            <Image src={i} className="h-3 w-3" alt="i" />
                          </div>
                          <div className="h-[40px] w-[215px] border-[1px] border-gray-300 rounded-md mt-2">
                            <Dropdown
                              options={timesArray}
                              onSelect={(option) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  timeFormat: option,
                                }))
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mt-3">
                        <div className="">
                          <p className="font-bold text-[16px]">Country</p>
                        </div>

                        <div className="h-[40px] mt-2 w-[450px] border-[1px] border-[#B2B2B2] rounded-[8px]">
                          <Dropdown
                            options={countriesArray}
                            onSelect={(option) =>
                              setFormData((prev) => ({
                                ...prev,
                                country: option,
                              }))
                            }
                          />
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="flex w-[450px] justify-between items-center">
                          <p className="font-bold text-[16px]">Time Zone</p>
                          <p className="font-normal text-[16px]">
                            Current Time:{" "}
                            {currentTime.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>

                        <div className="h-[40px] mt-2 w-[450px] border-[1px] border-[#B2B2B2] rounded-[8px]">
                          <Dropdown
                            options={countryCityData}
                            onSelect={(option) =>
                              setFormData((prev) => ({
                                ...prev,
                                timeZone: option,
                              }))
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-7 px-7 w-[66%]">
                <div className="flex justify-between items-center">
                  <div className="flex gap-3">
                    <button
                      onClick={UpdateProfile}
                      className="h-[44px] bg-[#0069FF] text-white border-bg-[#0069FF] text-center flex items-center justify-center rounded-[32px] px-4 border-[1px] text-[14px] font-bold "
                    >
                      Save changes
                    </button>
                    <button className="h-[44px] hover:border-[blue] hover:bg-[#0069FF] hover:text-white transition duration-2000 active:bg-[#006aff87] text-center flex items-center border-black justify-center rounded-[32px] px-4 border-[1px] text-[14px] font-bold ">
                      Cancel
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={handleDeleteAccount}
                      className="h-[44px] bg-red-600 text-white border-bg-[#0069FF] text-center flex items-center justify-center rounded-[32px] px-4 border-[1px] text-[14px] font-bold "
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        title=""
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleOk}
      >
        <div className="container">
          <div className="row">
            <div className="col">
              <p>
                <span className="font-bold" style={{ fontSize: "27px" }}>
                  Invite User Link :-{" "}
                </span>{" "}
              </p>
            </div>
            <div className=" mt-6 w-[470px] flex items-center h-12 rounded-md border-[1px] border-gray-400 ">
              <span className="font-medium px-3" style={{ fontSize: "15px" }}>
                {`http://localhost:3000/goNext/${sessions?.user.email}`}
              </span>{" "}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default page;
