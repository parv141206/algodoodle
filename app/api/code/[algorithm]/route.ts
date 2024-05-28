import { NextResponse } from "next/server";
import path from "path";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const algorithm = url.pathname.split("/").pop();
  console.log(algorithm);
  if (!algorithm) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const filePath = path.join("/code", `${algorithm}.c`); // Adjusted to match your project structure
  console.log(filePath);
  try {
    // Return the URL to the client
    return NextResponse.redirect(filePath, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
