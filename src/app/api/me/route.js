import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  console.log("TOKEN:", token);

  if (!token) {
    return NextResponse.json({ reason: "NO_TOKEN" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    return NextResponse.json({ user: decoded });
  } catch (err) {
    console.log("JWT ERROR:", err.message);
    return NextResponse.json({ reason: "INVALID_TOKEN" }, { status: 401 });
  }
}
