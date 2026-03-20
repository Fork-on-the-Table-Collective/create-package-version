import * as core from '@actions/core';

async function run(): Promise<void> {
  try {
    const githubRef = core.getInput('github_ref');
    let packageName: string;

    if (githubRef.startsWith('refs/tags/')) {
      packageName = githubRef.replace('refs/tags/', '');
    } else {
      const date = new Date();
      const timestamp = `${date.getFullYear()}_${date.getMonth() + 1}_${date.getDate()}_${date.getHours()}_${date.getMinutes()}_${date.getSeconds()}`;
      const branchName = githubRef.replace('refs/heads/', '');
      packageName = `${timestamp}_${branchName}`;
    }

    core.setOutput('packageName', packageName);
  } catch (error: unknown) {
    if (error instanceof Error) {
      core.setFailed(error.message);
      return;
    }

    core.setFailed(String(error));
  }
}

void run();
