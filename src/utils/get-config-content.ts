import { readFile } from "node:fs/promises"
import { resolve } from "node:path"

export async function getConfigContent() {
  return readFile(resolve(__dirname, "../config.yaml"), "utf-8")
}
