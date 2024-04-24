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
import { getServerSession } from "next-auth";

interface UserData {
  email: string;
  hashedPassword: string;
  fullName: string;
  userName: string;
  image: string;
  welcomeMessage: string;
  language: string;
  dateFormat: string;
  timeFormat: string;
  country: string;
  timeZone: string;
}

export async function POST(req: Request): Promise<Response> {
  try {
    const body = await req.json();

    const {
      email,
      password,
      fullName,
      userName,
      image,
      welcomeMessage,
      language,
      dateFormat,
      timeFormat,
      country,
      timeZone,
    } = body;

    if (
      !email ||
      !password ||
      !fullName ||
      !userName ||
      !image ||
      !welcomeMessage ||
      !language ||
      !dateFormat ||
      !timeFormat ||
      !country ||
      !timeZone
    ) {
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
        image: image,
        welcomeMessage: welcomeMessage,
        language: language,
        timeFormat: timeFormat,
        dateFormat: dateFormat,
        country: country,
        timeZone: timeZone,
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

export async function PUT(req: Request): Promise<Response> {
  try {
    const session = await getServerSession({ req });

    if (!session || !session.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userEmail: string = session.user.email;

    const body = await req.json();
    const {
      fullName,
      image,
      welcomeMessage,
      language,
      dateFormat,
      timeFormat,
      country,
      timeZone,
    } = body;

    if (
      !fullName ||
      !image ||
      !welcomeMessage ||
      !language ||
      !dateFormat ||
      !timeFormat ||
      !country ||
      !timeZone
    ) {
      return new Response("Missing data", { status: 400 });
    }

    const updatedUser = await prismadb.user.update({
      where: {
        email: userEmail,
      },
      data: {
        fullName: fullName,
        image: image,
        welcomeMessage: welcomeMessage,
        language: language,
        dateFormat: dateFormat,
        timeFormat: timeFormat,
        country: country,
        timeZone: timeZone,
      },
    });

    return new Response(JSON.stringify(updatedUser), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.log("UPDATE_ERR: " + err);
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
