"use client";

import { signIn, signOut } from "next-auth/react";
import React, { useEffect, useState } from "react";

export default function LoginForm() {
  useEffect(() => {
    signOut({
      redirect: false,
    });
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);

    const login = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (login?.ok) {
      window.location.assign("/sidebar");
    } else if (login?.error) {
    }

    setLoading(false);
  };

  return (
    <div className="space-y-5 flex flex-col items-center">
      <input
        placeholder="Email"
        value={email}
        onChange={(e: any) => setEmail(e.target.value)}
        disabled={loading}
      />
      <input
        placeholder="Password"
        value={password}
        onChange={(e: any) => setPassword(e.target.value)}
        disabled={loading}
        type="password"
      />
      <div
        onClick={login}
        className="px-10 py-3 bg-neutral-900 rounded-full text-white disabled:opacity-70 cursor-pointer"
      >
        Login
      </div>
    </div>
  );
}
