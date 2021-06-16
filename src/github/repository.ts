import simpleGit, { SimpleGit, SimpleGitOptions } from "simple-git";
import { wait } from "../helpers";
import path from "path";
// const GitHub = require("github-api");

// const options: Partial<SimpleGitOptions> = {
//   baseDir: process.cwd(),
//   binary: "git",
//   maxConcurrentProcesses: 6,
// };
// const git: SimpleGit = simpleGit("./repo", options);

const REPO_URL = "git@github.com:Laetta/respack.git";
const REPO_DIR = path.join(process.cwd(), "./repo");

export async function initLocalRepo() {
  await wait(300);
  try {
    // await git.init().catch(() => {});
    // await simple.addRemote("respack", "git@github.com:Laetta/respack.git");
    console.log("[GIT] Cloning the repository");
    // await git.clone("git@github.com:Laetta/respack.git", "./repo");
    await simpleGit().clone(REPO_URL, REPO_DIR);
  } catch {
    console.log("[GIT] Repository already exists");
  }
}

export async function pullRepo() {
  console.log("[GIT] Pulling the repository");
  const pullResult = await simpleGit(REPO_DIR).pull();
  console.log("[GIT] Repository pulled! Files changed: " + pullResult.files);
}

// var gh = new GitHub({
//   username: "Laetta",
//   token: "MY_OAUTH_TOKEN",
// });

// export async function releaseRespack() {
//   console.log("[GITHUB] Starting release");
//   gh.createRelease({})
//   console.log("[GITHUB] Released!");
// }

// async function cloneRepo(repo: string): Promise<void> {
//   try {
//     await simpleGit().clone(repo, REPO_DIR);
//   } catch (error) {
//     await simpleGit(REPO_DIR).pull();
//   }
// }
