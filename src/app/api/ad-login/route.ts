import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const username = (body.username ?? "").toString().trim();
  const password = (body.password ?? "").toString().trim();

  if (username === "admin" && password === "123") {
    return NextResponse.json(
      { success: true, message: "Admin login successful" },
      { status: 200 }
    );
  }

  return NextResponse.json(
    { success: false, message: "Invalid admin credentials" },
    { status: 401 }
  );
}
