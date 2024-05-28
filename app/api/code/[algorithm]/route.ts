import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const getCodeFile = async () // dirPath: string,
// filename: string,
: Promise<string | null> => {
  // const entries = await fs.readdir(dirPath, { withFileTypes: true });

  // for (const entry of entries) {
  //   const fullPath = path.join(dirPath, entry.name);

  //   if (entry.isDirectory()) {
  //     const code = await getCodeFile(fullPath, filename);
  //     if (code) return code;
  // } else if (entry.isFile() && entry.name === filename) {
  const temp = path.resolve(process.cwd(), "/app/api/code/selectionsort.c");
  return await fs.readFile(temp, "utf8");
  // }
  // }

  return null;
};
export async function GET(req: Request) {
  const url = new URL(req.url);
  const algorithm = url.pathname.split("/").pop();
  console.log(algorithm);
  if (!algorithm) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  console.log(process.cwd());
  const filePath = path.resolve(process.cwd(), "/app/api/code/"); // Use path.resolve for correct path resolution
  console.log(filePath);
  try {
    // const code = await getCodeFile(filePath, `selectionsort.c`);
    const code = await getCodeFile();
    if (code) {
      return NextResponse.json({ code }, { status: 200 });
    } else {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
