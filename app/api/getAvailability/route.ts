// getData.ts
import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../libs/prismadb";

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const data = await prismadb.availability.findMany();

    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
