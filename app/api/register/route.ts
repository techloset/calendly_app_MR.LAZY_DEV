import prismadb from "../../libs/prismadb";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
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
    } as { data: UserDataSignUp });

    return new Response(JSON.stringify(newUser), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.log("REGISTER_ERR: " + err);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = (await getServerSession(req as any)) as MySession;

    if (!session || !session.user?.email) {
      return new Response("Unauthorized", { status: 401 });
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

import { IncomingMessage } from "http";
import { MySession, UserDataSignUp } from "@/app/constants/types";

export async function GET(req: Request) {
  try {
    const session = (await getServerSession(req as any)) as MySession;

    console.log("session", session);

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const userEmail = session.user?.email;

    if (!userEmail) {
      return new Response("User email not found", { status: 400 });
    }

    const userData = await prismadb.user.findFirst({
      where: {
        email: {
          equals: userEmail,
        },
      },
    });

    if (!userData) {
      return new Response("User data not found", { status: 404 });
    }

    return new Response(JSON.stringify(userData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(req: IncomingMessage) {
  try {
    const session = (await getServerSession(req as any)) as MySession;

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const userEmail = session.user?.email;

    if (!userEmail) {
      return new Response("User email not found", { status: 400 });
    }

    const deleteResult = await prismadb.user.delete({
      where: {
        email: userEmail,
      },
    });

    if (!deleteResult) {
      return new Response("User data not found", { status: 404 });
    }

    return new Response("User data deleted successfully", {
      status: 200,
    });
  } catch (err) {
    console.error("Error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
