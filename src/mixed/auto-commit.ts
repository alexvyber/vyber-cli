import { getConfig } from '../utils/get-config'
import { homeDir } from '../utils/home-dir'
import gitCommit from './git-commit'

async function run() {
  const { autocommit_repos } = await getConfig()

  autocommit_repos.forEach((repo) => gitCommit.run({ cwd: homeDir(repo) }))
}

export default { run, title: 'Auto Commit' }
