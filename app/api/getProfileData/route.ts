import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../libs/prismadb";
import { getSession } from "next-auth/react";

interface ProfileData {
  id: string;
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

// Define the where clause type
interface ProfileDataWhereUniqueInput {
  id: string; // Mark id as required
  email?: string;
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    // Get the current user's session
    const session = await getSession({ req: req as any });
    console.log("firdffst", session?.user?.email);

    // Check if session exists and contains user information
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    console.log("first", session.user.email);

    // Retrieve user data from the database based on the current user's email
    const userData = await prismadb.profileData.findUnique({
      where: { email: session.user.email } as ProfileDataWhereUniqueInput,
    });
    console.log("second", session.user.email);

    if (!userData) {
      return new NextResponse("User data not found", { status: 404 });
    }

    console.log("third", session.user.email);
    // Return the user data
    return new NextResponse(JSON.stringify(userData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
