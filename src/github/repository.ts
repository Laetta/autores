import simpleGit, { SimpleGit, SimpleGitOptions } from "simple-git";
// const GitHub = require("github-api");

const options: Partial<SimpleGitOptions> = {
  baseDir: process.cwd(),
  binary: "git",
  maxConcurrentProcesses: 6,
};

const git: SimpleGit = simpleGit(options);

export async function initLocalRepo() {
  await git.init();
  try {
    console.log("[GIT] Cloning the repository");
    await git.clone("git@github.com:Laetta/respack.git", "./repo");
  } catch {
    console.log("[GIT] Repository already exists");
  }
}

export async function pullRepo() {
  console.log("[GIT] Pulling the repository");
  const pullResult = await git.pull(
    "git@github.com:Laetta/respack.git",
    "./repo"
  );
  console.log(
    "[GIT] Repository pulled! Files changed: " + pullResult.files.length
  );
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
