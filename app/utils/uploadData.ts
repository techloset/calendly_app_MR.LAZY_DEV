// utils/uploadData.ts

import { PrismaClient } from "@prisma/client";
import InputData from "./inputData";

const prisma = new PrismaClient();

async function uploadData(data: InputData): Promise<void> {
  try {
    await prisma.scheduleEvent.create({
      data: {
        name: data.name,
        email: data.email,
        anything: data.anything,
      },
    });
    console.log("Data uploaded successfully");
  } catch (error) {
    console.error("Error utils uploading data:", error);
    throw new Error("Failed to upload data");
  }
}

export default uploadData;
