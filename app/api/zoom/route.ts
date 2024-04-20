import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await postZoomMeeting(req, res);
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export async function postZoomMeeting(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Fetch user and doctor details from request body
    const { userId, doctorId } = req.body;

    // Check if userId and doctorId are present
    if (!userId || !doctorId) {
      return res
        .status(400)
        .json({ error: "userId and doctorId are required" });
    }

    // Zoom API credentials
    const apiKey = process.env.ZOOM_API_KEY;
    const apiSecret = process.env.ZOOM_API_SECRET;

    // Encode API Key and API Secret for Basic Authentication
    const base64EncodedCredentials = Buffer.from(
      `${apiKey}:${apiSecret}`
    ).toString("base64");

    // Make API call to Zoom to create a meeting
    const zoomApiResponse = await axios.post(
      "https://api.zoom.us/v2/users/me/meetings",
      {
        topic: "Appointment with Doctor",
        type: 1,
        duration: 60,
        settings: {
          host_video: true,
          participant_video: true,
        },
      },
      {
        headers: {
          Authorization: `Basic ${base64EncodedCredentials}`,
        },
      }
    );

    // Extract meeting link from Zoom API response
    const { join_url: meetingLink } = zoomApiResponse.data;

    // Return meeting link as response
    return res.status(200).json({ meetingLink });
  } catch (error) {
    console.error("Error generating Zoom link:", error);
    return res.status(500).json({ error: "Failed to generate Zoom link" });
  }
}
