import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { homeDir } from './home-dir'

export async function getConfigContent() {
  const homeConfig = homeDir('.vyber.yaml')

  if (existsSync(homeConfig)) {
    return readFile(homeConfig, 'utf-8')
  }

  return readFile(resolve(__dirname, '../config.yaml'), 'utf-8')
}
