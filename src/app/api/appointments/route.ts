import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

// ✅ GET — fetch all appointments
export async function GET() {
  try {
    const appointments = await prisma.appointment.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(appointments);
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch appointments" },
      { status: 500 }
    );
  }
}

// Reusable transporter
function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false, // fixes "unable to verify first certificate"
    },
  });
}

// Helper function to send email
async function sendConfirmationEmail(
  email: string,
  name: string,
  date: string,
  time: string
) {
  try {
    const transporter = createTransporter();

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <h2 style="color: #4A90D9;">Your SoulSpace appointment is scheduled</h2>
        <p>Hi <strong>${name}</strong>,</p>
        <p>We have received your appointment request and a counselor will be in touch with you shortly.</p>
        <div style="background-color: #f7f7f7; padding: 16px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #4A90D9;">
          <p style="margin: 0 0 8px;"><strong>Date:</strong> ${date}</p>
          <p style="margin: 0;"><strong>Time:</strong> ${time}</p>
        </div>
        <p>If you need to reschedule or have any questions, please reach out to us.</p>
        <p>Take care,<br/><strong>SoulSpace Team</strong></p>
      </div>
    `;

    // Plain text fallback — important for spam filters
    const textContent = `Hi ${name},\n\nWe have received your appointment request.\n\nDate: ${date}\nTime: ${time}\n\nA counselor will be in touch with you shortly.\n\nTake care,\nSoulSpace Team`;

    const info = await transporter.sendMail({
      from: `"SoulSpace" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Your SoulSpace appointment is scheduled",
      text: textContent,
      html: htmlContent,
    });

    console.log("✅ Email sent to:", email);
    console.log("✅ Accepted:", info.accepted);

    if (info.rejected.length > 0) {
      console.warn("⚠️ Rejected addresses:", info.rejected);
    }
  } catch (error) {
    // Log the real error but don't fail the request — appointment is already saved
    console.error("❌ Email sending failed:", error);
  }
}

// ✅ POST — create new appointment
export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!data.name || !data.email || !data.date || !data.time) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newAppointment = await prisma.appointment.create({
      data: {
        studentName: data.name,
        email: data.email,
        date: new Date(data.date),
        time: data.time,
        concern: data.concern || "",
        status: "pending",
      },
    });

    console.log("✅ Appointment created:", newAppointment);

    // Send confirmation email (non-blocking — won't fail the request if email fails)
    await sendConfirmationEmail(data.email, data.name, data.date, data.time);

    return NextResponse.json(
      { success: true, appointment: newAppointment },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST /appointments error:", error);
    return NextResponse.json(
      {
        error: "Failed to create appointment",
        details: error.message,
        code: error.code,
      },
      { status: 500 }
    );
  }
}