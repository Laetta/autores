import http from "http";
import { getHash } from "./hash";
import { getRespackFileBuffer } from "./zip";

http
  .createServer(async (req, res) => {
    if (req.method !== "GET") return sendInvalidRoute(res);

    if (req.url === "/respack/download") {
      return sendRespack(res);
    }

    if (req.url === "/respack/hash") {
      return sendHash(res);
    }

    return sendInvalidRoute(res);
  })
  .listen(5001);

function sendHash(res: http.ServerResponse) {
  res.writeHead(200, { "Content-Type": "application/json" });
  const hash = getHash();
  console.log("[GET] /respack/hash -> " + hash);
  res.end(JSON.stringify({ hash: hash }));
}

/**
 * Download the respack for the user
 */
function sendRespack(res: http.ServerResponse) {
  console.log("[GET] /respack/download");

  res.writeHead(200);
  res.end(getRespackFileBuffer());
}

function sendInvalidRoute(res: http.ServerResponse) {
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Route not found!" }));
}
