import { pullRepo } from "./repository";
import { zipRespack } from "./zip";

export async function handleRespackChange() {
  await pullRepo();
  await zipRespack();
}
