import YAML from 'yaml'
import { Config } from '../types'
import { getConfigContent } from '../utils/get-config-content'
import { homeDir } from '../utils/home-dir'
import gitCommit from './git-commit'

async function run() {
  const { autocommit_repos } = YAML.parse(await getConfigContent()) as Config

  await Promise.allSettled(autocommit_repos.map((repo) => gitCommit.run({ cwd: homeDir(repo) })))
}

export default { run, title: 'Auto Commit' }
