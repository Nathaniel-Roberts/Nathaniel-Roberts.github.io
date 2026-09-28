import { execSync } from 'node:child_process';

function sha(): string {
  const env = process.env.WORKERS_CI_COMMIT_SHA || process.env.CF_PAGES_COMMIT_SHA || process.env.GITHUB_SHA;
  if (env) return env;
  try {
    return execSync('git rev-parse HEAD', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
  } catch {
    return '';
  }
}

export const BUILD = {
  sha: sha(),
  short: sha().slice(0, 7),
  date: new Date(),
};
