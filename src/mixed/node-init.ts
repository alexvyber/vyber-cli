import { execSync } from 'node:child_process'
import genBiome from './gen-biome'
import gitCommit from './git-commit'

async function run({ manager = 'pnpm' }: { manager?: 'pnpm' | 'yarn' | 'npm' } = { manager: 'pnpm' }) {
  execSync('git init')

  if (manager === 'pnpm') {
    execSync('pnpm init')
    execSync('pnpm add -D typescript @types/node')
    execSync('pnpm tsc --init')
  }

  if (manager === 'yarn') {
    execSync('yarn init -y')
    execSync('yarn add -D typescript @types/node')
    execSync('yarn tsc --init')
  }

  if (manager === 'npm') {
    execSync('npm init -y')
    execSync('npm install --save-dev typescript @types/node')
    execSync('npx tsc --init')
  }

  await genBiome.run()

  execSync('gen-node-ignore')
  execSync('mkdir src')
  execSync('touch src/index.ts')

  await gitCommit.run()
}

export default { run, title: 'Node Init' }
