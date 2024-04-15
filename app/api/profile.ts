// pages/api/profile.ts

import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const {
      userName,
      welcomeMessage,
      language,
      dateFormat,
      timeFormat,
      timeZone,
    } = req.body;

    // Get the current user from the database
    const user = await prisma.user.findUnique({
      where: { email: session?.user?.email || "" },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user profile in the database
    const updatedUser = await prisma.user.update({
      where: { email: session?.user?.email || "" },
      data: {
        userName,
        welcomeMessage, // Make sure welcomeMessage is defined in your Prisma schema
        language,
        dateFormat,
        timeFormat,
        timeZone,
      } as any,
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
