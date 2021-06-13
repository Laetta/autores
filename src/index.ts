import { releaseRespack } from "./release-respack";

require("./webhook");
require("./repository");

setTimeout(() => releaseRespack(), 3000);
