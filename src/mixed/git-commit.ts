import { exec } from "node:child_process"
import { styled } from "../utils/styled"
import { DateTime } from "luxon"

async function run() {
  exec(
    `git add -A && git commit -m "${DateTime.now().setLocale("en-US").toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS)}" && git push`
  )

  console.log(styled.success("Auto commit complete!"))
}

export const gitCommit = {
  run,
  title: "Auto Commit",
}
