const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    const githubRef = core.getInput('github_ref');
    let packageName;

    if (githubRef.startsWith('refs/tags/')) {
        packageName = githubRef;
    } else {
      const date = new Date();
      const timestamp = `${date.getFullYear()}_${date.getMonth()+1}_${date.getDate()}_${date.getHours()}_${date.getMinutes()}_${date.getSeconds()}`;
      const branchName = githubRef.replace('refs/heads/', '');
      packageName = `${timestamp}_${branchName}`;
    }

    core.setOutput('packageName', packageName);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();