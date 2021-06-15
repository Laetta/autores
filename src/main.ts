import { notifyDiscord } from "./discord";
import { releaseRespack } from "./release";
import { pullRepo } from "./repository";
import { zipRespack } from "./zip";
import { updateHash } from "./hash";

// releaseRespack();
// updateSha1().then(notifyDiscord);
export async function handleRespackChange(commitMessages: string[]) {
  await pullRepo();
  await zipRespack();
  await releaseRespack();
  await updateHash();
  await notifyDiscord(commitMessages);
}

zipRespack().then(updateHash);
