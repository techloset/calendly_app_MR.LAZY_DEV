// // getData.ts
// import { NextRequest, NextResponse } from "next/server";
// import prismadb from "../../libs/prismadb";

// export async function GET(req: NextRequest): Promise<NextResponse> {
//   try {
//     // Fetch data from the collection
//     const data = await prismadb.user.findMany();

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

    console.log("session", session);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userEmail = session.user?.email;

    if (!userEmail) {
      return new NextResponse("User email not found", { status: 400 });
    }

    const userData = await prismadb.user.findFirst({
      where: {
        email: {
          equals: userEmail,
        },
      },
    });

    if (!userData) {
      // Return not found response if user data is not available
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
