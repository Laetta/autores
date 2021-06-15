import { notifyDiscord } from "./discord";
import { releaseRespack } from "./release";
import { pullRepo, initLocalRepo } from "./repository";
import { zipRespack } from "./zip";
import { updateHash } from "./hash";

export async function handleRespackChange(commitMessages: string[]) {
  await pullRepo();
  await zipRespack();
  await releaseRespack();
  await updateHash();
  await notifyDiscord(commitMessages);
}

async function start() {
  await initLocalRepo();
  await updateHash();
}
start();
