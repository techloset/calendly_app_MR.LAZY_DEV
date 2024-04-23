// uploadData.ts
import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../libs/prismadb";

interface UploadData {
  name: string;
  email: string;
  additionalInfo: string;
  time: string;
  date: string;
  timeZone: string;
  ownerEmail: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();

    const { name, email, additionalInfo, time, date, timeZone, ownerEmail } =
      body;

    if (
      !email ||
      !name ||
      !additionalInfo ||
      !time ||
      !date ||
      !timeZone ||
      !ownerEmail
    ) {
      return new NextResponse("Missing data", { status: 400 });
    }

    const newData: UploadData = {
      name: name,
      email: email,
      additionalInfo: additionalInfo,
      time,
      date,
      timeZone,
      ownerEmail,
    };

    const createdData = await prismadb.scheduleEvent.create({
      data: newData,
    });

    return new NextResponse(JSON.stringify(createdData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
