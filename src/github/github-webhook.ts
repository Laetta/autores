import createHandler from "github-webhook-handler";
import http from "http";
import { handleRespackChange } from "../main";

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
  const commits = event.payload.commits as any[];
  const commitMessages = commits.map((commit) => commit.message as string);

  console.log(
    "Received a push event for %s to %s",
    event.payload.repository.name,
    event.payload.ref,
    { commits }
  );

  handleRespackChange(commitMessages);
});

/** EXAMPLE COMMIT LIST
  commits: [
    {
      id: 'e3d3ba14135exxxxxxxx',
      tree_id: 'ce0b9ee81c76d233e414663xxxxxxxxxxxxxxxxx',
      distinct: true,
      message: 'automation test',
      timestamp: '2021-06-14T21:36:23+03:00',
      url: 'https://github.com/Laetta/respack/commit/e3d3ba14135exxxxxxxx',
      author: [Object],
      committer: [Object],
      added: [],
      removed: [],
      modified: [Array]
    }
  ]

 */
