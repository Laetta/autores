import { notifyDiscord } from "./discord";
import { updateSha1 } from "./hash";
import { releaseRespack } from "./release";
import { pullRepo } from "./repository";
import { zipRespack } from "./zip";

// releaseRespack();
// updateSha1().then(notifyDiscord);
export async function handleRespackChange(commitMessages: string[]) {
  await pullRepo();
  await zipRespack();
  await releaseRespack();
  await updateSha1();
  await notifyDiscord(commitMessages);
}
