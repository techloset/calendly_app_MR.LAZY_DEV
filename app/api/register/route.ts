// import { NextApiRequest, NextApiResponse } from "next";
// import prismadb from "../../libs/prismadb";
// import bcrypt from "bcrypt";
// import { Prisma } from "@prisma/client";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     if (req.method !== "POST") {
//       return res.status(405).json({ error: "Method Not Allowed" });
//     }

//     const { email, fullName, userName, password } = req.body;

//     if (!email || !fullName || !userName || !password) {
//       return res.status(400).json({ error: "Missing data" });
//     }

//     const userAlreadyExist = await prismadb.user.findFirst({
//       where: { email },
//     });

//     if (userAlreadyExist) {
//       return res.status(400).json({ error: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 12);

//     const userData: Prisma.UserCreateInput = {
//       email,
//       fullName,
//       userName,
//       password: hashedPassword,
//     } as any;

//     const newUser = await prismadb.user.create({
//       data: userData,
//     });

//     return res.status(200).json(newUser);
//   } catch (err) {
//     console.error("REGISTER_ERR:", err);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// }

// import { NextApiRequest, NextApiResponse } from "next";
// import prismadb from "../../libs/prismadb";
// import bcrypt from "bcrypt";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     if (req.method !== "POST") {
//       return res.status(405).json({ error: "Method Not Allowed" });
//     }

//     const { email, name, userName, password } = req.body;

//     if (!email || !name || !userName || !password) {
//       return res.status(400).json({ error: "Missing data" });
//     }

//     const userAlreadyExist = await prismadb.user.findFirst({
//       where: { email },
//     });

//     if (userAlreadyExist) {
//       return res.status(400).json({ error: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 12);

//     const newUser = await prismadb.user.create({
//       data: {
//         email,
//         name,
//         userName,
//         password: hashedPassword,
//       } as any,
//     });

//     return res.status(200).json(newUser);
//   } catch (err: any) {
//     console.error("REGISTER_ERR:", err);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// }

import { NextResponse } from "next/server";
import prismadb from "../../libs/prismadb";
import bcrypt from "bcrypt";

interface UserData {
  email: string;
  hashedPassword: string;
  fullName: string;
  userName: string;
}

export async function POST(req: Request): Promise<Response> {
  try {
    const body = await req.json();

    const { email, password, fullName, userName } = body;

    if (!email || !password || !fullName || !userName) {
      return new Response("Missing data", { status: 400 });
    }

    const userAlreadyExist = await prismadb.user.findFirst({
      where: {
        email: email,
      },
    });

    if (userAlreadyExist) {
      return new Response("User already exists", { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await prismadb.user.create({
      data: {
        email: email,
        hashedPassword: hashedPassword,
        fullName: fullName,
        userName: userName,
      },
    } as { data: UserData });

    return new Response(JSON.stringify(newUser), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.log("REGISTER_ERR: " + err);
    return new Response("Internal Server Error", { status: 500 });
  }
}

// import { NextApiRequest, NextApiResponse } from "next";
// import prismadb from "../../libs/prismadb";
// import bcrypt from "bcrypt";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     if (req.method !== "POST") {
//       return res.status(405).json({ error: "Method Not Allowed" });
//     }

//     const { email, name, userName, password } = req.body;

//     if (!email || !name || !userName || !password) {
//       return res.status(400).json({ error: "Missing data" });
//     }

//     const userAlreadyExist = await prismadb.user.findFirst({
//       where: { email },
//     });

//     if (userAlreadyExist) {
//       return res.status(400).json({ error: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 12);

//     const newUser = await prismadb.user.create({
//       data: {
//         email,
//         name,
//         userName,
//         password: hashedPassword,
//       } as any,
//     });

//     return res.status(200).json(newUser);
//   } catch (err: any) {
//     console.error("REGISTER_ERR:", err);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// }
