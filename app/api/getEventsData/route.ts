import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../libs/prismadb";
import { getSession } from "next-auth/react";
import { IncomingMessage } from "http";
import { getServerSession } from "next-auth";
import { MySession } from "@/app/constants/types";

export async function GET(req: IncomingMessage): Promise<NextResponse> {
  try {
    const session = (await getServerSession(req as any)) as MySession;
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userEmail = session.user?.email;

    console.log("session", userEmail);

    if (!userEmail) {
      return new NextResponse("User email not found", { status: 400 });
    }

    const userData = await prismadb.scheduleEvent.findMany({
      where: {
        ownerEmail: {
          equals: userEmail,
        },
      },
    });

    if (!userData) {
      return new NextResponse("User data not found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(userData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

interface UploadData {
  name: string;
  email: string;
  additionalInfo: string;
  time: string;
  date: string;
  timeZone: string;
  ownerEmail: string;
  ownerName: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();

    const {
      name,
      email,
      additionalInfo,
      time,
      date,
      timeZone,
      ownerEmail,
      ownerName,
    } = body;

    if (
      !email ||
      !name ||
      !additionalInfo ||
      !time ||
      !date ||
      !timeZone ||
      !ownerEmail ||
      !ownerName
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
      ownerName,
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
