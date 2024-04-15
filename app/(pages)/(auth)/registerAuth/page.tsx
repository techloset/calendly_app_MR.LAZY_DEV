"use client";

import axios from "axios";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function RegisterForm() {
  useEffect(() => {
    signOut({
      redirect: false,
    });
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const register = async () => {
    setLoading(true);
    try {
      await axios.post("/api/register", {
        email,
        password,
      });

      router.push("/loginAuth");
    } catch (err: any) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5 flex flex-col items-center">
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border-[1px]"
        placeholder="Email"
        disabled={loading}
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border-[1px]"
        placeholder="Password"
        disabled={loading}
        type="password"
      />
      <div
        onClick={register}
        className="px-10 py-3 bg-neutral-900 rounded-full text-white disabled:opacity-70 cursor-pointer"
      >
        Register
      </div>
    </div>
  );
}
