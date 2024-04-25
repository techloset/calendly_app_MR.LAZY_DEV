// import { NextRequest, NextResponse } from "next/server";
// import prismadb from "../../libs/prismadb";
// import { getServerSession } from "next-auth";

// interface AvailabilityData {
//   selectedDays: string[];
//   selectedHour1: string;
//   selectedHour2: string;
//   email: string;
// }

// export async function PUT(req: Request): Promise<Response> {
//   try {
//     const session = await getServerSession({ req });

//     if (!session || !session.user?.email) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     const userEmail: string = session.user.email;

//     const body = await req.json();
//     const { selectedDays, selectedHour1, selectedHour2, email } = body;

//     if (!selectedDays || !selectedHour1 || !selectedHour2 || !email) {
//       return new NextResponse("Missing data", { status: 400 });
//     }

//     const updatedUser = await prismadb.availability.update({
//       where: {
//         email: userEmail, // Assuming email is the unique identifier
//       },
//       data: {
//         selectedDays,
//         selectedHour1,
//         selectedHour2,
//       },
//     });

//     return new Response(JSON.stringify(updatedUser), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (err: any) {
//     console.log("UPDATE_ERR: " + err);
//     return new Response("Internal Server Error", { status: 500 });
//   }
// }
