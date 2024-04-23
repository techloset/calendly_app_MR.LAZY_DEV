"use client";
import React, { useEffect, useState } from "react";
import { signIn, useSession, SessionProvider } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import googleLogo from "../../../../../public/icons/google.png";
import eye from "../../../../../public/images/eye.png";
import image from "../../../../public/images/logo1.png";
import { useRouter } from "next/navigation";
export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      router.push("/profile");
    }
  }, [session, router]);

  const login = async () => {
    setLoading(true);

    const login = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (login?.ok) {
      window.location.assign("/profile");
    } else if (login?.error) {
    }

    setLoading(false);
  };

  // const login = async (e: any) => {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.post("/api/loginnew", {
  //       email,
  //       password,
  //     });

  //     const token = response.data.token;

  //     // Save the token to local storage or session storage for future use
  //     localStorage.setItem("token", token);

  //     // Redirect the user to the dashboard or another authenticated page
  //     window.location.href = "/dashboard";
  //   } catch (error: any) {
  //     console.error("Login failed:", error.message);
  //     console.log("Login failed. Please check your credentials.");
  //   }
  // };

  const handleSignIn = async () => {
    await signIn("google");
  };

  return (
    <SessionProvider session={session}>
      <div className="max-w-[440px] h-[390px] border-[1px] border-[#DADADA] rounded-[6px] p-[24px]">
        <div>
          <p className="font-bold text-[14px] leading-6">Enter your email</p>
        </div>
        <div className="mt-2">
          <input
            type="text"
            className="w-[374px] h-[46px] border-[1px] border[#B2B2B2] rounded-[8px] px-4"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <p className="font-bold text-[14px] leading-6 mt-1">
            Enter your password
          </p>
        </div>

        <div className="relative mt-2">
          <input
            type="password"
            className="w-[374px] h-[46px] border-[1px] border[#B2B2B2] rounded-[8px] px-4 pr-10"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="absolute right-6 top-1/2 transform -translate-y-1/2 cursor-pointer">
            <Image src={eye} alt="" />
          </span>
        </div>

        <div className="h-[6px] w-[374px] rounded-[8px] mt-2 bg-[#F2F2F2]"></div>
        <div className="mt-3 mr-3">
          <p className="text-[#1A1A1A] text-[12px] text-end font-normal leading-5">
            <Link href="/forgotPassword">
              <span className="text-[#0069FF] cursor-pointer">
                Forgot Password ?
              </span>
            </Link>
          </p>
        </div>
        <div className="mt-2 mx-6">
          <p className="text-[#C84545] md:text-start text-center text-[12px] font-normal leading-5">
            Use a few words, avoid common phrases <br /> No need for symbols,
            digits, or uppercase letters
          </p>
        </div>

        <div className="flex items-center justify-center mt-4">
          <button
            onClick={login}
            className="h-[44px] bg-[#0069FF] border-[#0069FF] text-center flex items-center justify-center rounded-[32px] w-[92px] border-[1px] text-white text-[12px] font-bold "
          >
            Login
          </button>
        </div>
        <div className="flex items-center justify-center mt-4">
          <button
            onClick={handleSignIn}
            className="flex items-center justify-center h-[44px] bg-white border-[1px] border-[#0069FF] rounded-[32px] w-[240px] text-[12px] font-bold text-[#0069FF]"
          >
            <Image
              src={googleLogo}
              className="h-5 w-5 mr-2"
              alt="Google Logo"
            />
            Sign In with Google
          </button>
        </div>
        <div className="mt-3 mr-3">
          <p className="text-[#1A1A1A] text-[12px] font-normal leading-5">
            Don't have an account ?{" "}
            <Link href="/signUp">
              <span className="text-[#0069FF] cursor-pointer">Sign Up</span>
            </Link>
          </p>
        </div>
      </div>
    </SessionProvider>
  );
}