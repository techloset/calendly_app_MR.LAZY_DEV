import { NextResponse } from "next/server";
import prismadb from "../../libs/prismadb";
import { getServerSession } from "next-auth";
import { IncomingMessage } from "http";

export async function DELETE(req: IncomingMessage): Promise<NextResponse> {
  try {
    // Get the session
    const session = await getServerSession({ req });

    // If the session doesn't exist, return unauthorized
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Extract user email from session
    const userEmail = session.user?.email;

    // If the user email is not available, return bad request
    if (!userEmail) {
      return new NextResponse("User email not found", { status: 400 });
    }

    // Find and delete the user data based on the email
    const deleteResult = await prismadb.user.delete({
      where: {
        email: {
          equals: userEmail,
        } as any,
      },
    });

    // If no data was deleted, return not found
    if (!deleteResult) {
      return new NextResponse("User data not found", { status: 404 });
    }

    // Return success response
    return new NextResponse("User data deleted successfully", {
      status: 200,
    });
  } catch (err) {
    console.error("Error:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
