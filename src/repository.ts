import simpleGit, { SimpleGit, SimpleGitOptions } from "simple-git";

const options: Partial<SimpleGitOptions> = {
  baseDir: process.cwd(),
  binary: "git",
  maxConcurrentProcesses: 6,
};

const git: SimpleGit = simpleGit(options);

async function init() {
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
  await git.pull();
  console.log("[GIT] Repository pulled!");
}

init();
