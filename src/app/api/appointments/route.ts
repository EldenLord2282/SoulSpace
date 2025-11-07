import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET all appointments
export async function GET() {
  try {
    const appointments = await prisma.appointment.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(appointments);
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json({ error: "Failed to fetch appointments" }, { status: 500 });
  }
}

// POST new appointment
export async function POST(req: Request) {
  try {
    const data = await req.json();

    const newAppointment = await prisma.appointment.create({
      data: {
        studentName: data.name,
        email: data.email,
        date: new Date(data.date),
        time: data.time,
        concern: data.concern || "",
      },
    });

    return NextResponse.json(newAppointment);
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json({ error: "Failed to create appointment" }, { status: 500 });
  }
}
