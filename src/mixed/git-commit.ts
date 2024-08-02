import { exec } from "node:child_process"
import { styled } from "../utils/styled"
import { DateTime } from "luxon"
import { promisify } from "node:util"

const execAsync = promisify(exec)

async function run() {
  const commands = [
    "git add -A",
    `git commit -m "${DateTime.now().setLocale("en-US").toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS)}"`,
    "git push",
  ]

  // it's better than command1 && ccommand2 && command3
  for (const command of commands) {
    await execAsync(command)
  }

  console.log(styled.success("Auto commit complete!"))

  process.exit(0)
}

export default { run, title: "Commit: auto git commit" }
