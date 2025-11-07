import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail", // you can use SMTP instead
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendEmail(to: string, subject: string, html: string) {
  await transporter.sendMail({
    from: `"SoulSpace Counsellor" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
}
