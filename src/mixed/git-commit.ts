import { styled } from '../utils/styled'
import { DateTime } from 'luxon'
// import { execAsync } from '../utils/exec-async'
import { execSync } from 'node:child_process'

async function run() {
  const commands = [
    'git add -A',
    `git commit -m "${DateTime.now().setLocale('en-US').toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS)}"`,
    '[[ ! -z "$(git remote)" ]] && git push || exit 0',
  ]

  // it's better than command1 && ccommand2 && command3
  for (const command of commands) {
    try {
      execSync(command)
      // execAsync(command)
    } catch (error) {
      if (error instanceof Error) {
        console.log(styled.error(error.message))
      }
    }
  }

  console.log(styled.success('Auto commit complete!'))
}

export default { run, title: 'Commit: auto git commit' }
