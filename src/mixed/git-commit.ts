import { styled } from '../utils/styled'
import { DateTime } from 'luxon'
import { execSync, ExecSyncOptionsWithBufferEncoding } from 'node:child_process'

async function run(options?: ExecSyncOptionsWithBufferEncoding) {
  const now = DateTime.now().setLocale('en-US').toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS)
  const commands = [
    'git add -A',
    `[[ ! -z "$(git status -s)" ]] && git commit -m "${now}" || exit 0`,
    '[[ ! -z "$(git status -s)" ]] && [[ ! -z "$(git remote)" ]] && git push || exit 0',
  ]

  // it's better than command1 && ccommand2 && command3
  for (const command of commands) {
    try {
      execSync(command, options)
    } catch (error) {
      if (error instanceof Error) {
        console.log(styled.error(error.message))
      }
    }
  }

  console.log(styled.success(`Auto commit complete! ${options?.cwd ? options?.cwd : ''}`))
}

export default { run, title: 'Commit: auto git commit' }
