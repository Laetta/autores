import createHandler from "github-webhook-handler";
import http from "http";
import { handleRespackChange } from "./main";

const handler = createHandler({ path: "/", secret: "myhashsecret44" });

http
  .createServer(function (req, res) {
    handler(req, res, function (err) {
      res.statusCode = 404;
      res.end("no such location");
    });
  })
  .listen(5000);

handler.on("error", function (err) {
  console.error("Error:", err.message);
});

handler.on("push", async function (event) {
  const commits = event.payload.commits;

  console.log(
    "Received a push event for %s to %s",
    event.payload.repository.name,
    event.payload.ref,
    { commits }
  );

  handleRespackChange();
});
