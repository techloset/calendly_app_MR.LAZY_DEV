import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../libs/prismadb";

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

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    // Retrieve all profile data
    const profileData = await prismadb.profileData.findMany();

    if (!profileData || profileData.length === 0) {
      return new NextResponse("Profile data not found", { status: 404 });
    }

    // Get the current user's email from the request headers
    const currentUserEmail = req.headers.get("Authorization");

    if (!currentUserEmail) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Filter profile data based on the current user's email
    const userData = profileData.find(
      (data: ProfileData) => data.email === currentUserEmail
    );

    if (!userData) {
      return new NextResponse("User data not found", { status: 404 });
    }

    // Return the filtered user data
    return new NextResponse(JSON.stringify(userData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
