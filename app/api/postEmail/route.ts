// pages/api/sendEmail.ts

import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

// Define request body type
interface EmailRequestBody {
  email: string;
  // Add other required fields here
}

// Define response body type
interface EmailResponseBody {
  message: string;
}

export default async function postEmail(
  req: NextApiRequest,
  res: NextApiResponse<EmailResponseBody>
) {
  if (req.method === "POST") {
    try {
      const { email }: EmailRequestBody = req.body;

      // Send email using Nodemailer
      const transporter = nodemailer.createTransport({
        // Configure your email service provider here
        service: "Gmail",
        auth: {
          user: "ranaasadaly@gmail.com",
          pass: "123123123",
        },
      });

      // Define email options
      const mailOptions = {
        from: "ranaasadaly@gmail.com",
        to: email,
        subject: "Subject of the email",
        text: "Content of the email",
      };

      // Send the email
      await transporter.sendMail(mailOptions);

      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to send email" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
