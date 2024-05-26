import { NextResponse } from "next/server";

export function GET() {
  return new NextResponse("Hello, Next.js!");
}
