import { exec } from "node:child_process"
import { styled } from "../utils/styled"
import { DateTime } from "luxon"

async function run() {
  const command = [
    "git add -A",
    `git commit -m "${DateTime.now().setLocale("en-US").toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS)}"`,
    "git push",
  ].join(" && ")

  exec(command)

  console.log(styled.success("Auto commit complete!"))

  process.exit(0)
}

export default { run, title: "Auto Commit" }
