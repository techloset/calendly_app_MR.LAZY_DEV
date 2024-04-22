import { NextResponse } from "next/server";
import prismadb from "../../libs/prismadb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; // For generating JWT tokens

interface LoginData {
  email: string;
  password: string;
}

export async function POST(req: Request): Promise<Response> {
  try {
    const body = await req.json();

    const { email, password } = body as LoginData;

    if (!email || !password) {
      return new Response("Missing data", { status: 400 });
    }

    const user = await prismadb.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    const passwordMatch = await bcrypt.compare(password, user.hashedPassword);

    if (!passwordMatch) {
      return new Response("Invalid credentials", { status: 401 });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    return new Response(JSON.stringify({ token }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.log("LOGIN_ERR: " + err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
