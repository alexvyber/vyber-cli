import { readFile, writeFile } from "node:fs/promises"
import { styled } from "../utils/styled"
import YAML from "yaml"
import path from "node:path"
import { Config } from "../types"

const HOSTS_FILE = "/etc/hosts"

async function run() {
  const configContent = await readFile(path.resolve(__dirname, "../config.yaml"), "utf-8")
  const { domains_to_block } = YAML.parse(configContent) as Config
  const linesToDelete = domains_to_block.map((domain) => `127.0.0.1       ${domain}`)

  const contents = await readFile(HOSTS_FILE, "utf-8")
  const lines = contents.split("\n")

  // naive way to check if blocked sites is already in hosts
  const isInFocusMode = lines.some((line) => linesToDelete.includes(line))

  try {
    if (isInFocusMode) {
      const content = lines.filter((line) => !linesToDelete.some((l) => line.includes(l))).join("\n")
      await writeFile(HOSTS_FILE, content)
    }

    if (!isInFocusMode) {
      const content = lines.concat(linesToDelete).join("\n")
      await writeFile(HOSTS_FILE, content)
    }

    console.log(styled.success(isInFocusMode ? "Focus mode disabled" : "Focus mode enabled"))
  } catch (error) {
    console.log(styled.error("Error writing to file. Try running again with sudo."))
  }
}

export const focusMode = { run, title: "Toggle Focus Mode" }
