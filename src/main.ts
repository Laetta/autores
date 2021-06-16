import { notifyDiscord } from "./discord";
import { releaseRespack } from "./github/release";
import { pullRepo, initLocalRepo } from "./github/repository";
import { zipRespack, updateServedRespackZip } from "./zip";
import { updateHash } from "./hash";

export async function handleRespackChange(commitMessages: string[]) {
  await pullRepo();
  await zipRespack();
  updateServedRespackZip();
  // await releaseRespack();
  await updateHash();
  // await notifyDiscord(commitMessages);
}

async function start() {
  await initLocalRepo();
  await updateHash();
}
start();
