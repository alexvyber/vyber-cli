import { getConfig } from '../utils/get-config'
import { homeDir } from '../utils/home-dir'
import gitCommit from './git-commit'

async function run() {
  for (const repo of (await getConfig()).autocommit_repos) {
    gitCommit.run({ cwd: homeDir(repo) })
  }
}

export default { run, title: 'Auto Commit' }
