// import { PrismaClient } from "@prisma/client";
// import { NextRequest, NextResponse } from "next/server";

// export const PUT = async (req: NextRequest) => {
//   try {
//     const { shortId } = await req.json();
//     console.log("Received shortId:", shortId);

//     const url = await PrismaClient.url.findUnique({
//       where: { shortId },
//     });

//     if (!url) {
//       return NextResponse.json({ message: "URL not found" });
//     }

//     const updatedUrl = await PrismaClient.update({
//       where: { shortId },
//       data: { clickCount: url.clickCount + 1 },
//     });

//     console.log("Updated URL =>", updatedUrl);

//     return NextResponse.json({
//       message: "URL accessed successfully",
//       longUrl: updatedUrl.longUrl,
//       shortId: updatedUrl.shortId,
//       clickCount: updatedUrl.clickCount,
//       id: updatedUrl.id,
//     });
//   } catch (err) {
//     console.error("Error accessing URL:", err);
//     return NextResponse.json({ message: "Something went wrong" });
//   }
// };
