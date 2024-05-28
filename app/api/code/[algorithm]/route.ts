import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

async function getAllFiles(dirPath: string): Promise<string[]> {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      files.push(fullPath);
      files.push(...(await getAllFiles(fullPath)));
    } else if (entry.isFile()) {
      files.push(fullPath);
    }
  }

  return files;
}

const getCodeFile = async () =>
  // dirPath: string,
  // filename: string,
  {
    // const entries = await fs.readdir(dirPath, { withFileTypes: true });

    // for (const entry of entries) {
    //   const fullPath = path.join(dirPath, entry.name);

    //   if (entry.isDirectory()) {
    //     const code = await getCodeFile(fullPath, filename);
    //     if (code) return code;
    // } else if (entry.isFile() && entry.name === filename) {
    const result = await getAllFiles("/");

    const temp = path.resolve(process.cwd(), "/api/code/selectionsort.c");
    // return await fs.readFile("./insertionsort.c", "utf8");
    return await result;
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
  const filePath = path.resolve(process.cwd(), "/api/code/"); // Use path.resolve for correct path resolution
  console.log(filePath);
  try {
    // const code = await getCodeFile(filePath, `selectionsort.c`);
    const code = await getCodeFile();
    return NextResponse.json({ code });
    // if (code) {
    //   return NextResponse.json({ code }, { status: 200 });
    // } else {
    //   return NextResponse.json({ error: "File not found" }, { status: 404 });
    // }
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
