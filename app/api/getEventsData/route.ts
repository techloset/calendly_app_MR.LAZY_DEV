import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../libs/prismadb";
import { getServerSession } from "next-auth";
import { MySession, UploadDataApi } from "@/app/constants/types";

export async function GET(req: Request) {
  try {
    const session = (await getServerSession(req as any)) as MySession;
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const userEmail = session.user?.email;

    if (!userEmail) {
      return new Response("User email not found", { status: 400 });
    }

    const userData = await prismadb.scheduleEvent.findMany({
      where: {
        ownerEmail: {
          equals: userEmail,
        },
      },
    });

    if (!userData) {
      return new Response("User data not found", { status: 404 });
    }

    return new Response(JSON.stringify(userData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function POST(req: Request) {
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
      return new Response("Missing data", { status: 400 });
    }

    const newData: UploadDataApi = {
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

    return new Response(JSON.stringify(createdData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
