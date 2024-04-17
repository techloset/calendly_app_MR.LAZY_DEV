// uploadData.ts
import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../libs/prismadb";

interface AvailabilityData {
  selectedDays: string[];
  selectedHour1: string;
  selectedHour2: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();

    const { selectedDays, selectedHour1, selectedHour2 } = body;

    if (!selectedDays || !selectedHour1 || !selectedHour2) {
      return new NextResponse("Missing data", { status: 400 });
    }

    const newData: AvailabilityData = {
      selectedDays,
      selectedHour1,
      selectedHour2,
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
