var ghRelease = require("gh-release");

// all options have defaults and can be omitted
var options = {
  tag_name: "latest",
  target_commitish: "master",
  name: "release",
  body: "* init\n",
  draft: false,
  prerelease: false,
  repo: "respack",
  owner: "Laetta",
  endpoint: "https://api.github.com", // for GitHub enterprise, use http(s)://hostname/api/v3
  auth: {
    token: "TOKEN HERE",
  },
};

export function releaseRespack() {
  console.log("Starting to release");
  ghRelease(options, function (err: any, result: any) {
    console.log("Releasing...");
    if (err) throw err;
    console.log(result); // create release response: https://developer.github.com/v3/repos/releases/#response-4
  });
}
