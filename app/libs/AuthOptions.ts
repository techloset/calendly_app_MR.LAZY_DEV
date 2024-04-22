import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prismadb from "./prismadb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Define the User interface to represent your user data
interface User {
  id: string;
  email: string;
  fullName: string;
  userName: string;
  image: string;
  welcomeMessage: string;
  language: string;
  timeFormat: string;
  dateFormat: string;
  country: string;
  timeZone: string;
}

// Define the JWT token type
interface JWT {
  name: string;
  id: string;
}

const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<"email" | "password", string> | undefined,
        req: any // Adjust the type of req as per your application's requirements
      ) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Missing credentials");
          }

          const user = await prismadb.user.findFirst({
            where: {
              email: credentials.email,
            },
          });

          if (!user || !user.id || !user.hashedPassword) {
            throw new Error("Invalid credentials");
          }

          const userData: User = {
            id: user.id,
            email: user.email,
            fullName: user.fullName,
            userName: user.userName,
            image: user.image || "Empty",
            welcomeMessage: user.welcomeMessage || "Empty",
            language: user.language || "Empty",
            timeFormat: user.timeFormat || "Empty",
            dateFormat: user.dateFormat || "Empty",
            country: user.country || "Empty",
            timeZone: user.timeZone || "Empty",
          };

          // Generate JWT token with user data
          const token: User = {
            fullName: userData.fullName,
            email: userData.email,
            id: userData.id,
            country: userData.country,
            dateFormat: userData.dateFormat,
            image: userData.image,
            language: userData.language,
            timeFormat: userData.timeFormat,
            timeZone: userData.timeZone,
            userName: userData.userName,
            welcomeMessage: userData.welcomeMessage,
          };

          return token;
        } catch (error: any) {
          console.error("Authentication failed:", error.message);
          throw new Error("Authentication failed");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.name = user.name;
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (token && token.fullName && token.email) {
        session.user = {
          ...session.user,
          name: token.fullName,
          email: token.email,
          id: token.id,
          country: token.country,
          dateFormat: token.dateFormat,
          image: token.image as string | null | undefined,
          language: token.language,
          timeFormat: token.timeFormat,
          timeZone: token.timeZone,
          userName: token.userName,
          welcomeMessage: token.welcomeMessage,
        } as any;
      }
      return session;
    },
  },
};

export default authOptions;
