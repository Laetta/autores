import download from "download";
import hasha from "hasha";
import path from "path";

let hash: string | undefined;
export const releasePath = path.join(process.cwd(), "./downloaded/release.zip");

const RELEASE_URL =
  "https://github.com/Laetta/respack/releases/download/latest/release.zip";

export function getHash() {
  return hash;
}

export async function updateHash() {
  console.log("Hashing!");
  console.log({ releasePath });
  hash = await hasha.fromFile(releasePath, { algorithm: "sha1" });
  console.log({ hash });
}

export async function downloadRelease() {
  console.log("Downloading the release zip from GitHub");
  await download(RELEASE_URL, "downloaded");
}
