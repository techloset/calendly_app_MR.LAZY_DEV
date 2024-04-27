// import { NextRequest, NextResponse } from "next/server";
// import prismadb from "../../libs/prismadb";

// export async function GET(req: NextRequest): Promise<NextResponse> {
//   try {
//     const data = await prismadb.availability.findMany();

//     return new NextResponse(JSON.stringify(data), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (err) {
//     console.error("Error:", err);
//     return new NextResponse("Internal Server Error", { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import prismadb from "../../libs/prismadb";
import { getSession } from "next-auth/react";
import { IncomingMessage } from "http";
import { getServerSession } from "next-auth";

export async function GET(req: IncomingMessage): Promise<NextResponse> {
  try {
    const session = await getServerSession({ req });

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userEmail = session.user?.email;

    // console.log("session", userEmail);

    if (!userEmail) {
      return new NextResponse("User email not found", { status: 400 });
    }

    const userData = await prismadb.availability.findMany({
      where: {
        email: {
          equals: userEmail,
        },
      },
    });

    if (!userData) {
      return new NextResponse("availability data not found", { status: 404 });
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

// updateData.ts
import { NextRequest } from "next/server";

interface AvailabilityData {
  selectedDays: string[];
  selectedHour1: string;
  selectedHour2: string;
  email: string;
}

export async function PUT(req: NextRequest) {
  try {
    // const session = req.session; // Assuming session management is set up
    const session = await getServerSession({ req });

    // Check if the user is logged in
    if (!session || !session.user || !session.user.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userEmail = session.user.email;

    const body = await req.json();

    const { selectedDays, selectedHour1, selectedHour2, email } = body;

    if (!selectedDays || !selectedHour1 || !selectedHour2 || !email) {
      return new NextResponse("Missing data", { status: 400 });
    }

    if (email !== userEmail) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const newData: AvailabilityData = {
      selectedDays,
      selectedHour1,
      selectedHour2,
      email,
    };

    // Assuming you have a unique identifier like an ID to identify the data to be updated
    const id = body.id; // Adjust this based on your actual implementation

    const updatedData = await prismadb.availability.update({
      where: { id, email: userEmail }, // Update data only if email matches session user's email
      data: newData,
    });

    return new NextResponse(JSON.stringify(updatedData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();

    const { selectedDays, selectedHour1, selectedHour2, email } = body;

    if (!selectedDays || !selectedHour1 || !selectedHour2 || !email) {
      return new NextResponse("Missing data", { status: 400 });
    }

    const newData: AvailabilityData = {
      selectedDays,
      selectedHour1,
      selectedHour2,
      email,
    };

    const createdData = await prismadb.availability.create({
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
