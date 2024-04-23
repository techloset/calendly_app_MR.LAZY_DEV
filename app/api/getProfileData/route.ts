// getData.ts
import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../libs/prismadb";
import { getSession } from "next-auth/react";

export async function getData(req: NextRequest): Promise<NextResponse> {
  try {
    const session = await getSession({ req } as any);

    console.log("djfkdjfkdjfjdfjdkfjdkfjkdjf", session?.user.email);

    if (!session || !session.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const data = await prismadb.user.findFirst({
      where: {
        email: session.user.email,
      },
    });

    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
