import { getConfig } from '../utils/get-config'
import { homeDir } from '../utils/home-dir'
import gitCommit from './git-commit'

async function run() {
  const { autocommit_repos } = await getConfig()

  await Promise.allSettled([autocommit_repos.map((repo) => gitCommit.run({ cwd: homeDir(repo) }))])
}

export default { run, title: 'Auto Commit' }
