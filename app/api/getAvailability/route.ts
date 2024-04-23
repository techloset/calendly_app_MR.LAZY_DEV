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

    console.log("session", userEmail);

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
