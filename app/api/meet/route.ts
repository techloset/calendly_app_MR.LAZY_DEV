// // pages/api/scheduleMeeting.ts

// import { NextApiRequest, NextApiResponse } from "next";
// import { google } from "googleapis";
// import axios from "axios";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     // Load Google API credentials from environment variables
//     const googleClientId =
//       "495027279610-kfeo1bacmeepoue5gmpkl8fenj9o6lel.apps.googleusercontent.com";
//     const googleClientSecret = "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";

//     // Initialize Google OAuth2 client
//     const oauth2Client = new google.auth.OAuth2({
//       clientId: googleClientId,
//       clientSecret: googleClientSecret,
//       redirectUri: "http://localhost:3000/api/auth/callback/google",
//     });

//     // Set access token to null initially
//     oauth2Client.setCredentials(null);

//     // Generate URL for user to grant permission
//     const authUrl = oauth2Client.generateAuthUrl({
//       access_type: "offline",
//       scope: [
//         "https://www.googleapis.com/auth/calendar",
//         "https://www.googleapis.com/auth/calendar.events",
//       ],
//     });

//     // Redirect user to Google OAuth consent page
//     res.redirect(authUrl);
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// }
