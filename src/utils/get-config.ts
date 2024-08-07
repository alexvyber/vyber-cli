import YAML from 'yaml'
import { Config } from '../types'
import { getConfigContent } from '../utils/get-config-content'

export async function getConfig(): Promise<Config> {
  return YAML.parse(await getConfigContent())
}
