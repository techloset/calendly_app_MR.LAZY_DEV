// createEvent.ts

import { calendar } from "./googleAuth";
import { calendar_v3 } from "googleapis";

export const createEvent = async (
  title: string,
  startTime: string,
  endTime: string
) => {
  try {
    const event: calendar_v3.Params$Resource$Events$Insert = {
      calendarId: "primary",
      requestBody: {
        summary: title,
        start: {
          dateTime: startTime,
          timeZone: "11:00 am",
        },
        end: {
          dateTime: endTime,
          timeZone: "12:00 pm",
        },
        conferenceData: {
          createRequest: {
            requestId: "1234567890qwertyuiop",
          },
        },
      },
      conferenceDataVersion: 1,
    };

    // Insert event into Google Calendar
    const res = await calendar.events.insert(event);

    // Get the Google Meet link from the response
    const meetLink = res.data.hangoutLink;
    return meetLink;
  } catch (error) {
    console.error("Error creating event:", error);
    throw new Error("Failed to create event");
  }
};
