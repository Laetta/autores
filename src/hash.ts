import { respackZipPath } from "./zip";
import hasha from "hasha";

let hash: string | undefined;

export function getHash() {
  return hash;
}

export async function updateHash() {
  hash = await hasha.fromFile(respackZipPath, { algorithm: "sha1" });
}
