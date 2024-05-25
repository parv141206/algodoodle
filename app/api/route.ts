// Suggested code may be subject to a license. Learn more: ~LicenseLog:2400258216.
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export function GET(req: NextApiRequest, res: NextApiResponse) {
  return new NextResponse("Hello World");
}
