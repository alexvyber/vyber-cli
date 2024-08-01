import { mkdir } from "node:fs/promises"
import { arg } from "../utils/args.js"
import { homeDir } from "../utils/home-dir.js"
import { exec } from "node:child_process"
import { existsSync } from "node:fs"
import { styleText } from "node:util"

async function run() {
  const name = await arg({ message: "Name" })

  const dirPath = homeDir("@alexvyber/repos", name)

  if (existsSync(dirPath)) {
    console.log(styleText(["bold", "red"], `dir or file exist: ${dirPath}`))
    process.exit(1)
  }

  await mkdir(dirPath)

  exec("vyber init", { cwd: dirPath })
  exec(`code ${dirPath}`, { cwd: dirPath })
}

export default { run, title: "New Repo" }
