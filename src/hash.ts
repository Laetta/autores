import sha1File from "sha1-file";
import { respackZipPath } from "./zip";

let sha1: string | undefined;

export function getSha1() {
  return sha1;
}

export async function updateSha1() {
  sha1 = await sha1File(respackZipPath);
}
updateSha1();
