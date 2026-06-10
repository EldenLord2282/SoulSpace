import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

/**
 * ✅ Update appointment status (Accept/Reject)
 */
export async function PUT(
  req: Request,
  // `params` is provided as a Promise in Next's RouteContext, so type as such
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const data = await req.json();
    const { id } = await params;
    const updatedAppointment = await prisma.appointment.update({
      where: { id: Number(id) },
      data: { status: data.status },
    });

    return NextResponse.json(updatedAppointment);
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json(
      { error: "Failed to update appointment" },
      { status: 500 }
    );
  }
}

/**
 * ✅ Fetch a single appointment by ID
 */
export async function GET(
  _req: Request,
  // `params` is a Promise per Next's generated RouteContext
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const appointment = await prisma.appointment.findUnique({
      where: { id: Number(id) },
    });

    if (!appointment) {
      return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
    }

    return NextResponse.json(appointment);
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch appointment" },
      { status: 500 }
    );
  }
}
