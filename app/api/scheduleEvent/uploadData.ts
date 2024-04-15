// pages/api/uploadData.ts

import { NextApiRequest, NextApiResponse } from "next";
import uploadData from "../../utils/uploadData";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === "POST") {
    try {
      const data = req.body;
      await uploadData(data);
      res.status(200).json({ message: "Data uploaded successfully" });
    } catch (error) {
      console.error("Error uploading data:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
