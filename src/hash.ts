import download from "download";
import hasha from "hasha";
import path from "path";
import { wait } from "./helpers";
import { respackZipPath } from "./zip";

let hash: string | undefined;
// export const releasePath = path.join(process.cwd(), "./downloaded/release.zip");

// const RELEASE_URL =
//   "https://github.com/Laetta/respack/releases/download/latest/release.zip";

export function getHash() {
  return hash;
}

export async function updateHash() {
  console.log("Hashing!");
  console.log({ respackZipPath });
  hash = await hasha.fromFile(respackZipPath, { algorithm: "sha1" });
  console.log({ hash });
}

// export async function downloadRelease() {
//   await wait(400);
//   console.log("Downloading the release zip from GitHub");
//   await download(RELEASE_URL, "downloaded");
//   console.log("Downloaded");
// }
