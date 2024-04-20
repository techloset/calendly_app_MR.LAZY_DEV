// import { NextRequest, NextResponse } from "next/server";
// import prismadb from "../../libs/prismadb";
// import { getSession } from "next-auth/react";

// interface ProfileData {
//   id: string;
//   image: string;
//   name: string;
//   email: string;
//   welcomeMessage: string;
//   language: string;
//   dateFormat: string;
//   country: string;
//   timeFormat: string;
//   timeZone: string;
// }

// // Define the where clause type
// interface ProfileDataWhereUniqueInput {
//   id: string; // Mark id as required
//   email?: string;
// }

// export async function GET(req: NextRequest): Promise<NextResponse> {
//   try {
//     // Get the current user's session
//     const sessions = await getSession({ req: req as any });
//     console.log("firdffst", sessions?.user?.email);

//     // Check if session exists and contains user information
//     if (!sessions?.user?.email) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     console.log("first", sessions.user.email);

//     // Retrieve user data from the database based on the current user's email
//     const userData = await prismadb.profileData.findUnique({
//       where: { email: sessions.user.email } as ProfileDataWhereUniqueInput,
//     });
//     console.log("second", sessions.user.email);

//     if (!userData) {
//       return new NextResponse("User data not found", { status: 404 });
//     }

//     console.log("third", sessions.user.email);
//     // Return the user data
//     return new NextResponse(JSON.stringify(userData), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     console.error("Error:", error);
//     return new NextResponse("Internal Server Error", { status: 500 });
//   }
// }

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
