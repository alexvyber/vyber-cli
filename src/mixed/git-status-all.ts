import YAML from "yaml"
import { Config } from "../types"
import { getConfigContent } from "../utils/get-config-content"
import { homeDir } from "../utils/home-dir"
import { exec } from "node:child_process"
import { styled } from "../utils/styled"
import { styleText } from "node:util"

function colorize(str: string) {
  str
    .split("\n")
    .map((s) => s.split(" ").filter((s) => !!s.trim()))
    .filter((tuple) => tuple.length > 0)
    .forEach((s) => console.log(`${styleText(["bold", "red"], s[0])} ${styleText(["bold"], s[1])}`))
}

async function run() {
  const { repos } = YAML.parse(await getConfigContent()) as Config

  for (const repo of repos) {
    exec("git status --short --untracked-files", { cwd: homeDir(repo) }, (error, stdout) => {
      if (error) {
        console.error(styled.error(error.message))
      }

      if (stdout === "") {
        console.log(`clean: ${repo}`)
      }

      if (stdout.length > 0) {
        console.log()
        console.log(styled.info(`dirty: ${repo}`))
        colorize(stdout)
        console.log()
      }
    })
  }
}

export default { run, title: "Git Status All" }
