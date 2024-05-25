import getDirectoryStructure from "@/app/lib/getDirectoryStructure";
import { NextResponse } from "next/server";
import path from "path";

export async function GET() {
  const directoryPath = path.join(process.cwd(), "app/(routes)/algorithms");
  const directoryStructure = getDirectoryStructure(directoryPath);
  return NextResponse.json(directoryStructure);
}
