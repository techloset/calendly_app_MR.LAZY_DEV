// import { NextApiRequest, NextApiResponse } from "next";
// import { google } from "googleapis";

// // Define types for credentials
// interface Credentials {
//   client_email: string;
//   private_key: string;
// }

// // Define type for event
// interface Event {
//   summary: string;
//   description: string;
//   start: {
//     dateTime: string;
//     timeZone: string;
//   };
//   end: {
//     dateTime: string;
//     timeZone: string;
//   };
// }

// const CREDENTIALS: Credentials = JSON.parse(
//   process.env.NEXT_PUBLIC_CREDENTIALS || ""
// );
// const CALENDAR_ID: string = process.env.NEXT_PUBLIC_CALENDAR_ID || "";

// const SCOPES: string = "https://www.googleapis.com/auth/calendar";
// const TIMEOFFSET: string = "+05:30";

// const calendar = google.calendar({ version: "v3" });

// const auth = new google.auth.JWT(
//   CREDENTIALS.client_email,
//   CREDENTIALS.private_key,
//   SCOPES
// );

// const dateTimeForCalendar = (): { start: Date; end: Date } => {
//   let date = new Date();
//   let year = date.getFullYear();
//   let month = (date.getMonth() + 1).toString().padStart(2, "0"); // Ensure month is always 2 digits
//   let day = date.getDate().toString().padStart(2, "0"); // Ensure day is always 2 digits
//   let hour = date.getHours().toString().padStart(2, "0"); // Ensure hour is always 2 digits
//   let minute = date.getMinutes().toString().padStart(2, "0"); // Ensure minute is always 2 digits
//   let newDateTime = `${year}-${month}-${day}T${hour}:${minute}:00.000${TIMEOFFSET}`;
//   let event = new Date(newDateTime);
//   let startDate = event;
//   let endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // Add 1 hour to start time
//   return {
//     start: startDate,
//     end: endDate,
//   };
// };

// const insertEvent = async (event: Event): Promise<boolean> => {
//   try {
//     let response = await calendar.events.insert({
//       auth: auth,
//       calendarId: CALENDAR_ID,
//       resource: event,
//     });
//     return response.status === 200 && response.statusText === "OK";
//   } catch (error) {
//     console.error(`Error at insertEvent --> ${error}`);
//     return false;
//   }
// };

// export default async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method === "POST") {
//     try {
//       const { summary, description }: { summary: string; description: string } =
//         req.body;
//       const dateTime = dateTimeForCalendar();
//       const event: Event = {
//         summary: summary,
//         description: description,
//         start: {
//           dateTime: dateTime.start.toISOString(),
//           timeZone: "Asia/Kolkata",
//         },
//         end: {
//           dateTime: dateTime.end.toISOString(),
//           timeZone: "Asia/Kolkata",
//         },
//       };
//       const result: boolean = await insertEvent(event);
//       if (result) {
//         res
//           .status(200)
//           .json({ success: true, message: "Event added successfully." });
//       } else {
//         res
//           .status(500)
//           .json({ success: false, message: "Failed to add event." });
//       }
//     } catch (error) {
//       console.error(`Error at POST /api/calendar --> ${error}`);
//       res
//         .status(500)
//         .json({ success: false, message: "Internal server error." });
//     }
//   } else {
//     res.status(405).json({ success: false, message: "Method not allowed." });
//   }
// };
