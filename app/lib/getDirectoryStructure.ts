import fs from "fs";
import path from "path";

interface DirectoryNode {
  type: "directory";
  name: string;
  path: string;
  children: DirectoryStructure;
}

interface FileNode {
  type: "file";
  name: string;
  path: string;
}

type DirectoryStructure = (DirectoryNode | FileNode)[];

const EXCLUDED_FILES = ["page.tsx", "layout.tsx"]; // Add any other files you want to exclude

function getDirectoryStructure(
  dir: string,
  baseDir: string = dir,
): DirectoryStructure {
  const result: DirectoryStructure = [];
  const items = fs.readdirSync(dir);

  items.forEach((item) => {
    if (EXCLUDED_FILES.includes(item)) {
      return;
    }

    const fullPath = path.join(dir, item);
    const relativePath = path.relative(baseDir, fullPath);
    const isDirectory = fs.statSync(fullPath).isDirectory();

    if (isDirectory) {
      result.push({
        type: "directory",
        name: item,
        path: relativePath,
        children: getDirectoryStructure(fullPath, baseDir),
      });
    } else {
      result.push({
        type: "file",
        name: item,
        path: relativePath,
      });
    }
  });

  return result;
}

export default getDirectoryStructure;
export type { DirectoryStructure, DirectoryNode, FileNode };
