"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
export default function page() {
  const router = useRouter();
  useEffect(() => {
    router.push("/sidebar");
  }, []);
  return <div></div>;
}
