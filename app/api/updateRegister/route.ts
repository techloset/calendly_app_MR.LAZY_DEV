// // Import necessary modules
// import { NextApiRequest, NextApiResponse } from "next";
// import prismadb from "../../libs/prismadb";
// import { getSession } from "next-auth/react";

// // Define interface for the expected data structure in the request body
// interface UpdateUserData {
//   fullName?: string;
//   userName?: string;
//   image?: string;
//   welcomeMessage?: string;
//   language?: string;
//   dateFormat?: string;
//   timeFormat?: string;
//   country?: string;
//   timeZone?: string;
// }

// // Define the handler function for the update endpoint
// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     // Ensure the request method is PUT
//     if (req.method !== "PUT") {
//       return res.status(405).json({ error: "Method Not Allowed" });
//     }

//     // Extract the user ID from the request parameters
//     const { id } = req.query;

//     // Retrieve the updated data from the request body
//     const updatedUserData: UpdateUserData = req.body;

//     // Check if the user ID is provided
//     if (!id || typeof id !== "string") {
//       return res.status(400).json({ error: "User ID is required" });
//     }

//     // Update the user's data in the database
//     const updatedUser = await prismadb.user.update({
//       where: { id: parseInt(id) },
//       data: updatedUserData,
//     });

//     // Return the updated user data
//     return res.status(200).json(updatedUser);
//   } catch (error) {
//     // If an error occurs, log it and return a 500 Internal Server Error response
//     console.error("Error updating user:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// }
