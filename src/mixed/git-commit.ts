import { exec } from "node:child_process"
import { styled } from "../utils/styled"

async function run() {
  exec(`git add -A && git commit -m "${new Date().toISOString()}" && git push`)

  console.log(styled.success("Auto commit complete!"))
}

export const gitCommit = {
  run,
  title: "Auto Commit",
}
