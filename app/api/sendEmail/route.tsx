// import type { NextApiRequest, NextApiResponse } from "next";
// import nodemailer from "nodemailer";

// interface FormData {
//   name: string;
//   email: string;
//   additionalInfo: string;
// }

// interface EmailMessage {
//   from: string;
//   to: string;
//   subject: string;
//   text: string;
// }

// async function sendEmail(formData: FormData): Promise<void> {
//   const transporter = nodemailer.createTransport({
//     service: "Gmail",
//     auth: {
//       user: "ranaasadaly@gmail.com",
//       pass: "wiki123*WIKI", // Change to your email password
//     },
//   });

//   const message: EmailMessage = {
//     from: "mrlazy28112004@gmail.com", // Change to your email
//     to: "ranaasadaly@gmail.com", // Change to recipient's email
//     subject: "Just Check",
//     text: `
//       Name: ${formData.name}
//       Email: ${formData.email}
//       Additional Info: ${formData.additionalInfo}
//     `,
//   };

//   try {
//     await transporter.sendMail(message);
//     console.log("Email sent successfully");
//   } catch (error) {
//     console.error("Error sending email:", error);
//     throw new Error("Failed to send email");
//   }
// }

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === "POST") {
//     try {
//       const formData: FormData = req.body;
//       await sendEmail(formData);
//       res.status(200).json({ message: "Email sent successfully" });
//     } catch (error) {
//       console.error("Error sending email:", error);
//       res.status(500).json({ error: "Failed to send email" });
//     }
//   } else {
//     res.setHeader("Allow", ["POST"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: any) {
  try {
    const { userName, email, anything } = await request.json();

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: true,
      auth: {
        user: "maddison53@ethereal.email",
        pass: "jn7jnAPss4f63QBp6D",
      },
    });

    const mailOption = {
      from: "ranaasadaly@gmail.com",
      to: "mrlazy28112004@gmail.com",
      cc: "ranaasadaly@gmail.com",
      subject: "Send Email Tutorial",
      html: `
    <h3>Hello Augustine</h3>
    <li> title: ${userName}</li>
    <li> title: ${email}</li>
    <li> message: ${anything}</li> 
    `,
    };

    await transporter.sendMail(mailOption);

    // console.log("Message sent: %s", mailOption.messageId);

    return NextResponse.json(
      { message: "Email Sent Successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to Send Email" },
      { status: 500 }
    );
  }
}
