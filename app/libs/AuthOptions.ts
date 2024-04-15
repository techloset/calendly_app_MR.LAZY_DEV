// import { AuthOptions } from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import prismadb from "./prismadb";
// import bcrypt from "bcrypt";

// export const authOptions: AuthOptions = {
//   providers: [
//     Credentials({
//       name: "credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error("Missing credentials");
//         }

//         const user = await prismadb.user.findFirst({
//           where: {
//             email: credentials.email,
//           },
//         });

//         if (!user || !user.id || !user.hashedPassword) {
//           throw new Error("Invalid credentials");
//         }

//         const correctPassword = await bcrypt.compare(
//           credentials.password,
//           user.hashedPassword
//         );

//         if (!correctPassword) {
//           throw new Error("Invalid credentials");
//         }

//         return user;
//       },
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET || "your-secret-goes-here",
//   session: {
//     strategy: "jwt",
//   },
//   debug: process.env.NODE_ENV !== "production",
// };

// import necessary modules and dependencies
import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prismadb from "./prismadb";
import bcrypt from "bcrypt";

// Define authentication options
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
          // Ensure credentials are provided
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Missing credentials");
          }

          // Find user by email
          const user = await prismadb.user.findFirst({
            where: {
              email: credentials.email,
            },
          });

          // If user not found or password not hashed
          if (!user || !user.id || !user.hashedPassword) {
            throw new Error("Invalid credentials");
          }

          // Compare provided password with hashed password
          const correctPassword = await bcrypt.compare(
            credentials.password,
            user.hashedPassword
          );

          // If passwords don't match
          if (!correctPassword) {
            throw new Error("Invalid credentials");
          }

          // If all checks pass, return the user
          return user;
        } catch (error: any) {
          // Catch and handle errors
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
