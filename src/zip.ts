import * as fs from "fs";
import { readFile } from "fs";
import glob from "glob";
import JSZip from "jszip";
import * as path from "path";

export const respackZipPath = path.join(process.cwd(), "./release.zip");

let respackFileBuffer = fs.readFileSync(respackZipPath);
function updateServedRespackZip() {
  respackFileBuffer = fs.readFileSync(respackZipPath);
}
export function getRespackFileBuffer() {
  return respackFileBuffer;
}

async function addToZip(filePath: string, zip: JSZip) {
  return new Promise<void>((resolve) => {
    fs.stat(filePath, async function (err, fileStat) {
      if (err) console.log(err);
      if (fileStat.isFile()) {
        readFile(filePath, (err, content) => {
          if (err) console.log(err);
          const relativePath = filePath.substr(5);
          //   console.log("Adding file ", relativePath);
          zip.file(relativePath, content);
          resolve();
        });
      } else if (fileStat.isDirectory()) {
        const relativePath = filePath.substr(5);
        // console.log("Adding folder ", relativePath);
        zip.folder(relativePath);
        resolve();
      }
    });
  });
}

export async function zipRespack() {
  return new Promise<void>((resolve) => {
    getDirectories(async (err, filePaths) => {
      if (err) console.log(err);
      const zip = new JSZip();
      const jobs = filePaths.map((filePath) => {
        return addToZip(filePath, zip);
      });
      await Promise.all(jobs);
      console.log(filePaths.length + " files added to zip");

      const content = await zip.generateAsync({ type: "nodebuffer" });
      fs.writeFileSync(respackZipPath, content);
      const sizeMb = content.byteLength / 1000 / 1000;
      console.log(`Zip (${sizeMb.toFixed(2)}Mb) saved!`);
      resolve();
    });
  });
  updateServedRespackZip();
}

type GlobCallBack = Parameters<typeof glob>[2];
const getDirectories = function (callback: GlobCallBack) {
  glob("repo" + "/**/*", callback);
};
