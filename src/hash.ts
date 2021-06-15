import { respackZipPath } from "./zip";
import hasha from "hasha";

let hash: string | undefined;

export function getHash() {
  return hash;
}

export async function updateHash() {
  console.log("Hashing!");
  console.log({ respackZipPath });
  hash = await hasha.fromFile(respackZipPath, { algorithm: "sha1" });
  console.log({ hash });
}
