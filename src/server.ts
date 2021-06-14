import http from "http";
import { getSha1 } from "./hash";

const server = http
  .createServer(async (req, res) => {
    if (req.url === "/respack" && req.method === "GET") {
      res.writeHead(200, { "Content-Type": "application/json" });
      const hash = getSha1();
      console.log("[GET] /respack ->" + hash);
      res.end(JSON.stringify({ hash: hash }));
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Route not found!" }));
    }
  })
  .listen(5001);
