import { secrets } from "./config";
import { respackZipPath } from "./zip";
import Oktokit, { Octokit } from "@octokit/rest";
import * as fs from "fs";

const GitHub = require("github-api");
const ghReleaseAssets = require("gh-release-assets");

const gh = new GitHub({
  username: "Laetta",
  token: secrets.GithubToken,
});

const octokit = new Octokit({
  auth: secrets.GithubToken,
});

const repo = gh.getRepo("Laetta", "respack");

export async function releaseRespack() {
  console.log("[GITHUB] Updating the release...");
  const latest = await getLatestRelease();
  if (latest) {
    await updateLatestRelease(latest);
  }
}

async function updateLatestRelease(latest: any) {
  // console.log(latest);
  const latestAssetId = latest.assets?.[0].id;
  if (latestAssetId) {
    await octokit.rest.repos.deleteReleaseAsset({
      owner: "Laetta",
      repo: "respack",
      asset_id: latestAssetId,
    });
    console.log("[GITHUB] deleting the previus asset");
  }
  console.log({ latestAssetId });
  return new Promise<void>((resolve) => {
    ghReleaseAssets(
      {
        url: latest.upload_url,
        token: [secrets.GithubToken],
        assets: [respackZipPath],
      },
      function (err: any, assets: any) {
        console.log("[GITHUB] Error: ", err);
        console.log("[GITHUB] Release updated!", assets);
        resolve();
      }
    );
  });
  // const fileBase64 = fs.readFileSync(respackZipPath, { encoding: "base64" });
  // const data = await octokit.rest.repos.uploadReleaseAsset({
  //   owner: "Laetta",
  //   repo: "respack",
  //   release_id: latest.id,
  //   data: fileBase64,
  // });
  // console.log("[GITHUB] Released");
  // console.log(data);
}

async function getLatestRelease() {
  const response = await repo.listReleases(() => {});
  const releases = response.data;
  for (const release of releases) {
    if (release.tag_name == "latest") return release;
  }
}
