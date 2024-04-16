import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../libs/prismadb";

interface UploadProfile {
  image: string;
  name: string;
  email: string;
  welcomeMessage: string;
  language: string;
  dateFormat: string;
  country: string;
  timeFormat: string;
  timeZone: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();

    const {
      image,
      name,
      email,
      welcomeMessage,
      language,
      dateFormat,
      timeFormat,
      country,
      timeZone,
    } = body;

    if (
      !image ||
      !name ||
      !email ||
      !welcomeMessage ||
      !language ||
      !dateFormat ||
      !timeFormat ||
      !country ||
      !timeZone
    ) {
      return new NextResponse("Missing data", { status: 400 });
    }

    const newData: UploadProfile = {
      image: image,
      name: name,
      email: email,
      welcomeMessage: welcomeMessage,
      language: language,
      dateFormat: dateFormat,
      country: country,
      timeFormat: timeFormat,
      timeZone: timeZone,
    };

    const createdData = await prismadb.profileData.create({
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
