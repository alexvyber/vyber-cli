import { homeDir } from '../utils/home-dir'
import { exec } from 'node:child_process'
import { styled } from '../utils/styled'
import { getConfig } from '../utils/get-config'

async function run() {
  const { repos } = await getConfig()

  const ENTRIES_PER_ITERATION = 16

  for (let i = 0; i < repos.length; i += ENTRIES_PER_ITERATION) {
    const promises = repos.slice(i, i + ENTRIES_PER_ITERATION).map(
      async (repo) =>
        new Promise<string>((resolve, reject) =>
          exec('git pull', { cwd: homeDir(repo) }, (error) => {
            if (error) reject(`error: ${homeDir(repo)}`)
            else resolve(`success: ${homeDir(repo)}`)
          }),
        ),
    )

    const stdouts = await Promise.allSettled(promises)

    for (const out of stdouts) {
      console.log(out.status === 'fulfilled' ? styled.success(out.value) : styled.error(out.reason))
    }
  }
}

export default { run, title: 'Pull All' }
