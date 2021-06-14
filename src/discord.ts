import { MessageBuilder, Webhook } from "webhook-discord";
import { secrets } from "./config";

const Hook = new Webhook(secrets.DiscordToken);

export async function notifyDiscord(commitMessages: string[]) {
  let description = "Muutoksia: ";
  commitMessages.forEach((commitMsg) => (description += "\n - " + commitMsg));

  try {
    const msg = new MessageBuilder()
      .setName("Respack")
      .setTitle("Resurssipaketti päivitetty!")
      .setDescription(description)
      .setColor("#FFAA00");
    await Hook.send(msg);
  } catch (error) {
    console.log("EIII");
  }
}
