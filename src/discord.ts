import { MessageBuilder, Webhook } from "webhook-discord";
import { secrets } from "./config";
import { getSha1 } from "./hash";

const Hook = new Webhook(secrets.DiscordToken);

export async function notifyDiscord() {
  try {
    const msg = new MessageBuilder()
      .setName("Respack")
      .setTitle("Resurssipaketti päivitetty!")
      .setDescription("Muutoksia: \n -ei mitään\n -ei siis yhtään mitään")
      .setColor("#FFAA00")
      .setText("" + getSha1());
    await Hook.send(msg);
  } catch (error) {
    console.log("EIII");
  }
}
