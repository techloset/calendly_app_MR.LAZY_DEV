// googleAuth.ts

import { google } from "googleapis";

// Set up OAuth2 client
const auth = new google.auth.OAuth2({
  clientId:
    "495027279610-kfeo1bacmeepoue5gmpkl8fenj9o6lel.apps.googleusercontent.com",
  clientSecret: "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",
  redirectUri: "http://localhost:3000/api/auth/callback/google",
});

// Generate authentication URL
export const getAuthUrl = () => {
  const scopes = ["https://www.googleapis.com/auth/calendar.events"];
  return auth.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });
};

export const getToken = async (code: string) => {
  const { tokens } = await auth.getToken(code);
  return tokens;
};

export const setAccessToken = (accessToken: string) => {
  auth.setCredentials({ access_token: accessToken });
};

export const calendar = google.calendar({ version: "v3", auth });
