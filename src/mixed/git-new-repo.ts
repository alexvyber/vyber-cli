import { mkdir } from "node:fs/promises"
import { arg } from "../utils/args.js"
import { homeDir } from "../utils/home-dir.js"
import { exec } from "node:child_process"
import { existsSync } from "node:fs"
import { styled } from "../utils/styled.js"

async function run() {
  const name = await arg({ message: "Name" })

  const dirPath = homeDir("@alexvyber/_repos", name)

  if (existsSync(dirPath)) {
    styled.error(`dir or file exist: ${dirPath}`)
    process.exit(1)
  }

  await mkdir(dirPath)

  exec("vyber init", { cwd: dirPath })
  exec(`code ${dirPath}`, { cwd: dirPath })
}

export default { run, title: "Repo: create new git repo" }
