import { secrets } from "./config";
import { respackZipPath } from "./zip";

const GitHub = require("github-api");
const ghReleaseAssets = require("gh-release-assets");

const gh = new GitHub({
  username: "Laetta",
  token: secrets.GithubToken,
});

const repo = gh.getRepo("Laetta", "respack");

export async function releaseRespack() {
  console.log("[GITHUB] Updating the release...");
  const latest = await getLatestRelease();
  if (latest) {
    updateLatestRelease(latest);
  }
}

function updateLatestRelease(latest: any) {
  ghReleaseAssets(
    {
      url: latest.upload_url,
      token: [secrets.GithubToken],
      assets: [respackZipPath],
    },
    function (err: any, assets: any) {
      console.log("[GITHUB] Release updated!", assets);
    }
  );
}

async function getLatestRelease() {
  const response = await repo.listReleases(() => {});
  const releases = response.data;
  for (const release of releases) {
    if (release.tag_name == "latest") return release;
  }
}
