import { homedir } from "node:os"
import path from "node:path"

export function homeDir(...pathParts: string[]) {
  return path.resolve(homedir(), ...pathParts)
}
