// import { AuthOptions } from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import prismadb from "./prismadb";
// import bcrypt from "bcrypt";

// interface User {
//   id: string;
//   email: string;
//   fullName: string;
//   userName: string;
//   image: string;
//   welcomeMessage: string;
//   language: string;
//   timeFormat: string;
//   dateFormat: string;
//   country: string;
//   timeZone: string;
// }

// interface JWT {
//   name: string;
//   id: string;
// }

// const authOptions: AuthOptions = {
//   session: {
//     strategy: "jwt",
//   },
//   providers: [
//     Credentials({
//       name: "credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(
//         credentials: Record<"email" | "password", string> | undefined
//       ) {
//         try {
//           if (!credentials?.email || !credentials?.password) {
//             throw new Error("Missing credentials");
//           }

//           const user = await prismadb.user.findFirst({
//             where: {
//               email: credentials.email,
//             },
//           });

//           if (!user || !user.id || !user.hashedPassword) {
//             throw new Error("Invalid credentials");
//           }

//           const userData: User = {
//             id: user.id,
//             email: user.email,
//             fullName: user.fullName,
//             userName: user.userName,
//             image: user.image || "Empty",
//             welcomeMessage: user.welcomeMessage || "Empty",
//             language: user.language || "Empty",
//             timeFormat: user.timeFormat || "Empty",
//             dateFormat: user.dateFormat || "Empty",
//             country: user.country || "Empty",
//             timeZone: user.timeZone || "Empty",
//           };

//           const token: JWT = {
//             name: userData.fullName,
//             id: userData.id,
//           };

//           return token;
//         } catch (error: any) {
//           console.error("Authentication failed:", error.message);
//           throw new Error("Authentication failed");
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.name = user.name;
//         token.id = user.id;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token && token.fullName && token.email) {
//         session.user = {
//           ...session.user,
//           name: token.fullName,
//           email: token.email,
//           id: token.id,
//           country: token.country,
//           dateFormat: token.dateFormat,
//           image: token.image as string | null | undefined,
//           language: token.language,
//           timeFormat: token.timeFormat,
//           timeZone: token.timeZone,
//           userName: token.userName,
//           welcomeMessage: token.welcomeMessage,
//         } as any;
//       }
//       return session;
//     },
//   },
// };

// export default authOptions;

import { AuthOptions, User } from "next-auth";
import prismadb from "./prismadb";
import bcrypt from "bcrypt";
import Credentials from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
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

          const correctPassword = await bcrypt.compare(
            credentials.password,
            user.hashedPassword
          );

          if (!correctPassword) {
            throw new Error("Invalid credentials");
          }

          return user as any;
        } catch (error: any) {
          throw new Error("Authentication failed: " + error.message);
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "your-secret-goes-here",
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV !== "production",
};

export default authOptions;
