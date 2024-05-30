import { NextResponse } from "next/server";

export function GET() {
  return new NextResponse(
    "Hello, this is a test route! Dont try to hack me :p",
  );
}
